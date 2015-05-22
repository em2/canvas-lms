(function() {
  require(['compiled/backbone-ext/Backbone', 'compiled/discussions/TopicView'], function(Backbone, TopicView) {
    return $(function() {
      var app;
      return app = new TopicView({
        model: new Backbone.Model
      });
    });
  });
}).call(this);
