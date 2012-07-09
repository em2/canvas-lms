(function() {
  define(['jquery'], function($) {
    var allowAction, handleMethod;
    handleMethod = function(link) {
      var form, href, metadataInput, method, target;
      link.data('handled', true);
      href = link.attr('href');
      method = link.data('method');
      target = link.attr('target');
      form = $("<form method='post' action='" + href + "'></form>");
      metadataInput = "<input name='_method' value='" + method + "' type='hidden' />";
      if (ENV.AUTHENTICITY_TOKEN) {
        metadataInput += "<input name='authenticity_token' value='" + ENV.AUTHENTICITY_TOKEN + "' type='hidden' />";
      }
      if (target) {
        form.attr('target', target);
      }
      return form.hide().append(metadataInput).appendTo('body').submit();
    };
    allowAction = function(element) {
      var message;
      message = element.data('confirm');
      if (!message) {
        return true;
      }
      return confirm(message);
    };
    return $(document).delegate('a[data-confirm], a[data-method]', 'click', function(event) {
      var $link;
      $link = $(this);
      if ($link.data('handled')) {
        return false;
      }
      if (!allowAction($link)) {
        return false;
      }
      if ($link.data('method')) {
        handleMethod($link);
        return false;
      }
    });
  });
}).call(this);
