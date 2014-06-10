(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['i18n!calendar', 'jquery', 'compiled/util/hsvToRgb', 'jst/calendar/calendarApp', 'compiled/calendar/EventDataSource', 'compiled/calendar/commonEventFactory', 'compiled/calendar/ShowEventDetailsDialog', 'compiled/calendar/EditEventDetailsDialog', 'compiled/calendar/Scheduler', 'vendor/fullcalendar', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub', 'jqueryui/button'], function(I18n, $, hsvToRgb, calendarAppTemplate, EventDataSource, commonEventFactory, ShowEventDetailsDialog, EditEventDetailsDialog, Scheduler) {
    var Calendar;
    return Calendar = (function() {
      var $styleContainer, cssColor, hues;
      function Calendar(selector, contexts, manageContexts, dataSource, options) {
        var context, data, date, fullCalendarParams, radioId, weekColumnFormatter, _ref, _ref2;
        this.contexts = contexts;
        this.manageContexts = manageContexts;
        this.dataSource = dataSource;
        this.options = options;
        this.dataFromDocumentHash = __bind(this.dataFromDocumentHash, this);
        this.loadView = __bind(this.loadView, this);
        this.refetchEvents = __bind(this.refetchEvents, this);
        this.ajaxEnded = __bind(this.ajaxEnded, this);
        this.ajaxStarted = __bind(this.ajaxStarted, this);
        this.visibleContextListChanged = __bind(this.visibleContextListChanged, this);
        this.eventSaveFailed = __bind(this.eventSaveFailed, this);
        this.eventSaved = __bind(this.eventSaved, this);
        this.eventSaving = __bind(this.eventSaving, this);
        this.eventDeleted = __bind(this.eventDeleted, this);
        this.eventDeleting = __bind(this.eventDeleting, this);
        this.reloadClick = __bind(this.reloadClick, this);
        this.fragmentChange = __bind(this.fragmentChange, this);
        this.drop = __bind(this.drop, this);
        this.viewDisplay = __bind(this.viewDisplay, this);
        this.eventResize = __bind(this.eventResize, this);
        this.dayClick = __bind(this.dayClick, this);
        this.eventClick = __bind(this.eventClick, this);
        this.eventDrop = __bind(this.eventDrop, this);
        this.eventAfterRender = __bind(this.eventAfterRender, this);
        this.eventRender = __bind(this.eventRender, this);
        this.getEvents = __bind(this.getEvents, this);
        this.contextCodes = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = contexts.length; _i < _len; _i++) {
            context = contexts[_i];
            _results.push(context.asset_string);
          }
          return _results;
        })();
        this.visibleContextList = [];
        this.displayAppointmentEvents = null;
        this.activateEvent = (_ref = this.options) != null ? _ref.activateEvent : void 0;
        this.activeAjax = 0;
        $.subscribe({
          "CommonEvent/eventDeleting": this.eventDeleting,
          "CommonEvent/eventDeleted": this.eventDeleted,
          "CommonEvent/eventSaving": this.eventSaving,
          "CommonEvent/eventSaved": this.eventSaved,
          "CommonEvent/eventSaveError": this.eventSaveFailed,
          "Calendar/visibleContextListChanged": this.visibleContextListChanged,
          "EventDataSource/ajaxStarted": this.ajaxStarted,
          "EventDataSource/ajaxEnded": this.ajaxEnded,
          "Calendar/refetchEvents": this.refetchEvents
        });
        weekColumnFormatter = "'<span class=\"agenda-col-wrapper\">\n  <span class=\"day-num\">'d'</span>\n  <span class=\"day-and-month\">\n    <span class=\"day-name\">'dddd'</span><br />\n    <span class=\"month-name\">'MMM'</span>\n  </span>\n</span>'";
        fullCalendarParams = {
          header: {
            left: 'prev,today,next',
            center: 'title',
            right: ''
          },
          editable: true,
          columnFormat: {
            month: 'dddd',
            week: weekColumnFormatter
          },
          allDayDefault: false,
          buttonText: {
            today: I18n.t('today', 'Today')
          },
          defaultEventMinutes: 60,
          weekMode: 'variable',
          slotMinutes: 30,
          firstHour: 7,
          droppable: true,
          dropAccept: '.undated_event',
          ignoreTimezone: true,
          lazyFetching: false,
          events: this.getEvents,
          eventRender: this.eventRender,
          eventAfterRender: this.eventAfterRender,
          eventDrop: this.eventDrop,
          eventClick: this.eventClick,
          eventResize: this.eventResize,
          dayClick: this.dayClick,
          titleFormat: {
            week: "MMM d[ yyyy]{ '&ndash;'[ MMM] d, yyyy}"
          },
          viewDisplay: this.viewDisplay,
          drop: this.drop
        };
        data = this.dataFromDocumentHash();
        if (!data.view_start && ((_ref2 = this.options) != null ? _ref2.viewStart : void 0)) {
          data.view_start = this.options.viewStart;
          location.hash = $.encodeToHex(JSON.stringify(data));
        }
        if (data.view_start) {
          date = $.fullCalendar.parseISO8601(data.view_start);
          if (date) {
            fullCalendarParams.year = date.getFullYear();
            fullCalendarParams.month = date.getMonth();
            fullCalendarParams.date = date.getDate();
          }
        }
        this.el = $(selector).html(calendarAppTemplate());
        if (data.view_name === 'month' || data.view_name === 'agendaWeek') {
          radioId = data.view_name === 'agendaWeek' ? 'week' : 'month';
          $("#" + radioId).click();
          fullCalendarParams.defaultView = data.view_name;
        }
        if (data.show && data.show !== '') {
          this.visibleContextList = data.show.split(',');
        }
        this.calendar = this.el.find("div.calendar").fullCalendar(fullCalendarParams);
        $(document).fragmentChange(this.fragmentChange);
        this.el.find('#calendar_views').buttonset().find('input').change(__bind(function(event) {
          return this.loadView($(event.target).attr('id'));
        }, this));
        this.$refresh_calendar_link = this.el.find('#refresh_calendar_link').click(this.reloadClick);
        this.colorizeContexts();
        this.scheduler = new Scheduler(".scheduler-wrapper", this);
        $('html').addClass('calendar-loaded');
        this.dataSource.getAppointmentGroups(false, __bind(function(data) {
          var group, required, _i, _len;
          required = 0;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            group = data[_i];
            if (group.requiring_action) {
              required += 1;
            }
          }
          return this.el.find("#calendar-header .counter-badge").toggle(required > 0).text(required);
        }, this));
        window.setTimeout(__bind(function() {
          if (data.view_name === 'scheduler') {
            $("#scheduler").click();
            if (data.appointment_group_id) {
              return this.scheduler.viewCalendarForGroupId(data.appointment_group_id);
            }
          }
        }, this));
      }
      Calendar.prototype.getEvents = function(start, end, cb) {
        var filterEvents;
        filterEvents = __bind(function(events) {
          var event, eventIds, idx, keep, _ref, _ref2;
          eventIds = {};
          if (!(events.length > 0)) {
            return events;
          }
          for (idx = _ref = events.length - 1; _ref <= 0 ? idx <= 0 : idx >= 0; _ref <= 0 ? idx++ : idx--) {
            event = events[idx];
            keep = true;
            if (eventIds[event.id]) {
              keep = false;
            } else if (event.isAppointmentGroupEvent()) {
              if (!this.displayAppointmentEvents) {
                if (!event.calendarEvent.reserve_url) {
                  keep = true;
                } else if (event.calendarEvent.child_events_count > 0 && !event.calendarEvent.reserved) {
                  keep = true;
                } else {
                  keep = false;
                }
              } else {
                if (this.displayAppointmentEvents.id === ((_ref2 = event.calendarEvent) != null ? _ref2.appointment_group_id : void 0)) {
                  keep = !!event.calendarEvent.reserve_url;
                } else {
                  keep = !event.calendarEvent.reserve_url;
                }
              }
            }
            if (!keep) {
              events.splice(idx, 1);
            }
            eventIds[event.id] = true;
          }
          return events;
        }, this);
        return this.dataSource.getEvents($.unfudgeDateForProfileTimezone(start), $.unfudgeDateForProfileTimezone(end), this.visibleContextList, __bind(function(events) {
          if (this.displayAppointmentEvents) {
            return this.dataSource.getEventsForAppointmentGroup(this.displayAppointmentEvents, __bind(function(aEvents) {
              var event, _i, _j, _len, _len2;
              for (_i = 0, _len = events.length; _i < _len; _i++) {
                event = events[_i];
                event.removeClass('current-appointment-group');
              }
              for (_j = 0, _len2 = aEvents.length; _j < _len2; _j++) {
                event = aEvents[_j];
                event.addClass('current-appointment-group');
              }
              return cb(filterEvents(events.concat(aEvents)));
            }, this));
          } else {
            return cb(filterEvents(events));
          }
        }, this));
      };
      Calendar.prototype.eventRender = function(event, element, view) {
        var status;
        if (event.isAppointmentGroupEvent() && this.displayAppointmentEvents && this.displayAppointmentEvents.id === event.calendarEvent.appointment_group_id) {
          status = "Available";
          if (event.calendarEvent.available_slots > 0) {
            status = "" + event.calendarEvent.available_slots + " Available";
          }
          if (event.calendarEvent.available_slots === 0) {
            status = "Filled";
          }
          if (event.calendarEvent.reserved === true) {
            status = "Reserved";
          }
          $(element).find(".fc-event-title").text(status);
        }
        return true;
      };
      Calendar.prototype.eventAfterRender = function(event, element, view) {
        var _ref, _ref2;
        if (event.eventType === 'assignment' && event.isDueAtMidnight()) {
          element.find('.fc-event-time').text('12a');
        }
        if (event.eventType === 'assignment' && view.name === "agendaWeek") {
          element.height('').find('.ui-resizable-handle').remove();
        }
        if (event.eventType === 'calendar_event' && ((_ref = this.options) != null ? _ref.activateEvent : void 0) && event.id === ("calendar_event_" + ((_ref2 = this.options) != null ? _ref2.activateEvent : void 0))) {
          this.options.activateEvent = null;
          return this.eventClick(event, {
            currentTarget: element,
            pageX: element.offset().left + parseInt(element.width() / 2)
          }, view);
        }
      };
      Calendar.prototype.eventDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
        if (event.eventType === "assignment" && event.isDueAtMidnight() && minuteDelta === 0) {
          event.start.setMinutes(59);
        }
        return event.saveDates(null, revertFunc);
      };
      Calendar.prototype.eventClick = function(event, jsEvent, view) {
        return (new ShowEventDetailsDialog(event)).show(jsEvent);
      };
      Calendar.prototype.dayClick = function(date, allDay, jsEvent, view) {
        var event;
        if (this.displayAppointmentEvents) {
          return;
        }
        event = commonEventFactory(null, this.contexts);
        event.allDay = allDay;
        event.date = date;
        return (new EditEventDetailsDialog(event)).show();
      };
      Calendar.prototype.eventResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
        return event.saveDates(null, revertFunc);
      };
      Calendar.prototype.updateFragment = function(opts) {
        var data, k, v;
        data = this.dataFromDocumentHash();
        for (k in opts) {
          v = opts[k];
          data[k] = v;
        }
        return location.replace("#" + $.encodeToHex(JSON.stringify(data)));
      };
      Calendar.prototype.viewDisplay = function(view) {
        return this.updateFragment({
          view_start: $.dateToISO8601UTC(view.start)
        });
      };
      Calendar.prototype.drop = function(date, allDay, jsEvent, ui) {
        var el, event;
        el = $(jsEvent.target);
        event = el.data('calendarEvent');
        if (event) {
          event.start = date;
          event.addClass('event_pending');
          this.calendar.fullCalendar('renderEvent', event);
          return event.saveDates(null, function() {
            return console.log("could not save date on undated event");
          });
        }
      };
      Calendar.prototype.fragmentChange = function(event, hash) {
        var data, date, view, _ref;
        data = this.dataFromDocumentHash();
        view = (_ref = this.calendar) != null ? _ref.fullCalendar('getView') : void 0;
        if (!(view && !$.isEmptyObject(data))) {
          return;
        }
        if ((data.view_name === 'month' || data.view_name === 'agendaWeek') && data.view_name !== view.name) {
          this.calendar.fullCalendar('changeView', data.view_name);
        }
        if (data.view_start && data.view_start !== $.dateToISO8601UTC(view.start)) {
          date = $.fullCalendar.parseISO8601(data.view_start);
          if (date) {
            return this.calendar.fullCalendar('gotoDate', date);
          }
        }
      };
      Calendar.prototype.reloadClick = function(event) {
        event.preventDefault();
        if (this.activeAjax === 0) {
          this.dataSource.clearCache();
          if (this.currentView === 'scheduler') {
            this.scheduler.loadData();
          }
          return this.calendar.fullCalendar('refetchEvents');
        }
      };
      Calendar.prototype.eventDeleting = function(event) {
        event.addClass('event_pending');
        return this.calendar.fullCalendar('updateEvent', event);
      };
      Calendar.prototype.eventDeleted = function(event) {
        return this.calendar.fullCalendar('removeEvents', event.id);
      };
      Calendar.prototype.eventSaving = function(event) {
        if (!event.start) {
          return;
        }
        event.addClass('event_pending');
        if (event.isNewEvent()) {
          return this.calendar.fullCalendar('renderEvent', event);
        } else {
          return this.calendar.fullCalendar('updateEvent', event);
        }
      };
      Calendar.prototype.eventSaved = function(event) {
        event.removeClass('event_pending');
        return this.calendar.fullCalendar('refetchEvents');
      };
      Calendar.prototype.eventSaveFailed = function(event) {
        event.removeClass('event_pending');
        if (event.isNewEvent()) {
          return this.calendar.fullCalendar('removeEvents', event.id);
        } else {
          return this.calendar.fullCalendar('updateEvent', event);
        }
      };
      Calendar.prototype.visibleContextListChanged = function(newList) {
        this.visibleContextList = newList;
        return this.calendar.fullCalendar('refetchEvents');
      };
      Calendar.prototype.ajaxStarted = function() {
        this.activeAjax += 1;
        return this.$refresh_calendar_link.addClass('loading');
      };
      Calendar.prototype.ajaxEnded = function() {
        this.activeAjax -= 1;
        if (!this.activeAjax) {
          return this.$refresh_calendar_link.removeClass('loading');
        }
      };
      Calendar.prototype.refetchEvents = function() {
        return this.calendar.fullCalendar('refetchEvents');
      };
      Calendar.prototype.gotoDate = function(d) {
        return this.calendar.fullCalendar("gotoDate", d);
      };
      Calendar.prototype.loadView = function(view) {
        this.updateFragment({
          view_name: view
        });
        if (view !== 'scheduler') {
          this.currentView = view;
          this.calendar.removeClass('scheduler-mode');
          this.displayAppointmentEvents = null;
          this.scheduler.hide();
          this.calendar.show();
          this.calendar.fullCalendar('refetchEvents');
          return this.calendar.fullCalendar('changeView', view === 'week' ? 'agendaWeek' : 'month');
        } else {
          this.currentView = 'scheduler';
          this.calendar.addClass('scheduler-mode');
          this.calendar.hide();
          return this.scheduler.show();
        }
      };
      $styleContainer = $('<div />').appendTo('body');
      hues = [43, 5, 205, 85, 289, 63, 230, 186, 115, 330];
      cssColor = function(h, s, b) {
        var rgbArray;
        rgbArray = hsvToRgb(h, s, b);
        return "rgb(" + (rgbArray.join(' ,')) + ")";
      };
      Calendar.prototype.colorizeContexts = function() {
        var bgBrightness, bgSaturation, contextCode, html, hue, index, strokeBrightness, strokeSaturation, textBrightness, textSaturation, _ref, _ref2, _ref3;
        _ref = [30, 96], bgSaturation = _ref[0], bgBrightness = _ref[1];
        _ref2 = [60, 40], textSaturation = _ref2[0], textBrightness = _ref2[1];
        _ref3 = [70, 70], strokeSaturation = _ref3[0], strokeBrightness = _ref3[1];
        html = (function() {
          var _len, _ref4, _results;
          _ref4 = this.contextCodes;
          _results = [];
          for (index = 0, _len = _ref4.length; index < _len; index++) {
            contextCode = _ref4[index];
            hue = hues[index % hues.length];
            _results.push(".group_" + contextCode + "{           color: " + (cssColor(hue, textSaturation, textBrightness)) + ";           border-color: " + (cssColor(hue, strokeSaturation, strokeBrightness)) + ";           background-color: " + (cssColor(hue, bgSaturation, bgBrightness)) + ";        }");
          }
          return _results;
        }).call(this);
        return $styleContainer.html("<style>" + (html.join('')) + "</style>");
      };
      Calendar.prototype.dataFromDocumentHash = function() {
        var data;
        data = {};
        try {
          data = $.parseJSON($.decodeFromHex(location.hash.substring(1))) || {};
        } catch (e) {
          data = {};
        }
        return data;
      };
      return Calendar;
    })();
  });
}).call(this);
