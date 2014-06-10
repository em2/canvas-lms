(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'jquery.ajaxJSON', 'vendor/jquery.ba-tinypubsub'], function($) {
    return (function() {
      function _Class(data, contextInfo, actualContextInfo) {
        this.save = __bind(this.save, this);
        this.removeClass = __bind(this.removeClass, this);
        this.addClass = __bind(this.addClass, this);
        this.isUndated = __bind(this.isUndated, this);
        this.contextCode = __bind(this.contextCode, this);
        this.isAppointmentGroupEvent = __bind(this.isAppointmentGroupEvent, this);
        this.isAppointmentGroupFilledEvent = __bind(this.isAppointmentGroupFilledEvent, this);
        this.isNewEvent = __bind(this.isNewEvent, this);        this.eventType = 'generic';
        this.contextInfo = contextInfo;
        this.actualContextInfo = actualContextInfo;
        this.allPossibleContexts = null;
        this.className = [];
        this.object = {};
      }
      _Class.prototype.isNewEvent = function() {
        var _ref;
        return this.eventType === 'generic' || !((_ref = this.object) != null ? _ref.id : void 0);
      };
      _Class.prototype.isAppointmentGroupFilledEvent = function() {
        var _ref, _ref2;
        return ((_ref = this.object) != null ? (_ref2 = _ref.child_events) != null ? _ref2.length : void 0 : void 0) > 0;
      };
      _Class.prototype.isAppointmentGroupEvent = function() {
        var _ref;
        return (_ref = this.object) != null ? _ref.appointment_group_url : void 0;
      };
      _Class.prototype.contextCode = function() {
        var _ref, _ref2, _ref3;
        return ((_ref = this.object) != null ? _ref.effective_context_code : void 0) || ((_ref2 = this.object) != null ? _ref2.context_code : void 0) || ((_ref3 = this.contextInfo) != null ? _ref3.asset_string : void 0);
      };
      _Class.prototype.isUndated = function() {
        return this.start === null;
      };
      _Class.prototype.displayTimeString = function() {
        return "";
      };
      _Class.prototype.readableType = function() {
        return "";
      };
      _Class.prototype.fullDetailsURL = function() {
        return null;
      };
      _Class.prototype.startDate = function() {
        return this.date;
      };
      _Class.prototype.endDate = function() {
        return this.startDate();
      };
      _Class.prototype.possibleContexts = function() {
        return this.allPossibleContexts || [this.contextInfo];
      };
      _Class.prototype.addClass = function(newClass) {
        var c, found, _i, _len, _ref;
        found = false;
        _ref = this.className;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (c === newClass) {
            found = true;
            break;
          }
        }
        if (!found) {
          return this.className.push(newClass);
        }
      };
      _Class.prototype.removeClass = function(rmClass) {
        var c, idx, _i, _len, _ref, _results;
        idx = 0;
        _ref = this.className;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c === rmClass ? this.className.splice(idx, 1) : idx += 1);
        }
        return _results;
      };
      _Class.prototype.save = function(params, success, error) {
        var method, onError, onSuccess, url, _ref;
        onSuccess = __bind(function(data) {
          this.copyDataFromObject(data);
          $.publish("CommonEvent/eventSaved", this);
          return typeof success === "function" ? success() : void 0;
        }, this);
        onError = __bind(function(data) {
          $.publish("CommonEvent/eventSaveFailed", this);
          return typeof error === "function" ? error() : void 0;
        }, this);
        _ref = this.methodAndURLForSave(), method = _ref[0], url = _ref[1];
        $.publish("CommonEvent/eventSaving", this);
        return $.ajaxJSON(url, method, params, onSuccess, onError);
      };
      return _Class;
    })();
  });
}).call(this);
