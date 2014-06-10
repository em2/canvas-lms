define('jst/calendar/calendarApp', ["compiled/handlebars_helpers","i18n!calendar.calendar_app"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/calendarApp'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0;


  buffer += "<div>\n  <div id=\"calendar-header\">\n    <div style=\"float: right\">\n      <a href=\"#\" id=\"refresh_calendar_link\">";
  stack1 = "Refresh";
  stack2 = "refresh";
  stack3 = {};
  stack4 = "calendar.calendarApp";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n    </div>\n    \n    <span id=\"calendar_views\">\n      <input type=\"radio\" id=\"week\"      name=\"calendar_view\" /><label for=\"week\">";
  stack1 = "Week";
  stack2 = "links.calendar_week";
  stack3 = {};
  stack4 = "calendar.calendarApp";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <input type=\"radio\" id=\"month\"     name=\"calendar_view\" checked=\"checked\" /><label for=\"month\">";
  stack1 = "Month";
  stack2 = "links.calendar_month";
  stack3 = {};
  stack4 = "calendar.calendarApp";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <input type=\"radio\" id=\"scheduler\" name=\"calendar_view\" /><label for=\"scheduler\">";
  stack1 = "Scheduler";
  stack2 = "links.calendar_scheduler";
  stack3 = {};
  stack4 = "calendar.calendarApp";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <span stye=\"display: none\" class=\"counter-badge\"></span></label>\n    </div>\n  </span>\n  \n  <div class=\"scheduler-wrapper\" style=\"display: none\">\n    <div class=\"appointment-list\">\n      <div class=\"list-wrapper\"></div>\n    </div>\n  </div>\n  <div class=\"calendar\"></div>\n</div>";
  return buffer;});
  
  return templates['calendar/calendarApp'];
});
