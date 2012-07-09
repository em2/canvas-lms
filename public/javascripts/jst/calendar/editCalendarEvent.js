define('jst/calendar/editCalendarEvent', ["compiled/handlebars_helpers","i18n!calendar.edit_calendar_event"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/editCalendarEvent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  stack1 = helpers.title || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n        ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <input id=\"calendar_event_title\" name=\"calendar_event[title]\" size=\"30\" style=\"width: 150px;\" type=\"text\" value=\"";
  stack1 = helpers.title || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"/>\n        ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  stack1 = helpers.can_create_calendar_events || depth0.can_create_calendar_events;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <option value=\"";
  stack1 = helpers.asset_string || depth0.asset_string;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "asset_string", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = helpers.name || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n            ";
  return buffer;}

  buffer += "<form action='#' id='edit_calendar_event_form' style='padding: 5px; width: 400px'>\n  <table class=\"formtable\" style=\"width: 100%;\">\n    <tr>\n      <td style=\"vertical-align: top;\">";
  stack1 = "Title:";
  stack2 = "title";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      <td>\n        ";
  stack1 = helpers.lockedTitle || depth0.lockedTitle;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </td>\n    </tr>\n    <tr>\n      <td style=\"vertical-align: top;\">";
  stack1 = "Date:";
  stack2 = "date";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      <td><input type=\"text\" name=\"date\" style=\"width: 100px;\" class=\"date_field\"/></td>\n    </tr>\n    <tr>\n      <td style=\"vertical-align: top;\">";
  stack1 = "From:";
  stack2 = "from";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      <td>\n        <div style=\"float: left;\"><input type=\"text\" name=\"start_time\" style=\"width: 60px;\" class=\"time_field start_time\"/></div>\n        ";
  stack1 = "* to *";
  stack2 = "timespan_separator";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = "<div style=\"float: left; margin: 5px\">$1</div>";
  stack3['w0'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div style=\"float: left;\"><input type=\"text\" name=\"end_time\" style=\"width: 60px;\" class=\"time_field end_time\"/></div>\n        <div class=\"clear\"></div>\n      </td>\n    </tr>\n    <tr class=\"context_select\">\n      <td>";
  stack1 = "Calendar:";
  stack2 = "calendar";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      <td>\n        <select class=\"context_id\" name=\"calendar_event[context_code]\">\n          ";
  stack1 = helpers.contexts || depth0.contexts;
  stack2 = helpers.each;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n      </td>\n    </tr><tr>\n      <td></td>\n      <td><a href=\"#\" class=\"more_options_link\">";
  stack1 = "more options";
  stack2 = "links.more_options";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></td>\n    </tr><tr>\n      <td colspan=\"2\" class=\"button-container\" style=\"text-align: right\">\n        <button type=\"submit\" class=\"button\">";
  stack1 = "Submit";
  stack2 = "buttons.submit";
  stack3 = {};
  stack4 = "calendar.editCalendarEvent";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n      </td>\n    </tr>\n  </table>\n</form>\n";
  return buffer;});
  
  return templates['calendar/editCalendarEvent'];
});
