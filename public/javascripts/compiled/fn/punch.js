(function() {
  var __slice = Array.prototype.slice;
  define(function() {
    var punch;
    return punch = function(obj, method, fn) {
      var old;
      old = obj[method];
      return obj[method] = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        args.unshift(function() {
          return old.apply(obj, arguments);
        });
        return fn.apply(obj, args);
      };
    };
  });
}).call(this);
