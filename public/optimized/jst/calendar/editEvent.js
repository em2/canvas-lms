define('jst/calendar/editEvent', ["compiled/handlebars_helpers","i18n!calendar.edit_event"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/editEvent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0;


  buffer += "<div class=\"content\" id=\"edit_event_tabs\">\n  <ul class=\"tab_list\">\n    <li><a href=\"#edit_calendar_event_form_holder\" class=\"edit_calendar_event_option\">";
  stack1 = "Event";
  stack2 = "tabs.event";
  stack3 = {};
  stack4 = "calendar.editEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n    <li><a href=\"#edit_assignment_form_holder\" class=\"edit_assignment_option\">";
  stack1 = "Assignment";
  stack2 = "tabs.assignment";
  stack3 = {};
  stack4 = "calendar.editEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  </ul>\n  <div id=\"edit_calendar_event_form_holder\" class=\"tab_holder\"></div>\n  <div id=\"edit_assignment_form_holder\" class=\"tab_holder\"></div>\n</div>";
  return buffer;});
  
  return templates['calendar/editEvent'];
});
