(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'i18n!calendar', 'compiled/util/Popover', 'compiled/calendar/CommonEvent', 'compiled/calendar/EditEventDetailsDialog', 'jst/calendar/eventDetails', 'jst/calendar/deleteItem', 'jst/calendar/reservationOverLimitDialog', 'use!underscore', 'jquery.ajaxJSON', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub'], function($, I18n, Popover, CommonEvent, EditEventDetailsDialog, eventDetailsTemplate, deleteItemTemplate, reservationOverLimitDialog, _) {
    var ShowEventDetailsDialog;
    return ShowEventDetailsDialog = (function() {
      function ShowEventDetailsDialog(event) {
        this.show = __bind(this.show, this);
        this.cancelAppointment = __bind(this.cancelAppointment, this);
        this.unreserveEvent = __bind(this.unreserveEvent, this);
        this.reserveEvent = __bind(this.reserveEvent, this);
        this.reserveSuccessCB = __bind(this.reserveSuccessCB, this);
        this.reserveErrorCB = __bind(this.reserveErrorCB, this);
        this.deleteEvent = __bind(this.deleteEvent, this);
        this.showEditDialog = __bind(this.showEditDialog, this);        this.event = event;
        this.contexts = event.contexts;
      }
      ShowEventDetailsDialog.prototype.showEditDialog = function() {
        this.popover.hide();
        return (new EditEventDetailsDialog(this.event)).show();
      };
      ShowEventDetailsDialog.prototype.deleteEvent = function(event) {
        var url;
        if (event == null) {
          event = this.event;
        }
        if (this.event.isNewEvent()) {
          return;
        }
        url = event.object.url;
        if (event.object.assignment) {
          url = $.replaceTags(this.event.deleteURL, 'id', this.event.object.id);
        }
        return $("<div />").confirmDelete({
          url: url,
          message: $(deleteItemTemplate({
            message: event.deleteConfirmation,
            hide_reason: event.object.workflow_state !== 'locked'
          })),
          dialog: {
            title: I18n.t('confirm_deletion', "Confirm Deletion")
          },
          prepareData: __bind(function($dialog) {
            return {
              cancel_reason: $dialog.find('#cancel_reason').val()
            };
          }, this),
          confirmed: __bind(function() {
            this.popover.hide();
            return $.publish("CommonEvent/eventDeleting", event);
          }, this),
          success: __bind(function() {
            return $.publish("CommonEvent/eventDeleted", event);
          }, this)
        });
      };
      ShowEventDetailsDialog.prototype.reserveErrorCB = function(data) {
        var $dialog, error, errorHandled, _i, _len;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          error = data[_i];
          if (error.message === 'participant has met per-participant limit') {
            errorHandled = true;
            error.reschedulable = error.reservations.length === 1;
            $dialog = $(reservationOverLimitDialog(error)).dialog({
              resizable: false,
              width: 450,
              buttons: error.reschedulable ? [
                {
                  text: I18n.t('reschedule', 'Reschedule'),
                  'class': 'ui-button-primary',
                  click: __bind(function() {
                    return $dialog.disableWhileLoading(this.reserveEvent({
                      cancel_existing: true
                    }).always(function() {
                      return $dialog.dialog('close');
                    }));
                  }, this)
                }, {
                  text: I18n.t('do_nothing', 'Do Nothing'),
                  click: function() {
                    return $dialog.dialog('close');
                  }
                }
              ] : [
                {
                  text: I18n.t('ok', 'OK'),
                  click: function() {
                    return $dialog.dialog('close');
                  }
                }
              ]
            });
          }
        }
        if (!errorHandled) {
          alert("Could not reserve event: " + data);
          return $.publish("CommonEvent/eventSaveFailed", this.event);
        }
      };
      ShowEventDetailsDialog.prototype.reserveSuccessCB = function(data) {
        this.popover.hide();
        return $.publish("CommonEvent/eventSaved", this.event);
      };
      ShowEventDetailsDialog.prototype.reserveEvent = function(params) {
        if (params == null) {
          params = {};
        }
        $.publish("CommonEvent/eventSaving", this.event);
        return $.ajaxJSON(this.event.object.reserve_url, 'POST', params, this.reserveSuccessCB, this.reserveErrorCB);
      };
      ShowEventDetailsDialog.prototype.unreserveEvent = function() {
        var e, _i, _len, _ref, _ref2;
        _ref = this.event.childEvents;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if ((_ref2 = e.object) != null ? _ref2.own_reservation : void 0) {
            this.deleteEvent(e);
            return;
          }
        }
      };
      ShowEventDetailsDialog.prototype.cancelAppointment = function($appt) {
        var event, url, _ref;
        url = $appt.data('url');
        event = _.detect(this.event.calendarEvent.child_events, function(e) {
          return e.url === url;
        });
        return $("<div/>").confirmDelete({
          url: url,
          message: $(deleteItemTemplate({
            message: I18n.t('cancel_appointment', 'Are you sure you want to cancel your appointment with %{name}?', {
              name: ((_ref = event.user) != null ? _ref.short_name : void 0) || event.group.name
            })
          })),
          dialog: {
            title: I18n.t('confirm_removal', "Confirm Removal"),
            width: '400px',
            resizable: false
          },
          prepareData: __bind(function($dialog) {
            return {
              cancel_reason: $dialog.find('#cancel_reason').val()
            };
          }, this),
          success: __bind(function() {
            var appointments, in_scheduler;
            this.event.object.child_events = _(this.event.object.child_events).reject(function(e) {
              return e.url === $appt.data('url');
            });
            $appt.remove();
            in_scheduler = $('#scheduler').prop('checked');
            appointments = this.event.calendarEvent.child_events;
            if (!in_scheduler && appointments.length === 0) {
              $.publish("CommonEvent/eventDeleted", this.event);
              return this.popover.hide();
            }
          }, this)
        });
      };
      ShowEventDetailsDialog.prototype.show = function(jsEvent) {
        var e, params, reservation, _i, _len, _ref, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
        params = $.extend(true, {}, this.event, {
          can_reserve: (_ref = this.event.object) != null ? _ref.reserve_url : void 0
        });
        if (this.event.contextInfo.can_create_appointment_groups) {
          params.can_reserve = false;
        }
        if ((_ref2 = this.event.object) != null ? _ref2.child_events : void 0) {
          if (this.event.object.reserved) {
            params.can_unreserve = true;
            params.can_reserve = false;
          }
          _ref3 = this.event.object.child_events;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            e = _ref3[_i];
            reservation = {
              id: ((_ref4 = e.user) != null ? _ref4.id : void 0) || e.group.id,
              name: ((_ref5 = e.user) != null ? _ref5.short_name : void 0) || e.group.name,
              event_url: e.url
            };
            ((_ref6 = params.reservations) != null ? _ref6 : params.reservations = []).push(reservation);
            if (e.user) {
              ((_ref7 = params.reserved_users) != null ? _ref7 : params.reserved_users = []).push(reservation);
            }
            if (e.group) {
              ((_ref8 = params.reserved_groups) != null ? _ref8 : params.reserved_groups = []).push(reservation);
            }
          }
        }
        if (((_ref9 = this.event.object) != null ? _ref9.available_slots : void 0) === 0) {
          params.can_reserve = false;
          params.availableSlotsText = "None";
        } else if (((_ref10 = this.event.object) != null ? _ref10.available_slots : void 0) > 0) {
          params.availableSlotsText = this.event.object.available_slots;
        }
        this.popover = new Popover(jsEvent, eventDetailsTemplate(params));
        this.popover.el.find(".edit_event_link").click(__bind(function(e) {
          e.preventDefault();
          return this.showEditDialog();
        }, this));
        this.popover.el.find(".delete_event_link").click(__bind(function(e) {
          e.preventDefault();
          return this.deleteEvent();
        }, this));
        this.popover.el.find(".reserve_event_link").click(__bind(function(e) {
          e.preventDefault();
          return this.reserveEvent();
        }, this));
        this.popover.el.find(".unreserve_event_link").click(__bind(function(e) {
          e.preventDefault();
          return this.unreserveEvent();
        }, this));
        return this.popover.el.find(".cancel_appointment_link").click(__bind(function(e) {
          var $appt;
          e.preventDefault();
          $appt = $(e.target).closest('li');
          return this.cancelAppointment($appt);
        }, this));
      };
      return ShowEventDetailsDialog;
    })();
  });
}).call(this);
