(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['jquery', 'jst/calendar/contextList', 'jst/calendar/undatedEvents', 'compiled/calendar/commonEventFactory', 'compiled/calendar/EditEventDetailsDialog', 'compiled/calendar/EventDataSource', 'compiled/jquery.kylemenu', 'jquery.instructure_misc_helpers', 'vendor/jquery.ba-tinypubsub', 'vendor/jquery.store'], function($, contextListTemplate, undatedEventsTemplate, commonEventFactory, EditEventDetailsDialog, EventDataSource) {
    var VisibleContextManager, sidebar;
    VisibleContextManager = (function() {
      function VisibleContextManager(contexts, selectedContexts, $holder) {
        var c, fragmentData, savedContexts;
        this.$holder = $holder;
        this.restoreList = __bind(this.restoreList, this);
        this.saveAndClear = __bind(this.saveAndClear, this);
        fragmentData = (function() {
          try {
            return $.parseJSON($.decodeFromHex(location.hash.substring(1))) || {};
          } catch (e) {
            return {};
          }
        })();
        savedContexts = $.store.userGet('checked_calendar_codes');
        if (fragmentData.show) {
          this.contexts = fragmentData.show.split(',');
        }
        if (selectedContexts) {
          this.contexts || (this.contexts = selectedContexts);
        }
        if (savedContexts) {
          this.contexts || (this.contexts = savedContexts.split(','));
        }
        this.contexts || (this.contexts = (function() {
          var _i, _len, _ref, _results;
          _ref = contexts.slice(0, 10);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(c.asset_string);
          }
          return _results;
        })());
        this.notify();
        $.subscribe('Calendar/saveVisibleContextListAndClear', this.saveAndClear);
        $.subscribe('Calendar/restoreVisibleContextList', this.restoreList);
      }
      VisibleContextManager.prototype.saveAndClear = function() {
        if (!this.savedContexts) {
          this.savedContexts = this.contexts;
          this.contexts = [];
          return this.notify();
        }
      };
      VisibleContextManager.prototype.restoreList = function() {
        if (this.savedContexts) {
          this.contexts = this.savedContexts;
          this.savedContexts = null;
          return this.notify();
        }
      };
      VisibleContextManager.prototype.toggle = function(context) {
        var index;
        index = $.inArray(context, this.contexts);
        if (index >= 0) {
          this.contexts.splice(index, 1);
        } else {
          this.contexts.push(context);
          if (this.contexts.length > 10) {
            this.contexts.shift;
          }
        }
        return this.notify();
      };
      VisibleContextManager.prototype.notify = function() {
        $.publish('Calendar/visibleContextListChanged', [this.contexts]);
        return this.$holder.find('.context_list_context').each(__bind(function(i, li) {
          var $li, visible, _ref;
          $li = $(li);
          visible = (_ref = $li.data('context'), __indexOf.call(this.contexts, _ref) >= 0);
          return $li.toggleClass('checked', visible).toggleClass('not-checked', !visible);
        }, this));
      };
      return VisibleContextManager;
    })();
    return sidebar = function(contexts, selectedContexts, dataSource) {
      var $holder, c, visibleContexts, _i, _len;
      for (_i = 0, _len = contexts.length; _i < _len; _i++) {
        c = contexts[_i];
        c.can_create_stuff = c.can_create_calendar_events || c.can_create_assignments;
      }
      $holder = $('#context-list-holder');
      $holder.html(contextListTemplate({
        contexts: contexts
      }));
      visibleContexts = new VisibleContextManager(contexts, selectedContexts, $holder);
      $holder.find('.settings').kyleMenu({
        buttonOpts: {
          icons: {
            primary: 'ui-icon-cog-with-droparrow',
            secondary: null
          }
        }
      });
      $holder.delegate('.context_list_context', 'click', function(event) {
        if (!$(event.target).closest('.settings, .actions').length) {
          return visibleContexts.toggle($(this).data('context'));
        }
      });
      $holder.delegate('.context_list_context', {
        'mouseenter mouseleave': function(event) {
          var hovering;
          hovering = !(event.type === 'mouseleave' && !$(this).find('.ui-menu:visible').length);
          return $(this).toggleClass('hovering', hovering);
        },
        'popupopen popupclose': function(event) {
          var hovering;
          hovering = event.type === 'popupopen';
          return $(this).toggleClass('hovering', hovering).find('.settings').toggleClass('ui-state-active', hovering);
        }
      });
      return $holder.delegate('.actions a', 'click', function() {
        var action, context, event;
        context = $(this).parents('li[data-context]').data('context');
        action = $(this).data('action');
        if (action === 'add_event' || action === 'add_assignment') {
          event = commonEventFactory(null, contexts);
          new EditEventDetailsDialog(event).show();
          $('select[class="context_id"]').val(context);
          if (action === 'add_assignment') {
            return $('a[href="#edit_assignment_form"]').click();
          }
        }
      });
    };
  });
}).call(this);
