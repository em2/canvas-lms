define('jst/calendar/editApptCalendarEvent', ["compiled/handlebars_helpers","i18n!calendar.edit_appt_calendar_event"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/editApptCalendarEvent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<form action=\"";
  stack1 = helpers.calendarEvent || depth0.calendarEvent;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.appointment_group_url);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "calendarEvent.appointment_group_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" id=\"edit_appt_calendar_event_form\">\n  <p>\n    <strong>";
  stack1 = "Description:";
  stack2 = "description";
  stack3 = {};
  stack4 = "calendar.editApptCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong><br>\n    <textarea name=\"description\">";
  stack1 = helpers.description || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</textarea>\n  </p>\n  <p>\n    <input type=\"checkbox\" name=\"max_participants_option\">\n    ";
  stack1 = "Limit this slot to";
  stack2 = "slot_limit";
  stack3 = {};
  stack4 = "calendar.editApptCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <input type=\"number\" name=\"max_participants\" class=\"max-participants\" min=\"1\" disabled>\n    ";
  stack1 = "users.";
  stack2 = "users";
  stack3 = {};
  stack4 = "calendar.editApptCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </p>\n</form>\n";
  return buffer;});
  
  return templates['calendar/editApptCalendarEvent'];
});
