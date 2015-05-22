(function() {
  require(['jquery', 'compiled/calendar/Calendar', 'compiled/calendar/MiniCalendar', 'compiled/calendar/sidebar', 'compiled/calendar/EventDataSource', 'compiled/calendar/UndatedEventsList', 'compiled/bundles/jquery_ui_menu'], function($, Calendar, MiniCalendar, drawSidebar, EventDataSource, UndatedEventsList) {
    this.eventDataSource = new EventDataSource(ENV.CALENDAR.CONTEXTS);
    this.calendar = new Calendar("#calendar-app", ENV.CALENDAR.CONTEXTS, ENV.CALENDAR.MANAGE_CONTEXTS, this.eventDataSource, {
      activateEvent: ENV.CALENDAR.ACTIVE_EVENT,
      viewStart: ENV.CALENDAR.VIEW_START
    });
    new MiniCalendar("#minical", this.calendar);
    new UndatedEventsList("#undated-events", this.eventDataSource);
    return drawSidebar(ENV.CALENDAR.CONTEXTS, ENV.CALENDAR.SELECTED_CONTEXTS, this.eventDataSource);
  });
}).call(this);
