(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['use!backbone', 'use!underscore'], function(Backbone, _) {
    _.extend(Backbone.Model.prototype, {
      initialize: function() {
        if (this.computedAttributes != null) {
          return this._configureComputedAttributes();
        }
      },
      _configureComputedAttributes: function() {
        var set;
        set = __bind(function(methodName) {
          return this.set(methodName, this[methodName]());
        }, this);
        return _.each(this.computedAttributes, __bind(function(methodName) {
          var eventName;
          if (typeof methodName === 'string') {
            return set(methodName);
          } else {
            set(methodName.name);
            eventName = _.map(methodName.deps, function(name) {
              return "change:" + name;
            }).join(' ');
            return this.bind(eventName, function() {
              return set(methodName.name);
            });
          }
        }, this));
      }
    });
    return Backbone.Model;
  });
}).call(this);
