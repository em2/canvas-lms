(function() {
  define(['jquery', 'vendor/ui.selectmenu'], function($) {
    return $(function() {
      return $('.question select').css({
        '-webkit-appearance': 'none',
        'font-size': '100%',
        'padding-right': '60px'
      }).selectmenu({
        escapeHtml: true
      });
    });
  });
}).call(this);
