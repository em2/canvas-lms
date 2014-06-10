(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['use!backbone', 'i18n!discussions.participant'], function(Backbone, I18n) {
    var Participant;
    return Participant = (function() {
      __extends(Participant, Backbone.Model);
      function Participant() {
        Participant.__super__.constructor.apply(this, arguments);
      }
      Participant.prototype.defaults = {
        avatar_image_url: '',
        display_name: I18n.t('anonymous_user', 'Anonymous'),
        id: null
      };
      return Participant;
    })();
  });
}).call(this);
