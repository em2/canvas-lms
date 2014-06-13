(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['compiled/backbone-ext/Backbone', 'compiled/util/BackoffPoller'], function(Backbone, BackoffPoller) {
    var Topic;
    return Topic = (function() {
      __extends(Topic, Backbone.Model);
      function Topic() {
        Topic.__super__.constructor.apply(this, arguments);
      }
      Topic.prototype.defaults = {
        participants: [],
        unread_entries: [],
        view: null,
        new_entries: []
      };
      Topic.prototype.url = ENV.DISCUSSION.ROOT_URL + '?include_new_entries=1';
      Topic.prototype.fetch = function(options) {
        var loader;
        if (options == null) {
          options = {};
        }
        loader = new BackoffPoller(this.url, __bind(function(data, xhr) {
          if (xhr.status === 503) {
            return 'continue';
          }
          if (xhr.status !== 200) {
            return 'abort';
          }
          this.set(this.parse(data, 200, xhr));
          if (typeof options.success === "function") {
            options.success(this, data);
          }
          return 'stop';
        }, this), {
          handleErrors: true,
          initialDelay: false,
          baseInterval: 2000,
          maxAttempts: 12,
          backoffFactor: 1.6
        });
        return loader.start();
      };
      Topic.prototype.initialize = function() {
        Topic.__super__.initialize.apply(this, arguments);
        return this.cid = 'discussion_topic';
      };
      return Topic;
    })();
  });
}).call(this);
