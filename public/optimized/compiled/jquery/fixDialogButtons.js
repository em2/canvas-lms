(function() {
  define(['jquery', 'jqueryui/dialog'], function($) {
    return $.fn.fixDialogButtons = function() {
      return this.each(function() {
        var $buttons, $dialog, buttons;
        $dialog = $(this);
        $buttons = $dialog.find(".button-container:last .button, button[type=submit]");
        if ($buttons.length) {
          $dialog.find(".button-container:last, button[type=submit]").hide();
          buttons = $.map($buttons.toArray(), function(button) {
            var $button;
            $button = $(button);
            if ($button.is('.dialog_closer')) {
              $button.click(function() {
                return $dialog.dialog('close');
              });
            }
            return {
              text: $button.text(),
              "data-text-while-loading": $button.data("textWhileLoading"),
              click: function() {
                return $button.click();
              }
            };
          });
          return $dialog.dialog("option", "buttons", buttons);
        }
      });
    };
  });
}).call(this);
