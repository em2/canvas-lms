(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['compiled/backbone-ext/Backbone', 'i18n!discussions', 'use!underscore', 'jquery', 'jquery.ajaxJSON'], function(Backbone, I18n, _, $) {
    var CHECK_THROTTLE, MS_UNTIL_READ, MarkAsReadWatcher;
    MS_UNTIL_READ = 2000;
    CHECK_THROTTLE = 100;
    MarkAsReadWatcher = (function() {
      var $window;
      MarkAsReadWatcher.unread = [];
      function MarkAsReadWatcher(view) {
        this.view = view;
        this.markAsRead = __bind(this.markAsRead, this);
        MarkAsReadWatcher.unread.push(this);
        this.view.model.bind('change:collapsedView', __bind(function(model, collapsedView) {
          this.ignore = collapsedView;
          if (collapsedView) {
            return this.clearTimer();
          }
        }, this));
      }
      MarkAsReadWatcher.prototype.createTimer = function() {
        return this.timer || (this.timer = setTimeout(this.markAsRead, MS_UNTIL_READ));
      };
      MarkAsReadWatcher.prototype.clearTimer = function() {
        clearTimeout(this.timer);
        return delete this.timer;
      };
      MarkAsReadWatcher.prototype.markAsRead = function() {
        this.view.model.markAsRead();
        MarkAsReadWatcher.unread = _(MarkAsReadWatcher.unread).without(this);
        return MarkAsReadWatcher.trigger('markAsRead', this.view.model);
      };
      $window = $(window);
      MarkAsReadWatcher.init = function() {
        $window.bind('scroll resize', this.checkForVisibleEntries);
        return this.checkForVisibleEntries();
      };
      MarkAsReadWatcher.checkForVisibleEntries = _.throttle(__bind(function() {
        var bottomOfViewport, entry, inView, topOfElement, topOfViewport, _i, _len, _ref;
        topOfViewport = $window.scrollTop();
        bottomOfViewport = topOfViewport + $window.height();
        _ref = this.unread;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entry = _ref[_i];
          if (entry.ignore) {
            continue;
          }
          topOfElement = entry.view.$el.offset().top;
          inView = (topOfElement < bottomOfViewport) && (topOfElement + entry.view.$el.height() > topOfViewport);
          entry[inView ? 'createTimer' : 'clearTimer']();
        }
      }, MarkAsReadWatcher), CHECK_THROTTLE);
      return MarkAsReadWatcher;
    }).call(this);
    return _.extend(MarkAsReadWatcher, Backbone.Events);
  });
}).call(this);
