(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['require', 'i18n!discussions.entry', 'compiled/backbone-ext/Backbone', 'compiled/discussions/EntryCollection', 'jst/discussions/_entry_content', 'jst/discussions/_deleted_entry', 'jst/discussions/entry_with_replies', 'compiled/discussions/Reply', 'compiled/discussions/EntryEditor', 'compiled/discussions/MarkAsReadWatcher', 'str/htmlEscape', 'vendor/jquery.ba-tinypubsub', 'compiled/jquery.kylemenu', 'jst/_avatar', 'jst/discussions/_reply_form'], function(require, I18n, Backbone, EntryCollection, entryContentPartial, deletedEntriesTemplate, entryWithRepliesTemplate, Reply, EntryEditor, MarkAsReadWatcher, htmlEscape, _arg) {
    var EntryView, noop, publish;
    publish = _arg.publish;
    noop = function() {};
    EntryView = (function() {
      __extends(EntryView, Backbone.View);
      function EntryView() {
        this.onReadState = __bind(this.onReadState, this);
        this.onCollapsedView = __bind(this.onCollapsedView, this);
        EntryView.__super__.constructor.apply(this, arguments);
      }
      EntryView.instances = [];
      EntryView.prototype.tagName = 'li';
      EntryView.prototype.className = 'entry';
      EntryView.prototype.initialize = function() {
        var id;
        EntryView.__super__.initialize.apply(this, arguments);
        id = this.model.get('id');
        EntryView.instances[id] = this;
        this.model.bind('change:id', __bind(function(model, id) {
          return this.$el.attr('data-id', id);
        }, this));
        this.model.bind('change:collapsedView', this.onCollapsedView);
        this.model.bind('change:read_state', this.onReadState);
        this.render();
        this.model.bind('change:deleted', __bind(function(model, deleted) {
          return this.$('.discussion_entry:first').toggleClass('deleted-discussion-entry', deleted);
        }, this));
        if (this.model.get('deleted')) {
          this.$('.discussion_entry:first').addClass('deleted-discussion-entry');
        }
        this.toggleCollapsedClass();
        return this.createReplies();
      };
      EntryView.prototype.onCollapsedView = function(model, collapsedView) {
        var els;
        this.toggleCollapsedClass();
        if (this.model.get('hideRepliesOnCollapse')) {
          els = this.$('.replies, .add-side-comment-wrap');
          if (collapsedView) {
            return els.hide();
          } else {
            return els.show();
          }
        }
      };
      EntryView.prototype.onReadState = function(model, read_state) {
        var _ref;
        if (read_state === 'unread') {
          if ((_ref = this.markAsReadWatcher) == null) {
            this.markAsReadWatcher = new MarkAsReadWatcher(this);
          }
        }
        return this.$('article:first').toggleClass('unread', read_state === 'unread');
      };
      EntryView.prototype.fetchFullEntry = function() {
        this.model.set('message', I18n.t('loading', 'loading...'));
        return this.model.fetch();
      };
      EntryView.prototype.toggleCollapsedClass = function() {
        var collapsedView;
        collapsedView = this.model.get('collapsedView');
        return this.$el.children('.discussion_entry').toggleClass('collapsed', !!collapsedView).toggleClass('expanded', !collapsedView);
      };
      EntryView.prototype.render = function() {
        this.$el.html(entryWithRepliesTemplate(this.model.toJSON()));
        this.$el.attr('data-id', this.model.get('id'));
        this.$el.attr('id', this.model.cid);
        publish('userContent/change');
        return EntryView.__super__.render.apply(this, arguments);
      };
      EntryView.prototype.openMenu = function(event, $el) {
        if (!this.$menu) {
          this.createMenu($el);
        }
        this.$menu.popup('open');
        return false;
      };
      EntryView.prototype.createMenu = function($el) {
        $el.kyleMenu({
          appendMenuTo: "body",
          buttonOpts: {
            icons: {
              primary: null,
              secondary: null
            }
          }
        });
        this.$menu = $el.data('kyleMenu');
        return this.$menu.delegate('[data-event]', 'click', __bind(function(event) {
          var action;
          event.preventDefault();
          $el = $(event.currentTarget);
          action = $el.data('event');
          return this[action](event, $el);
        }, this));
      };
      EntryView.prototype.createReplies = function() {};
      EntryView.prototype.remove = function() {
        var html;
        this.model.set('collapsedView', true);
        html = deletedEntriesTemplate(this.model.toJSON());
        this.$('.entry_content:first').html(html);
        return this.model.destroy();
      };
      EntryView.prototype.edit = function() {
        var _ref;
        if ((_ref = this.editor) == null) {
          this.editor = new EntryEditor(this);
        }
        this.editor.edit();
        return false;
      };
      EntryView.prototype.toggleCollapsed = function(event, $el) {
        return this.model.set('collapsedView', !this.model.get('collapsedView'));
      };
      EntryView.prototype.addReply = function(event, $el) {
        var _ref;
        event.preventDefault();
        if ((_ref = this.reply) == null) {
          this.reply = new Reply(this);
        }
        this.model.set('notification', '');
        return this.reply.edit();
      };
      EntryView.prototype.addReplyAttachment = function(event, $el) {
        event.preventDefault();
        return this.reply.addAttachment($el);
      };
      EntryView.prototype.removeReplyAttachment = function(event, $el) {
        event.preventDefault();
        return this.reply.removeAttachment($el);
      };
      EntryView.prototype.goToReply = function(event, $el) {};
      return EntryView;
    })();
    require(['compiled/discussions/EntryCollectionView'], function(EntryCollectionView) {
      return EntryView.prototype.createReplies = function() {
        var el, replies;
        el = this.$el.find('.replies');
        this.collection = new EntryCollection;
        this.view = new EntryCollectionView({
          $el: el,
          collection: this.collection
        });
        replies = this.model.get('replies');
        _.each(replies, __bind(function(reply) {
          return reply.parent_cid = this.model.cid;
        }, this));
        return this.collection.reset(this.model.get('replies'));
      };
    });
    return EntryView;
  });
}).call(this);
