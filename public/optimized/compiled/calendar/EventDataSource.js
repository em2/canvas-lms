(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'compiled/calendar/commonEventFactory', 'jquery.ajaxJSON', 'vendor/jquery.ba-tinypubsub'], function($, commonEventFactory) {
    return (function() {
      function _Class(contexts) {
        this.fetchNextBatch = __bind(this.fetchNextBatch, this);
        this.startFetch = __bind(this.startFetch, this);
        this.getParticipants = __bind(this.getParticipants, this);
        this.getEvents = __bind(this.getEvents, this);
        this.getEventsForAppointmentGroup = __bind(this.getEventsForAppointmentGroup, this);
        this.processAppointmentData = __bind(this.processAppointmentData, this);
        this.getAppointmentGroups = __bind(this.getAppointmentGroups, this);
        this.getAppointmentGroupsFromCache = __bind(this.getAppointmentGroupsFromCache, this);
        this.getEventsFromCache = __bind(this.getEventsFromCache, this);
        this.processNextRequest = __bind(this.processNextRequest, this);
        this.getEventsFromCacheForContext = __bind(this.getEventsFromCacheForContext, this);
        this.addEventToCache = __bind(this.addEventToCache, this);
        this.needUndatedEventsForContexts = __bind(this.needUndatedEventsForContexts, this);
        this.requiredDateRangeForContexts = __bind(this.requiredDateRangeForContexts, this);
        this.requiredDateRangeForContext = __bind(this.requiredDateRangeForContext, this);
        this.clearCache = __bind(this.clearCache, this);
        this.eventWithId = __bind(this.eventWithId, this);
        this.eventDeleted = __bind(this.eventDeleted, this);
        this.eventSaved = __bind(this.eventSaved, this);        this.contexts = contexts;
        this.clearCache();
        this.inFlightRequest = false;
        this.pendingRequests = [];
        $.subscribe("CommonEvent/eventDeleted", this.eventDeleted);
        $.subscribe("CommonEvent/eventSaved", this.eventSaved);
      }
      _Class.prototype.eventSaved = function(event) {
        return this.addEventToCache(event);
      };
      _Class.prototype.eventDeleted = function(event) {
        var events, _ref;
        events = (_ref = this.cache.contexts[event.contextCode()]) != null ? _ref.events : void 0;
        if (events) {
          return delete events[event.id];
        }
      };
      _Class.prototype.eventWithId = function(id) {
        var contextCode, contextData, _ref;
        _ref = this.cache.contexts;
        for (contextCode in _ref) {
          contextData = _ref[contextCode];
          if (contextData.events[id]) {
            return contextData.events[id];
          }
        }
        return null;
      };
      _Class.prototype.clearCache = function() {
        var contextInfo, _i, _len, _ref, _results;
        this.cache = {
          contexts: {},
          appointmentGroups: {},
          participants: {},
          fetchedAppointmentGroups: null
        };
        _ref = this.contexts;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          contextInfo = _ref[_i];
          _results.push(this.cache.contexts[contextInfo.asset_string] = {
            events: {},
            fetchedRanges: [],
            fetchedUndated: false
          });
        }
        return _results;
      };
      _Class.prototype.requiredDateRangeForContext = function(start, end, context) {
        var contextInfo, range, ranges, _i, _len;
        if (!(contextInfo = this.cache.contexts[context])) {
          return [start, end];
        }
        if (!(ranges = contextInfo.fetchedRanges)) {
          return [start, end];
        }
        for (_i = 0, _len = ranges.length; _i < _len; _i++) {
          range = ranges[_i];
          if (range[0] <= start && start <= range[1]) {
            start = range[1];
          }
          if (range[0] <= end && end <= range[1]) {
            end = range[0];
          }
        }
        return [start, end];
      };
      _Class.prototype.requiredDateRangeForContexts = function(start, end, contexts) {
        var context, e, earliest, latest, s, _i, _len, _ref;
        earliest = end;
        latest = start;
        for (_i = 0, _len = contexts.length; _i < _len; _i++) {
          context = contexts[_i];
          _ref = this.requiredDateRangeForContext(start, end, context), s = _ref[0], e = _ref[1];
          if (s < earliest) {
            earliest = s;
          }
          if (e > latest) {
            latest = e;
          }
        }
        return [earliest, latest];
      };
      _Class.prototype.needUndatedEventsForContexts = function(contexts) {
        var context, _i, _len;
        for (_i = 0, _len = contexts.length; _i < _len; _i++) {
          context = contexts[_i];
          if (!this.cache.contexts[context].fetchedUndated) {
            return true;
          }
        }
        return false;
      };
      _Class.prototype.addEventToCache = function(event) {
        var contextCode, contextInfo;
        contextCode = event.contextCode();
        contextInfo = this.cache.contexts[contextCode];
        return contextInfo.events[event.id] = event;
      };
      _Class.prototype.getEventsFromCacheForContext = function(start, end, context) {
        var contextInfo, event, events, id, _ref;
        contextInfo = this.cache.contexts[context];
        events = [];
        _ref = contextInfo.events;
        for (id in _ref) {
          event = _ref[id];
          if (!event.start && !start || event.start >= start && event.start <= end) {
            events.push(event);
          }
        }
        return events;
      };
      _Class.prototype.processNextRequest = function() {
        var args, method, request;
        request = this.pendingRequests.shift();
        if (request) {
          method = request[0];
          args = request[1];
          return method.apply(null, args);
        }
      };
      _Class.prototype.getEventsFromCache = function(start, end, contexts) {
        var context, events, _i, _len;
        events = [];
        for (_i = 0, _len = contexts.length; _i < _len; _i++) {
          context = contexts[_i];
          events = events.concat(this.getEventsFromCacheForContext(start, end, context));
        }
        return events;
      };
      _Class.prototype.getAppointmentGroupsFromCache = function() {
        var group, id, _ref, _results;
        _ref = this.cache.appointmentGroups;
        _results = [];
        for (id in _ref) {
          group = _ref[id];
          _results.push(group);
        }
        return _results;
      };
      _Class.prototype.getAppointmentGroups = function(fetchManageable, cb) {
        var dataCB, doneCB, fetchJobs;
        if (this.inFlightRequest) {
          this.pendingRequests.push([this.getAppointmentGroups, arguments]);
          return;
        }
        if (this.cache.fetchedAppointmentGroups && this.cache.fetchedAppointmentGroups.manageable === fetchManageable) {
          cb(this.getAppointmentGroupsFromCache());
          this.processNextRequest();
          return;
        }
        this.cache.fetchedAppointmentGroups = {
          manageable: fetchManageable
        };
        this.cache.appointmentGroups = {};
        dataCB = __bind(function(data, url, params) {
          var group, _i, _len, _results;
          if (data) {
            _results = [];
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              group = data[_i];
              if (params.scope === "manageable") {
                group.is_manageable = true;
              } else {
                group.is_scheduleable = true;
              }
              _results.push(this.processAppointmentData(group));
            }
            return _results;
          }
        }, this);
        doneCB = __bind(function() {
          return cb(this.getAppointmentGroupsFromCache());
        }, this);
        fetchJobs = [
          [
            '/api/v1/appointment_groups', {
              include: ['appointments', 'child_events']
            }
          ]
        ];
        if (fetchManageable) {
          fetchJobs.push([
            '/api/v1/appointment_groups', {
              scope: 'manageable',
              include: ['appointments', 'child_events']
            }
          ]);
        }
        return this.startFetch(fetchJobs, dataCB, doneCB);
      };
      _Class.prototype.processAppointmentData = function(group) {
        var childEvent, childEventData, event, eventData, id, _i, _len, _ref, _results;
        id = group.id;
        this.cache.appointmentGroups[id] = group;
        if (group.appointments) {
          group.appointmentEvents = [];
          _ref = group.appointments;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            eventData = _ref[_i];
            event = commonEventFactory(eventData, this.contexts);
            _results.push((function() {
              var _j, _len2, _ref2, _results2;
              if (event && event.object.workflow_state !== 'deleted') {
                group.appointmentEvents.push(event);
                this.addEventToCache(event);
                if (eventData.child_events) {
                  event.childEvents = [];
                  _ref2 = eventData.child_events;
                  _results2 = [];
                  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                    childEventData = _ref2[_j];
                    childEvent = commonEventFactory(childEventData, this.contexts);
                    this.addEventToCache(event);
                    _results2.push(event.childEvents.push(childEvent));
                  }
                  return _results2;
                }
              }
            }).call(this));
          }
          return _results;
        }
      };
      _Class.prototype.getEventsForAppointmentGroup = function(group, cb) {
        var dataCB, params;
        if (this.inFlightRequest) {
          this.pendingRequests.push([this.getEventsForAppointmentGroup, arguments]);
          return;
        }
        if (group.appointmentEvents) {
          cb(group.appointmentEvents);
          this.processNextRequest();
          return;
        }
        dataCB = __bind(function(data) {
          if (data) {
            return this.processAppointmentData(data);
          }
        }, this);
        params = {
          include: ['appointments', 'child_events']
        };
        return this.startFetch([[group.url, params]], dataCB, (__bind(function() {
          return cb(group.appointmentEvents);
        }, this)));
      };
      _Class.prototype.getEvents = function(start, end, contexts, cb) {
        var context, contextInfo, dataCB, doneCB, params, paramsForDatedEvents, paramsForUndatedEvents, _i, _len;
        if (this.inFlightRequest) {
          this.pendingRequests.push([this.getEvents, arguments]);
          return;
        }
        paramsForDatedEvents = __bind(function(start, end, contexts) {
          var endDay, startDay, _ref;
          _ref = this.requiredDateRangeForContexts(start, end, contexts), startDay = _ref[0], endDay = _ref[1];
          if (startDay >= endDay) {
            return null;
          }
          return {
            context_codes: contexts,
            start_date: $.dateToISO8601UTC(startDay),
            end_date: $.dateToISO8601UTC(endDay)
          };
        }, this);
        paramsForUndatedEvents = __bind(function(contexts) {
          if (!this.needUndatedEventsForContexts(contexts)) {
            return null;
          }
          return {
            context_codes: contexts,
            undated: '1'
          };
        }, this);
        params = start ? paramsForDatedEvents(start, end, contexts) : paramsForUndatedEvents(contexts);
        if (!params) {
          cb(this.getEventsFromCache(start, end, contexts));
          this.processNextRequest();
          return;
        }
        for (_i = 0, _len = contexts.length; _i < _len; _i++) {
          context = contexts[_i];
          contextInfo = this.cache.contexts[context];
          if (contextInfo) {
            if (start) {
              contextInfo.fetchedRanges.push([start, end]);
            } else {
              contextInfo.fetchedUndated = true;
            }
          }
        }
        doneCB = __bind(function() {
          return cb(this.getEventsFromCache(start, end, contexts));
        }, this);
        dataCB = __bind(function(data) {
          var e, event, _j, _len2, _results;
          if (data) {
            _results = [];
            for (_j = 0, _len2 = data.length; _j < _len2; _j++) {
              e = data[_j];
              event = commonEventFactory(e, this.contexts);
              _results.push(event && event.object.workflow_state !== 'deleted' ? this.addEventToCache(event) : void 0);
            }
            return _results;
          }
        }, this);
        return this.startFetch([
          ['/api/v1/calendar_events', params], [
            '/api/v1/calendar_events', $.extend({
              type: 'assignment'
            }, params)
          ]
        ], dataCB, doneCB);
      };
      _Class.prototype.getParticipants = function(appointmentGroup, registrationStatus, cb) {
        var dataCB, doneCB, key, type;
        if (this.inFlightRequest) {
          this.pendingRequests.push([this.getParticipants, arguments]);
          return;
        }
        key = "" + appointmentGroup.id + "_" + registrationStatus;
        if (this.cache.participants[key]) {
          cb(this.cache.participants[key]);
          this.processNextRequest();
          return;
        }
        this.cache.participants[key] = [];
        dataCB = __bind(function(data, url, params) {
          if (data) {
            return this.cache.participants[key].push.apply(this.cache.participants[key], data);
          }
        }, this);
        doneCB = __bind(function() {
          return cb(this.cache.participants[key]);
        }, this);
        type = appointmentGroup.participant_type === "Group" ? 'groups' : 'users';
        return this.startFetch([
          [
            "/api/v1/appointment_groups/" + appointmentGroup.id + "/" + type, {
              registration_status: registrationStatus
            }
          ]
        ], dataCB, doneCB);
      };
      _Class.prototype.startFetch = function(urlAndParamsArray, dataCB, doneCB) {
        var numCompleted, urlAndParams, wrapperCB, _i, _len, _results;
        numCompleted = 0;
        this.inFlightRequest = true;
        wrapperCB = __bind(function(data, isDone, url, params) {
          dataCB(data, url, params);
          if (isDone) {
            numCompleted += 1;
            if (numCompleted >= urlAndParamsArray.length) {
              doneCB();
              this.inFlightRequest = false;
              return this.processNextRequest();
            }
          }
        }, this);
        _results = [];
        for (_i = 0, _len = urlAndParamsArray.length; _i < _len; _i++) {
          urlAndParams = urlAndParamsArray[_i];
          _results.push(__bind(function(urlAndParams) {
            return this.fetchNextBatch(urlAndParams[0], urlAndParams[1], function(data, isDone) {
              return wrapperCB(data, isDone, urlAndParams[0], urlAndParams[1]);
            });
          }, this)(urlAndParams));
        }
        return _results;
      };
      _Class.prototype.fetchNextBatch = function(url, params, cb) {
        var parseLinkHeader;
        parseLinkHeader = function(header) {
          var component, link, rel, rels, _i, _len, _ref, _ref2;
          if (!header) {
            return null;
          }
          rels = {};
          _ref = header.split(',');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            component = _ref[_i];
            _ref2 = component.split(';'), link = _ref2[0], rel = _ref2[1];
            link = link.replace(/^</, '').replace(/>$/, '');
            rel = rel.split('"')[1];
            rels[rel] = link;
          }
          return rels;
        };
        $.publish("EventDataSource/ajaxStarted");
        params.per_page = 50;
        return $.ajaxJSON(url, 'GET', params, __bind(function(data, xhr) {
          var linkHeader, rels;
          $.publish("EventDataSource/ajaxEnded");
          linkHeader = typeof xhr.getResponseHeader === "function" ? xhr.getResponseHeader('Link') : void 0;
          rels = parseLinkHeader(linkHeader);
          if (rels != null ? rels.next : void 0) {
            cb(data, false);
            this.fetchNextBatch(rels.next, params, cb);
            return;
          }
          return cb(data, true);
        }, this));
      };
      return _Class;
    })();
  });
}).call(this);
