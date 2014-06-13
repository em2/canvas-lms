(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['jquery', 'use!underscore', 'compiled/backbone-ext/Backbone', 'compiled/str/splitAssetString'], function($, _, Backbone, splitAssetString) {
    var CalendarEvent;
    return CalendarEvent = (function() {
      __extends(CalendarEvent, Backbone.Model);
      function CalendarEvent() {
        CalendarEvent.__super__.constructor.apply(this, arguments);
      }
      CalendarEvent.prototype.urlRoot = '/api/v1/calendar_events/';
      CalendarEvent.prototype.dateAttributes = ['created_at', 'end_at', 'start_at', 'updated_at'];
      CalendarEvent.prototype._filterAttributes = function(obj) {
        var attr, filtered, _i, _len, _ref;
        filtered = {};
        _ref = ['start_at', 'end_at', 'title', 'description', 'context_code'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attr = _ref[_i];
          filtered[attr] = obj[attr];
        }
        if (obj.use_section_dates && obj.child_event_data) {
          filtered.child_event_data = _.chain(obj.child_event_data).compact().filter(this._hasValidInputs).map(this._filterAttributes).value();
        }
        return filtered;
      };
      CalendarEvent.prototype._hasValidInputs = function(o) {
        return o.start_date && (!!o.start_time === !!o.end_time);
      };
      CalendarEvent.prototype.toJSON = function(forView) {
        var json;
        json = CalendarEvent.__super__.toJSON.apply(this, arguments);
        if (forView) {
          return json;
        } else {
          return {
            calendar_event: this._filterAttributes(json)
          };
        }
      };
      CalendarEvent.prototype.fetch = function(options) {
        var combinedSuccess, error, model, sectionsDfd, success, syncDfd;
        if (options == null) {
          options = {};
        }
        options = _.clone(options);
        model = this;
        success = options.success;
        delete options.success;
        error = Backbone.wrapError(options.error, model, options);
        delete options.error;
        if (this.get('id')) {
          syncDfd = (this.sync || Backbone.sync).call(this, 'read', this, options);
        }
        if (this.get('sections_url')) {
          sectionsDfd = $.getJSON(this.get('sections_url'));
        }
        combinedSuccess = function(syncArgs, sectionArgs) {
          var calEventData, sectionsResp, syncResp, syncStatus, syncXhr;
          if (syncArgs == null) {
            syncArgs = [];
          }
          if (sectionArgs == null) {
            sectionArgs = [];
          }
          syncResp = syncArgs[0], syncStatus = syncArgs[1], syncXhr = syncArgs[2];
          sectionsResp = sectionArgs[0];
          calEventData = CalendarEvent.mergeSectionsIntoCalendarEvent(syncResp, sectionsResp);
          if (!model.set(model.parse(calEventData, syncXhr), options)) {
            return false;
          }
          return typeof success === "function" ? success(model, calEventData) : void 0;
        };
        return $.when(syncDfd, sectionsDfd).fail(error).done(combinedSuccess);
      };
      CalendarEvent.mergeSectionsIntoCalendarEvent = function(eventData, sections) {
        var _ref;
        if (eventData == null) {
          eventData = {};
        }
        eventData.course_sections = sections;
        eventData.use_section_dates = !!((_ref = eventData.child_events) != null ? _ref.length : void 0);
        _(eventData.child_events).each(function(child, index) {
          var section, sectionId;
          child = eventData.child_events[index] = CalendarEvent.prototype.parse(child);
          sectionId = splitAssetString(child.context_code)[1];
          section = _(sections).find(function(section) {
            return section.id === sectionId;
          });
          return section.event = child;
        });
        return eventData;
      };
      return CalendarEvent;
    })();
  });
}).call(this);
