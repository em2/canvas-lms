(function() {
  require(['ENV', 'compiled/gradebook2/Gradebook'], function(ENV, Gradebook) {
    return new Gradebook(ENV.GRADEBOOK_OPTIONS);
  });
}).call(this);
