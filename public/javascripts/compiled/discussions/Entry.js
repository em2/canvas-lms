(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['jquery', 'use!underscore', 'compiled/backbone-ext/Backbone', 'compiled/util/backbone.multipart.sync', 'jquery.ajaxJSON'], function($, _, Backbone) {
    var Entry;
    return Entry = (function() {
      __extends(Entry, Backbone.Model);
      function Entry() {
        Entry.__super__.constructor.apply(this, arguments);
      }
      Entry.prototype.defaults = {
        id: null,
        parent_id: null,
        message: null,
        user_id: null,
        read_state: 'read',
        created_at: null,
        updated_at: null,
        deleted: false,
        attachment: null,
        replies: [],
        parent_cid: null,
        collapsedView: false,
        canAttach: ENV.DISCUSSION.PERMISSIONS.CAN_ATTACH,
        focused: false
      };
      Entry.prototype.computedAttributes = [
        'author', 'editor', 'canModerate', 'allowsSideComments', 'hideRepliesOnCollapse', 'speedgraderUrl', {
          name: 'canReply',
          deps: ['parent_id']
        }, {
          name: 'summary',
          deps: ['message']
        }
      ];
      Entry.prototype.read = function() {
        return "" + ENV.DISCUSSION.ENTRY_ROOT_URL + "?ids[]=" + (this.get('id'));
      };
      Entry.prototype.create = function() {
        var parentId;
        parentId = this.get('parent_id');
        if (parentId === null) {
          return ENV.DISCUSSION.ROOT_REPLY_URL;
        } else {
          return ENV.DISCUSSION.REPLY_URL.replace(/:entry_id/, parentId);
        }
      };
      Entry.prototype["delete"] = function() {
        return ENV.DISCUSSION.DELETE_URL.replace(/:id/, this.get('id'));
      };
      Entry.prototype.update = function() {
        return ENV.DISCUSSION.DELETE_URL.replace(/:id/, this.get('id'));
      };
      Entry.prototype.sync = function(method, model, options) {
        if (options == null) {
          options = {};
        }
        options.url = this[method]();
        return Backbone.sync(method, this, options);
      };
      Entry.prototype.parse = function(data) {
        if (_.isArray(data)) {
          return data[0];
        } else {
          return data;
        }
      };
      Entry.prototype.author = function() {
        var userId, _ref;
        if (this.get('deleted')) {
          return {};
        }
        userId = this.get('user_id');
        if (userId === ENV.DISCUSSION.CURRENT_USER.id) {
          return ENV.DISCUSSION.CURRENT_USER;
        } else {
          return (_ref = DISCUSSION.participants.get(userId)) != null ? _ref.toJSON() : void 0;
        }
      };
      Entry.prototype.canModerate = function() {
        var isAuthorsEntry;
        isAuthorsEntry = this.get('user_id') === ENV.DISCUSSION.CURRENT_USER.id;
        return isAuthorsEntry || ENV.DISCUSSION.PERMISSIONS.MODERATE;
      };
      Entry.prototype.canReply = function() {
        if (!ENV.DISCUSSION.PERMISSIONS.CAN_REPLY) {
          return false;
        }
        if (ENV.DISCUSSION.THREADED) {
          return true;
        }
        return false;
      };
      Entry.prototype.editor = function() {
        var editor_id, _ref;
        editor_id = this.get('editor_id');
        if (!editor_id) {
          return;
        }
        return (_ref = DISCUSSION.participants.get(editor_id)) != null ? _ref.toJSON() : void 0;
      };
      Entry.prototype.speedgraderUrl = function() {
        if (ENV.DISCUSSION.SPEEDGRADER_URL_TEMPLATE) {
          return ENV.DISCUSSION.SPEEDGRADER_URL_TEMPLATE.replace(/%22%3Astudent_id%22/, this.get('user_id'));
        }
      };
      Entry.prototype.summary = function() {
        this.escapeDiv || (this.escapeDiv = $('<div/>'));
        return this.escapeDiv.html(this.get('message')).text();
      };
      Entry.prototype.allowsSideComments = function() {
        var deleted;
        deleted = this.get('deleted');
        return !ENV.DISCUSSION.THREADED && ENV.DISCUSSION.PERMISSIONS.CAN_REPLY && this.get('parent_id') === null && !deleted;
      };
      Entry.prototype.hideRepliesOnCollapse = function() {
        return !ENV.DISCUSSION.THREADED && this.get('parent_id') === null;
      };
      Entry.prototype.markAsRead = function() {
        var url;
        this.set('read_state', 'read');
        url = ENV.DISCUSSION.MARK_READ_URL.replace(/:id/, this.get('id'));
        return $.ajaxJSON(url, 'PUT');
      };
      return Entry;
    })();
  });
}).call(this);
