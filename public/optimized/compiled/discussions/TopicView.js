(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['i18n!discussions', 'compiled/backbone-ext/Backbone', 'compiled/discussions/Topic', 'compiled/discussions/EntriesView', 'compiled/discussions/EntryView', 'jst/discussions/_reply_form', 'compiled/discussions/Reply', 'compiled/widget/assignmentRubricDialog', 'compiled/util/wikiSidebarWithMultipleEditors', 'jquery.instructure_misc_helpers'], function(I18n, Backbone, Topic, EntriesView, EntryView, replyTemplate, Reply, assignmentRubricDialog) {
    var TopicView;
    return TopicView = (function() {
      __extends(TopicView, Backbone.View);
      function TopicView() {
        this.onUnreadChange = __bind(this.onUnreadChange, this);
        this.initEntries = __bind(this.initEntries, this);
        TopicView.__super__.constructor.apply(this, arguments);
      }
      TopicView.prototype.events = {
        'click #discussion_topic .discussion-reply-form [data-event]': 'handleEvent',
        'change .view_switcher': 'switchView',
        'click .add_root_reply': 'addRootReply'
      };
      TopicView.prototype.initialize = function() {
        this.$el = $('#main');
        this.model.set('id', ENV.DISCUSSION.TOPIC.ID);
        this.model.cid = 'main';
        this.model.set('canAttach', ENV.DISCUSSION.PERMISSIONS.CAN_ATTACH);
        this.render();
        if (!ENV.DISCUSSION.INITIAL_POST_REQUIRED) {
          this.initEntries();
        }
        this.initViewSwitcher();
        if ($(document.body).is('.with-right-side')) {
          $.scrollSidebar();
        }
        assignmentRubricDialog.initTriggers();
        this.disableNextUnread();
        return this.$el.toggleClass('side_comment_discussion', !ENV.DISCUSSION.THREADED);
      };
      TopicView.prototype.cacheElements = function() {
        return this.$addRootReply = this.$('.add_root_reply');
      };
      TopicView.prototype.initEntries = function() {
        if (this.discussion) {
          return false;
        }
        this.discussion = new EntriesView({
          model: new Topic
        });
        this.collection = this.discussion.collection;
        this.discussion.model.bind('change:unread_entries', this.onUnreadChange);
        this.discussion.model.bind('fetchSuccess', __bind(function() {
          var unread_entries;
          unread_entries = this.discussion.model.get('unread_entries');
          this.setNextUnread(unread_entries);
          return this.cacheElements();
        }, this));
        window.DISCUSSION = this.discussion;
        return true;
      };
      TopicView.prototype.onUnreadChange = function(model, unread_entries) {
        this.model.set('unreadCount', unread_entries.length);
        this.model.set('unreadText', I18n.t('unread_count_tooltip', {
          zero: 'No unread replies',
          one: '1 unread reply',
          other: '%{count} unread replies'
        }, {
          count: unread_entries.length
        }));
        return this.setNextUnread(unread_entries);
      };
      TopicView.prototype.setNextUnread = function(unread_entries) {
        var id, parent, unread;
        if (unread_entries.length === 0) {
          this.disableNextUnread();
          return;
        }
        unread = this.discussion.$('.can_be_marked_as_read.unread:first');
        parent = unread.parent();
        id = parent.attr('id');
        return this.$('#jump_to_next_unread').removeClass('disabled').attr('href', "#" + id);
      };
      TopicView.prototype.disableNextUnread = function() {
        return this.$('#jump_to_next_unread').addClass('disabled').removeAttr('href');
      };
      TopicView.prototype.addReply = function(event) {
        event.preventDefault();
        if (this.reply == null) {
          this.reply = new Reply(this, {
            topLevel: true,
            added: this.initEntries
          });
          this.reply.on('edit', __bind(function() {
            var _ref;
            return (_ref = this.$addRootReply) != null ? _ref.hide() : void 0;
          }, this));
          this.reply.on('hide', __bind(function() {
            var _ref;
            return (_ref = this.$addRootReply) != null ? _ref.show() : void 0;
          }, this));
        }
        this.model.set('notification', '');
        return this.reply.edit();
      };
      TopicView.prototype.addReplyAttachment = EntryView.prototype.addReplyAttachment;
      TopicView.prototype.removeReplyAttachment = EntryView.prototype.removeReplyAttachment;
      TopicView.prototype.handleEvent = function(event) {
        var el, method;
        el = $(event.currentTarget);
        method = el.data('event');
        return typeof this[method] === "function" ? this[method](event, el) : void 0;
      };
      TopicView.prototype.render = function() {
        var html;
        if (ENV.DISCUSSION.PERMISSIONS.CAN_REPLY) {
          html = replyTemplate(this.model.toJSON());
          this.$('.entry_content:first').append(html);
        }
        return TopicView.__super__.render.apply(this, arguments);
      };
      TopicView.prototype.initViewSwitcher = function() {
        return this.$('.view_switcher').show().selectmenu({
          icons: [
            {
              find: '.collapsed-view'
            }, {
              find: '.unread-view'
            }, {
              find: '.expanded-view'
            }
          ]
        });
      };
      TopicView.prototype.switchView = function(event) {
        var $select, view;
        $select = $(event.currentTarget);
        view = $select.val();
        return this[view + 'View']();
      };
      TopicView.prototype.collapsedView = function() {
        var id, view, _ref, _results;
        _ref = EntryView.instances;
        _results = [];
        for (id in _ref) {
          view = _ref[id];
          _results.push(view.model.set('collapsedView', true));
        }
        return _results;
      };
      TopicView.prototype.expandedView = function() {
        var id, view, _ref, _results;
        _ref = EntryView.instances;
        _results = [];
        for (id in _ref) {
          view = _ref[id];
          _results.push(view.model.set('collapsedView', false));
        }
        return _results;
      };
      TopicView.prototype.unreadView = function() {
        var collapsedView, id, view, _ref, _results;
        _ref = EntryView.instances;
        _results = [];
        for (id in _ref) {
          view = _ref[id];
          collapsedView = view.model.get('read_state') === 'read';
          _results.push(view.model.set('collapsedView', collapsedView));
        }
        return _results;
      };
      TopicView.prototype.addRootReply = function(event) {
        var $el, target;
        $el = this.$(event.currentTarget);
        target = $('#discussion_topic .discussion-reply-form');
        this.addReply(event);
        return $('html, body').animate({
          scrollTop: target.offset().top - 100
        });
      };
      return TopicView;
    })();
  });
}).call(this);
