(function() {
  define(['jquery', 'jquery.ui.menu.inputmenu', 'vendor/jquery.ui.popup-1.9', 'vendor/jquery.ui.button-1.9'], function($, _inputmenu, _popup, _button) {
    $.fn.kyleMenu = function(options) {
      return this.each(function() {
        var $menu, $trigger, appendTo, opts;
        opts = $.extend(true, {}, $.fn.kyleMenu.defaults, options);
        $trigger = $(this);
        if (!opts.noButton) {
          $trigger.button(opts.buttonOpts);
          $trigger.bind('mouseleave.button', function() {
            if ($menu.is('.ui-state-open')) {
              return $trigger.addClass('ui-state-active');
            }
          });
        }
        $menu = $trigger.next().menu(opts.menuOpts).popup(opts.popupOpts).addClass("ui-kyle-menu use-css-transitions-for-show-hide");
        appendTo = opts.appendMenuTo;
        if (appendTo) {
          $menu.appendTo(appendTo);
        }
        $trigger.data('kyleMenu', $menu);
        return $menu.bind("menuselect", function() {
          return $(this).popup('close').removeClass("ui-state-open");
        });
      });
    };
    $.fn.kyleMenu.defaults = {
      popupOpts: {
        position: {
          my: 'center top',
          at: 'center bottom',
          offset: '0 10px',
          within: '#main',
          collision: 'fit'
        },
        open: function(event) {
          var $trigger, actualOffset, caratOffset, differenceInOffset, triggerWidth;
          $(this).find(".ui-menu-carat").remove();
          $trigger = $(this).popup("option", "trigger");
          $trigger.addClass('ui-state-active');
          triggerWidth = $trigger.outerWidth();
          differenceInOffset = $trigger.offset().left - $(this).offset().left;
          actualOffset = event.pageX - $trigger.offset().left;
          caratOffset = Math.min(Math.max(6, actualOffset), triggerWidth - 6) + differenceInOffset;
          $('<span class="ui-menu-carat"><span /></span>').css('left', caratOffset).prependTo(this);
          return $(this).css('-webkit-transform-origin-x', caratOffset + 'px').addClass('ui-state-open');
        },
        close: function() {
          $(this).popup("option", "trigger").removeClass('ui-state-active');
          return $(this).removeClass("ui-state-open");
        }
      },
      buttonOpts: {
        icons: {
          primary: "ui-icon-home",
          secondary: "ui-icon-droparrow"
        }
      }
    };
    return $('.al-trigger').live('click', function(event) {
      var $trigger, defaults, opts;
      $trigger = $(this);
      if (!$trigger.is('.ui-button')) {
        event.preventDefault();
        defaults = {
          buttonOpts: {
            icons: {
              primary: null,
              secondary: null
            }
          }
        };
        opts = $.extend(defaults, $trigger.data('kyleMenuOptions'));
        $trigger.kyleMenu(opts);
        return $trigger.data('kyleMenu').popup('open');
      }
    });
  });
}).call(this);
