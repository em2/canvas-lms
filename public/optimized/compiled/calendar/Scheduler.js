(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'i18n!calendar', 'jst/calendar/appointmentGroupList', 'jst/calendar/schedulerRightSideAdminSection', 'compiled/calendar/EditAppointmentGroupDialog', 'compiled/calendar/MessageParticipantsDialog', 'jst/calendar/deleteItem', 'jquery.instructure_date_and_time', 'jquery.instructure_jquery_patches', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub', 'vendor/jquery.spin'], function($, I18n, appointmentGroupListTemplate, schedulerRightSideAdminSectionTemplate, EditAppointmentGroupDialog, MessageParticipantsDialog, deleteItemTemplate) {
    var Scheduler;
    return Scheduler = (function() {
      function Scheduler(selector, calendar) {
        this.calendar = calendar;
        this.messageLinkClick = __bind(this.messageLinkClick, this);
        this.deleteLinkClick = __bind(this.deleteLinkClick, this);
        this.editLinkClick = __bind(this.editLinkClick, this);
        this.showList = __bind(this.showList, this);
        this.doneClick = __bind(this.doneClick, this);
        this.viewCalendarForGroup = __bind(this.viewCalendarForGroup, this);
        this.viewCalendarForGroupId = __bind(this.viewCalendarForGroupId, this);
        this.viewCalendarForElement = __bind(this.viewCalendarForElement, this);
        this.showEventLinkClick = __bind(this.showEventLinkClick, this);
        this.viewCalendarLinkClick = __bind(this.viewCalendarLinkClick, this);
        this.redraw = __bind(this.redraw, this);
        this.loadData = __bind(this.loadData, this);
        this.canManageAGroup = __bind(this.canManageAGroup, this);
        this.hide = __bind(this.hide, this);
        this.show = __bind(this.show, this);
        this.eventDeleted = __bind(this.eventDeleted, this);
        this.eventSaved = __bind(this.eventSaved, this);
        this.dialogCloseCB = __bind(this.dialogCloseCB, this);
        this.createClick = __bind(this.createClick, this);
        this.div = $(selector);
        this.contexts = this.calendar.contexts;
        this.listDiv = this.div.find(".appointment-list");
        this.div.delegate('.single_item_done_button', 'click', this.doneClick);
        this.div.delegate('.view_calendar_link', 'click', this.viewCalendarLinkClick);
        this.listDiv.delegate('.edit_link', 'click', this.editLinkClick);
        this.listDiv.delegate('.message_link', 'click', this.messageLinkClick);
        this.listDiv.delegate('.delete_link', 'click', this.deleteLinkClick);
        this.listDiv.delegate('.show_event_link', 'click', this.showEventLinkClick);
        if (this.canManageAGroup()) {
          this.div.addClass('can-manage');
          this.rightSideAdminSection = $(schedulerRightSideAdminSectionTemplate());
          this.rightSideAdminSection.find(".create_link").click(this.createClick);
        }
        $.subscribe("CommonEvent/eventSaved", this.eventSaved);
        $.subscribe("CommonEvent/eventDeleted", this.eventDeleted);
      }
      Scheduler.prototype.createClick = function(jsEvent) {
        var group;
        jsEvent.preventDefault();
        group = {
          contexts: this.calendar.contexts
        };
        this.createDialog = new EditAppointmentGroupDialog(group, this.dialogCloseCB);
        return this.createDialog.show();
      };
      Scheduler.prototype.dialogCloseCB = function(saved) {
        if (saved) {
          this.calendar.dataSource.clearCache();
          return this.loadData();
        }
      };
      Scheduler.prototype.eventSaved = function(event) {
        if (this.active) {
          this.calendar.dataSource.clearCache();
          return this.loadData();
        }
      };
      Scheduler.prototype.eventDeleted = function(event) {
        if (this.active) {
          this.calendar.dataSource.clearCache();
          return this.loadData();
        }
      };
      Scheduler.prototype.toggleListMode = function(showListMode) {
        var _ref;
        if (showListMode) {
          delete this.viewingGroup;
          this.calendar.updateFragment({
            appointment_group_id: null
          });
          this.showList();
          if (this.canManageAGroup()) {
            $('#right-side .rs-section').hide();
            return this.rightSideAdminSection.appendTo('#right-side');
          } else {
            return $('#right-side-wrapper').hide();
          }
        } else {
          $('#right-side-wrapper').show();
          $('#right-side .rs-section').not("#undated-events, #calendar-feed").show();
          return (_ref = this.rightSideAdminSection) != null ? _ref.detach() : void 0;
        }
      };
      Scheduler.prototype.show = function() {
        $("#undated-events, #calendar-feed").hide();
        this.active = true;
        this.div.show();
        this.loadData();
        this.toggleListMode(true);
        return $.publish("Calendar/saveVisibleContextListAndClear");
      };
      Scheduler.prototype.hide = function() {
        $("#undated-events, #calendar-feed").show();
        this.active = false;
        this.div.hide();
        this.toggleListMode(false);
        this.calendar.displayAppointmentEvents = null;
        return $.publish("Calendar/restoreVisibleContextList");
      };
      Scheduler.prototype.canManageAGroup = function() {
        var contextInfo, _i, _len, _ref;
        _ref = this.contexts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          contextInfo = _ref[_i];
          if (contextInfo.can_create_appointment_groups) {
            return true;
          }
        }
        return false;
      };
      Scheduler.prototype.loadData = function() {
        var _ref;
        if (!this.loadingDeferred || (this.loadingDeferred && !this.loadingDeferred.isResolved())) {
          this.loadingDeferred = new $.Deferred();
        }
        this.groups = {};
        if ((_ref = this.loadingDiv) == null) {
          this.loadingDiv = $('<div id="scheduler-loading" />').appendTo(this.div).spin();
        }
        return this.calendar.dataSource.getAppointmentGroups(this.canManageAGroup(), __bind(function(data) {
          var group, _i, _len;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            group = data[_i];
            this.groups[group.id] = group;
          }
          this.redraw();
          return this.loadingDeferred.resolve();
        }, this));
      };
      Scheduler.prototype.redraw = function() {
        var appointmentEvent, childEvent, contextInfo, group, groups, html, id, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
        this.loadingDiv.hide();
        if (this.groups) {
          groups = [];
          _ref = this.groups;
          for (id in _ref) {
            group = _ref[id];
            group.signed_up_times = null;
            if (group.appointmentEvents) {
              _ref2 = group.appointmentEvents;
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                appointmentEvent = _ref2[_i];
                if (appointmentEvent.object.reserved) {
                  _ref3 = appointmentEvent.childEvents;
                  for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
                    childEvent = _ref3[_j];
                    if (childEvent.object.own_reservation) {
                      if ((_ref4 = group.signed_up_times) == null) {
                        group.signed_up_times = [];
                      }
                      group.signed_up_times.push({
                        id: childEvent.id,
                        formatted_time: childEvent.displayTimeString()
                      });
                    }
                  }
                }
              }
            }
            group.signed_up = 0;
            if (group.appointmentEvents) {
              _ref5 = group.appointmentEvents;
              for (_k = 0, _len3 = _ref5.length; _k < _len3; _k++) {
                appointmentEvent = _ref5[_k];
                if (appointmentEvent.childEvents) {
                  group.signed_up += appointmentEvent.childEvents.length;
                }
              }
            }
            _ref6 = this.contexts;
            for (_l = 0, _len4 = _ref6.length; _l < _len4; _l++) {
              contextInfo = _ref6[_l];
              if (contextInfo.asset_string === group.context_code) {
                group.context = contextInfo;
              }
            }
            group.published = group.workflow_state === "active";
            groups.push(group);
          }
          html = appointmentGroupListTemplate({
            appointment_groups: groups,
            canManageAGroup: this.canManageAGroup()
          });
          this.listDiv.find(".list-wrapper").html(html);
          if (this.viewingGroup) {
            this.viewingGroup = this.groups[this.viewingGroup.id];
            if (this.viewingGroup) {
              this.listDiv.find(".appointment-group-item[data-appointment-group-id='" + this.viewingGroup.id + "']").addClass('active');
              this.calendar.displayAppointmentEvents = this.viewingGroup;
            } else {
              this.toggleListMode(true);
            }
          }
        }
        return $.publish("Calendar/refetchEvents");
      };
      Scheduler.prototype.viewCalendarLinkClick = function(jsEvent) {
        jsEvent.preventDefault();
        return this.viewCalendarForElement($(jsEvent.target));
      };
      Scheduler.prototype.showEventLinkClick = function(jsEvent) {
        var appointmentEvent, childEvent, eventId, group, _i, _j, _len, _len2, _ref, _ref2;
        jsEvent.preventDefault();
        group = this.viewCalendarForElement($(jsEvent.target));
        eventId = $(jsEvent.target).data('event-id');
        if (eventId) {
          _ref = group.object.appointmentEvents;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            appointmentEvent = _ref[_i];
            _ref2 = appointmentEvent.object.childEvents;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              childEvent = _ref2[_j];
              if (childEvent.id === eventId) {
                this.calendar.gotoDate(childEvent.start);
                return;
              }
            }
          }
        }
      };
      Scheduler.prototype.viewCalendarForElement = function(el) {
        var group, groupId, thisItem, _ref, _ref2;
        thisItem = el.closest(".appointment-group-item");
        groupId = thisItem.data('appointment-group-id');
        thisItem.addClass('active');
        group = (_ref = this.groups) != null ? _ref[groupId] : void 0;
        this.viewCalendarForGroup((_ref2 = this.groups) != null ? _ref2[groupId] : void 0);
        return group;
      };
      Scheduler.prototype.viewCalendarForGroupId = function(id) {
        this.loadData();
        return this.loadingDeferred.done(__bind(function() {
          var _ref;
          return this.viewCalendarForGroup((_ref = this.groups) != null ? _ref[id] : void 0);
        }, this));
      };
      Scheduler.prototype.viewCalendarForGroup = function(group) {
        this.calendar.updateFragment({
          appointment_group_id: group.id
        });
        this.toggleListMode(false);
        this.viewingGroup = group;
        return this.loadingDeferred.done(__bind(function() {
          this.div.addClass('showing-single');
          this.calendar.calendar.show();
          this.calendar.calendar.fullCalendar('changeView', 'agendaWeek');
          if (this.viewingGroup.start_at) {
            this.calendar.gotoDate($.parseFromISO(this.viewingGroup.start_at).time);
          } else {
            this.calendar.gotoDate(new Date());
          }
          this.calendar.displayAppointmentEvents = this.viewingGroup;
          return $.publish("Calendar/refetchEvents");
        }, this));
      };
      Scheduler.prototype.doneClick = function(jsEvent) {
        jsEvent.preventDefault();
        return this.toggleListMode(true);
      };
      Scheduler.prototype.showList = function() {
        this.div.removeClass('showing-single');
        this.listDiv.find('.appointment-group-item').removeClass('active');
        this.calendar.calendar.hide();
        return this.calendar.displayAppointmentEvents = null;
      };
      Scheduler.prototype.editLinkClick = function(jsEvent) {
        var group, _ref;
        jsEvent.preventDefault();
        group = (_ref = this.groups) != null ? _ref[$(jsEvent.target).closest(".appointment-group-item").data('appointment-group-id')] : void 0;
        if (!group) {
          return;
        }
        group.contexts = this.calendar.contexts;
        this.createDialog = new EditAppointmentGroupDialog(group, this.dialogCloseCB);
        return this.createDialog.show();
      };
      Scheduler.prototype.deleteLinkClick = function(jsEvent) {
        var group, _ref;
        jsEvent.preventDefault();
        group = (_ref = this.groups) != null ? _ref[$(jsEvent.target).closest(".appointment-group-item").data('appointment-group-id')] : void 0;
        if (!group) {
          return;
        }
        return $("<div />").confirmDelete({
          url: group.url,
          message: $(deleteItemTemplate({
            message: I18n.t('confirm_appointment_group_deletion', "Are you sure you want to delete this appointment group?"),
            details: I18n.t('appointment_group_deletion_details', "Deleting it will also delete any appointments that have been signed up for by students.")
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
            return $(jsEvent.target).closest(".appointment-group-item").addClass("event_pending");
          }, this),
          success: __bind(function() {
            this.calendar.dataSource.clearCache();
            return this.loadData();
          }, this)
        });
      };
      Scheduler.prototype.messageLinkClick = function(jsEvent) {
        var group, _ref;
        jsEvent.preventDefault();
        group = (_ref = this.groups) != null ? _ref[$(jsEvent.target).closest(".appointment-group-item").data('appointment-group-id')] : void 0;
        this.messageDialog = new MessageParticipantsDialog(group, this.calendar.dataSource);
        return this.messageDialog.show();
      };
      return Scheduler;
    })();
  });
}).call(this);
