(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['compiled/backbone-ext/Backbone', 'compiled/discussions/EntryView', 'jst/discussions/EntryCollectionView'], function(Backbone, EntryView, entryCollectionViewTemplate) {
    var EntryCollectionView;
    return EntryCollectionView = (function() {
      __extends(EntryCollectionView, Backbone.View);
      function EntryCollectionView() {
        this.addAll = __bind(this.addAll, this);
        this.add = __bind(this.add, this);
        EntryCollectionView.__super__.constructor.apply(this, arguments);
      }
      EntryCollectionView.prototype.initialize = function(options) {
        this.$el = options.$el;
        this.collection = options.collection;
        this.collection.bind('reset', this.addAll);
        this.collection.bind('add', this.add);
        return this.render();
      };
      EntryCollectionView.prototype.render = function() {
        var html;
        html = entryCollectionViewTemplate(this.options);
        this.$el.html(html);
        return this.cacheElements();
      };
      EntryCollectionView.prototype.cacheElements = function() {
        return this.list = this.$el.children('.discussion-entries');
      };
      EntryCollectionView.prototype.add = function(entry) {
        var view;
        view = new EntryView({
          model: entry
        });
        return this.list.append(view.el);
      };
      EntryCollectionView.prototype.addAll = function() {
        return this.collection.each(this.add);
      };
      return EntryCollectionView;
    })();
  });
}).call(this);
