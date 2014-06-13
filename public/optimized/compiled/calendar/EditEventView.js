(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['jquery', 'use!underscore', 'i18n!calendar.edit', 'compiled/backbone-ext/Backbone', 'jst/calendar/editCalendarEventFull', 'wikiSidebar', 'compiled/object/unflatten', 'tinymce.editor_box', 'compiled/tinymce'], function($, _, I18n, Backbone, editCalendarEventFullTemplate, wikiSidebar, unflatten) {
    var EditCalendarEventView;
    return EditCalendarEventView = (function() {
      __extends(EditCalendarEventView, Backbone.View);
      function EditCalendarEventView() {
        this.toggleUseSectionDates = __bind(this.toggleUseSectionDates, this);
        this.toggleUsingSectionClass = __bind(this.toggleUsingSectionClass, this);
        this.destroyModel = __bind(this.destroyModel, this);
        this.render = __bind(this.render, this);
        EditCalendarEventView.__super__.constructor.apply(this, arguments);
      }
      EditCalendarEventView.prototype.el = $('#content');
      EditCalendarEventView.prototype.template = editCalendarEventFullTemplate;
      EditCalendarEventView.prototype.events = {
        'submit form': 'submit',
        'change [name="use_section_dates"]': 'toggleUseSectionDates',
        'click .delete_link': 'destroyModel'
      };
      EditCalendarEventView.prototype.initialize = function() {
        this.model.fetch().done(__bind(function() {
          var attrs, _ref;
          if (ENV.NEW_CALENDAR_EVENT_ATTRIBUTES) {
            attrs = this.model.parse(ENV.NEW_CALENDAR_EVENT_ATTRIBUTES);
            attrs.all_day = !!((_ref = attrs.start_at) != null ? _ref.equals(attrs.end_at) : void 0) && attrs.start_at.equals(attrs.start_at.clearTime());
            this.model.set(attrs);
          }
          return this.render();
        }, this));
        return this.model.on('change:use_section_dates', this.toggleUsingSectionClass);
      };
      EditCalendarEventView.prototype.render = function() {
        var $textarea;
        this.$el.html(this.template(this.model.toJSON('forView')));
        this.$(".date_field").date_field();
        this.$(".time_field").time_field();
        $textarea = this.$('textarea').editorBox();
        if (!wikiSidebar.inited) {
          wikiSidebar.init();
        }
        wikiSidebar.attachToEditor($textarea).show();
        return this;
      };
      EditCalendarEventView.prototype.destroyModel = function() {
        var msg;
        msg = I18n.t("confirm_delete_calendar_event", "Are you sure you want to delete this calendar event?");
        if (confirm(msg)) {
          return this.$el.disableWhileLoading(this.model.destroy({
            success: __bind(function() {
              return this.redirectWithMessage(I18n.t('event_deleted', "%{event_title} deleted successfully", {
                event_title: this.model.get('title')
              }));
            }, this)
          }));
        }
      };
      EditCalendarEventView.prototype.toggleUsingSectionClass = function() {
        return this.$('#editCalendarEventFull').toggleClass('use_section_dates', this.model.get('use_section_dates'));
      };
      EditCalendarEventView.prototype.toggleUseSectionDates = function() {
        return this.model.set('use_section_dates', !this.model.get('use_section_dates'));
      };
      EditCalendarEventView.prototype.redirectWithMessage = function(message) {
        $.flashMessage(message);
        if (this.model.get('return_to_url')) {
          return window.location = this.model.get('return_to_url');
        }
      };
      EditCalendarEventView.prototype.submit = function(event) {
        var eventData;
        if (event != null) {
          event.preventDefault();
        }
        eventData = unflatten(this.$el.getFormData());
        eventData.use_section_dates = !!eventData.use_section_dates;
        _.each([eventData].concat(eventData.child_event_data), this.setStartEnd);
        return this.$el.disableWhileLoading(this.model.save(eventData, {
          success: __bind(function() {
            return this.redirectWithMessage(I18n.t('event_saved', 'Event Saved Successfully'));
          }, this)
        }));
      };
      EditCalendarEventView.prototype.setStartEnd = function(obj) {
        if (!obj) {
          return;
        }
        obj.start_at = Date.parse(obj.start_date + ' ' + obj.start_time);
        return obj.end_at = Date.parse(obj.start_date + ' ' + obj.end_time);
      };
      return EditCalendarEventView;
    })();
  });
}).call(this);
