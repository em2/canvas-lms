(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['use!underscore', 'jquery', 'compiled/backbone-ext/Backbone', 'compiled/discussions/EntryCollection', 'compiled/discussions/EntryCollectionView', 'compiled/discussions/EntryView', 'compiled/discussions/ParticipantCollection', 'compiled/discussions/MarkAsReadWatcher', 'jst/discussions/_reply_form', 'vendor/ui.selectmenu'], function(_, $, Backbone, EntryCollection, EntryCollectionView, EntryView, ParticipantCollection, MarkAsReadWatcher, template, replyForm) {
    var EntriesView;
    return EntriesView = (function() {
      __extends(EntriesView, Backbone.View);
      function EntriesView() {
        this.onFetchSuccess = __bind(this.onFetchSuccess, this);
        this.onMarkAsRead = __bind(this.onMarkAsRead, this);
        this.initParticipants = __bind(this.initParticipants, this);
        this.initEntries = __bind(this.initEntries, this);
        EntriesView.__super__.constructor.apply(this, arguments);
      }
      EntriesView.prototype.events = {
        'click .entry [data-event]': 'handleEntryEvent'
      };
      EntriesView.prototype.initialize = function() {
        this.$el = $('#discussion_subentries');
        this.participants = new ParticipantCollection;
        this.model.bind('change:participants', this.initParticipants);
        this.collection = new EntryCollection;
        this.model.bind('change:view', this.initEntries);
        MarkAsReadWatcher.on('markAsRead', this.onMarkAsRead);
        return this.model.fetch({
          success: this.onFetchSuccess
        });
      };
      EntriesView.prototype.initEntries = function(thisView, entries) {
        this.collectionView = new EntryCollectionView({
          $el: this.$el,
          collection: this.collection,
          showReplyButton: ENV.DISCUSSION.PERMISSIONS.CAN_REPLY
        });
        this.collection.reset(entries);
        this.updateFromNewEntries();
        this.setUnreadEntries();
        return MarkAsReadWatcher.init();
      };
      EntriesView.prototype.updateFromNewEntries = function() {
        var newEntries;
        newEntries = this.model.get('new_entries');
        return _.each(newEntries, __bind(function(entry) {
          var view;
          view = EntryView.instances[entry.id];
          if (view) {
            return view.model.set(entry);
          } else {
            view = EntryView.instances[entry.parent_id] || this;
            return view.collection.add(entry);
          }
        }, this));
      };
      EntriesView.prototype.setUnreadEntries = function() {
        var unread_entries;
        unread_entries = this.model.get('unread_entries');
        return _.each(unread_entries, function(id) {
          return EntryView.instances[id].model.set('read_state', 'unread');
        });
      };
      EntriesView.prototype.initParticipants = function(thisView, participants) {
        return this.participants.reset(participants);
      };
      EntriesView.prototype.onMarkAsRead = function(entry) {
        var id, unread;
        unread = this.model.get('unread_entries');
        id = entry.get('id');
        return this.model.set('unread_entries', _.without(unread, id));
      };
      EntriesView.prototype.onFetchSuccess = function() {
        return this.model.trigger('fetchSuccess', this.model);
      };
      EntriesView.prototype.handleEntryEvent = function(event) {
        var el, id, instance, method, modelEl;
        el = $(event.currentTarget);
        method = el.data('event');
        modelEl = el.parents("." + EntryView.prototype.className + ":first");
        id = modelEl.data('id');
        instance = EntryView.instances[id];
        return instance[method].call(instance, event, el);
      };
      return EntriesView;
    })();
  });
}).call(this);
