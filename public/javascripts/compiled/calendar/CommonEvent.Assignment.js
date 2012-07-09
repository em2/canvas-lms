(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['i18n!calendar', 'compiled/calendar/CommonEvent', 'jquery.instructure_date_and_time', 'jquery.instructure_misc_helpers'], function(I18n, CommonEvent) {
    var Assignment, deleteConfirmation;
    deleteConfirmation = I18n.t('prompts.delete_assignment', "Are you sure you want to delete this assignment?");
    return Assignment = (function() {
      __extends(Assignment, CommonEvent);
      function Assignment(data, contextInfo) {
        this.saveDates = __bind(this.saveDates, this);
        this.copyDataFromObject = __bind(this.copyDataFromObject, this);        Assignment.__super__.constructor.apply(this, arguments);
        this.eventType = 'assignment';
        this.deleteConfirmation = deleteConfirmation;
        this.deleteURL = contextInfo.assignment_url;
        this.addClass('assignment');
        this.copyDataFromObject(data);
      }
      Assignment.prototype.copyDataFromObject = function(data) {
        if (data.assignment) {
          data = data.assignment;
        }
        this.object = this.assignment = data;
        this.id = "assignment_" + data.id;
        this.title = data.title || data.name || "Untitled";
        this.addClass("group_" + (this.contextCode()));
        this.start = data.due_at ? $.parseFromISO(data.due_at, "due_date").time : null;
        if (this.isDueAtMidnight()) {
          this.midnightFudged = true;
          this.start.setMinutes(30);
        }
        return this.description = data.description;
      };
      Assignment.prototype.fullDetailsURL = function() {
        return $.replaceTags(this.contextInfo.assignment_url, 'id', this.assignment.id);
      };
      Assignment.prototype.startDate = function() {
        if (this.assignment.due_at) {
          return $.parseFromISO(this.assignment.due_at, 'due_date').time;
        } else {
          return null;
        }
      };
      Assignment.prototype.displayTimeString = function() {
        var date, time_string;
        if (!this.assignment.due_at) {
          return "No Date";
        }
        date = $.parseFromISO(this.assignment.due_at, 'due_date');
        time_string = "" + ($.dateString(date.date)) + " at " + date.time_string;
        return "Due: <time datetime='" + (date.time.toISOString()) + "'>" + time_string + "</time>";
      };
      Assignment.prototype.saveDates = function(success, error) {
        return this.save({
          'assignment[due_at]': $.dateToISO8601UTC($.unfudgeDateForProfileTimezone(this.start))
        }, success, error);
      };
      Assignment.prototype.methodAndURLForSave = function() {
        var method, url;
        if (this.isNewEvent()) {
          method = 'POST';
          url = this.contextInfo.create_assignment_url;
        } else {
          method = 'PUT';
          url = $.replaceTags(this.contextInfo.assignment_url, 'id', this.assignment.id);
        }
        return [method, url];
      };
      Assignment.prototype.isDueAtMidnight = function() {
        return this.midnightFudged || this.start && this.start.getHours() === 23 && this.start.getMinutes() === 59;
      };
      return Assignment;
    })();
  });
}).call(this);
