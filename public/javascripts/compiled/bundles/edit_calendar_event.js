(function() {
  require(['jquery', 'compiled/calendar/CalendarEvent', 'compiled/calendar/EditEventView'], function($, CalendarEvent, EditEventView) {
    return $(function() {
      var calendarEvent;
      calendarEvent = new CalendarEvent(ENV.CALENDAR_EVENT);
      return new EditEventView({
        model: calendarEvent
      });
    });
  });
}).call(this);
