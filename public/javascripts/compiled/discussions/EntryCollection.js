(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['use!backbone', 'compiled/discussions/Entry'], function(Backbone, Entry) {
    var EntryCollection;
    return EntryCollection = (function() {
      __extends(EntryCollection, Backbone.Collection);
      function EntryCollection() {
        EntryCollection.__super__.constructor.apply(this, arguments);
      }
      EntryCollection.prototype.model = Entry;
      return EntryCollection;
    })();
  });
}).call(this);
