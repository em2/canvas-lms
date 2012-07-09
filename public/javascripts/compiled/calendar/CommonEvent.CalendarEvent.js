(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['i18n!calendar', 'compiled/util/semanticDateRange', 'compiled/calendar/CommonEvent', 'jquery.instructure_date_and_time', 'jquery.instructure_misc_helpers'], function(I18n, semanticDateRange, CommonEvent) {
    var CalendarEvent, deleteConfirmation;
    deleteConfirmation = I18n.t('prompts.delete_event', "Are you sure you want to delete this event?");
    return CalendarEvent = (function() {
      __extends(CalendarEvent, CommonEvent);
      function CalendarEvent(data, contextInfo, actualContextInfo) {
        this.saveDates = __bind(this.saveDates, this);
        this.copyDataFromObject = __bind(this.copyDataFromObject, this);        CalendarEvent.__super__.constructor.call(this, data, contextInfo, actualContextInfo);
        this.eventType = 'calendar_event';
        this.deleteConfirmation = deleteConfirmation;
        this.deleteURL = contextInfo.calendar_event_url;
        this.copyDataFromObject(data);
      }
      CalendarEvent.prototype.copyDataFromObject = function(data) {
        if (data.calendar_event) {
          data = data.calendar_event;
        }
        this.object = this.calendarEvent = data;
        this.id = "calendar_event_" + data.id;
        this.title = data.title || "Untitled";
        this.start = data.start_at ? $.parseFromISO(data.start_at).time : null;
        this.end = data.end_at ? $.parseFromISO(data.end_at).time : null;
        this.allDay = data.all_day;
        this.editable = true;
        this.lockedTitle = this.object.parent_event_id != null;
        this.addClass("group_" + (this.contextCode()));
        if (this.isAppointmentGroupEvent()) {
          this.addClass("scheduler-event");
          if (this.object.reserved) {
            this.addClass("scheduler-reserved");
          }
          if (this.object.available_slots === 0) {
            this.addClass("scheduler-full");
          }
          if (this.object.available_slots === void 0 || this.object.available_slots > 0) {
            this.addClass("scheduler-available");
          }
          this.editable = false;
        }
        return this.description = data.description;
      };
      CalendarEvent.prototype.startDate = function() {
        if (this.calendarEvent.start_at) {
          return $.parseFromISO(this.calendarEvent.start_at).time;
        } else {
          return null;
        }
      };
      CalendarEvent.prototype.endDate = function() {
        if (this.calendarEvent.end_at) {
          return $.parseFromISO(this.calendarEvent.end_at).time;
        } else {
          return null;
        }
      };
      CalendarEvent.prototype.fullDetailsURL = function() {
        var _ref;
        if (this.isAppointmentGroupEvent()) {
          return null;
        }
        return $.replaceTags(this.contextInfo.calendar_event_url, 'id', (_ref = this.calendarEvent.parent_event_id) != null ? _ref : this.calendarEvent.id);
      };
      CalendarEvent.prototype.displayTimeString = function() {
        return semanticDateRange(this.calendarEvent.start_at, this.calendarEvent.end_at);
      };
      CalendarEvent.prototype.saveDates = function(success, error) {
        return this.save({
          'calendar_event[start_at]': this.start ? $.dateToISO8601UTC($.unfudgeDateForProfileTimezone(this.start)) : '',
          'calendar_event[end_at]': this.end ? $.dateToISO8601UTC($.unfudgeDateForProfileTimezone(this.end)) : ''
        }, success, error);
      };
      CalendarEvent.prototype.methodAndURLForSave = function() {
        var method, url;
        if (this.isNewEvent()) {
          method = 'POST';
          url = '/api/v1/calendar_events';
        } else {
          method = 'PUT';
          url = this.calendarEvent.url;
        }
        return [method, url];
      };
      return CalendarEvent;
    })();
  });
}).call(this);
