(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['use!backbone', 'compiled/discussions/Participant'], function(Backbone, Participant) {
    var ParticipantCollection;
    return ParticipantCollection = (function() {
      __extends(ParticipantCollection, Backbone.Collection);
      function ParticipantCollection() {
        ParticipantCollection.__super__.constructor.apply(this, arguments);
      }
      ParticipantCollection.prototype.model = Participant;
      return ParticipantCollection;
    })();
  });
}).call(this);
