(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['use!backbone', 'use!underscore'], function(Backbone, _) {
    _.extend(Backbone.View.prototype, {
      render: function(opts) {
        if (opts == null) {
          opts = {};
        }
        if (opts.noFilter !== true) {
          return this._filter();
        }
      },
      _filter: function() {
        this.$('[data-bind]').each(__bind(function() {
          return this._createBinding.apply(this, arguments);
        }, this));
        return this.$('[data-behavior]').each(__bind(function() {
          return this._createBehavior.apply(this, arguments);
        }, this));
      },
      _createBinding: function(index, el) {
        var $el, attribute;
        $el = $(el);
        attribute = $el.data('bind');
        return this.model.bind("change:" + attribute, __bind(function(model, value) {
          return $el.html(value);
        }, this));
      },
      _createBehavior: function(index, el) {}
    });
    return Backbone.View;
  });
}).call(this);
