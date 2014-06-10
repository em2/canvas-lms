(function() {
  define(function() {
    var preventDefault;
    return preventDefault = function(fn) {
      return function(event) {
        event.preventDefault();
        return fn.apply(this, arguments);
      };
    };
  });
}).call(this);
