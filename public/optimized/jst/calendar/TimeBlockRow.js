define('jst/calendar/TimeBlockRow', ["compiled/handlebars_helpers","i18n!calendar.time_block_row"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/TimeBlockRow'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "class=\"locked\"";}

function program3(depth0,data) {
  
  
  return " disabled";}

function program5(depth0,data) {
  
  
  return " disabled";}

function program7(depth0,data) {
  
  
  return " disabled";}

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n      <a href=\"#\" class=\"delete-block-link\">";
  stack1 = "Remove row";
  stack2 = "remove_row";
  stack3 = {};
  stack4 = "calendar.TimeBlockRow";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n    ";
  return buffer;}

  buffer += "<tr ";
  stack1 = helpers.locked || depth0.locked;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n  <td class=\"date-column\"><input name=\"date\" class=\"date_field\" value=\"";
  stack1 = "MMM d, yyyy";
  stack2 = helpers.start || depth0.start;
  stack3 = helpers.dateToString || depth0.dateToString;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, { hash: {} }); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "dateToString", stack2, stack1, { hash: {} }); }
  else { stack1 = stack3; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = helpers.locked || depth0.locked;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></td>\n  <td class=\"start-time-column\"><input name=\"start_time\" class=\"time_field start_time\" value=\"";
  stack1 = "h:mmtt";
  stack2 = helpers.start || depth0.start;
  stack3 = helpers.dateToString || depth0.dateToString;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, { hash: {} }); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "dateToString", stack2, stack1, { hash: {} }); }
  else { stack1 = stack3; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = helpers.locked || depth0.locked;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></td>\n  <td class=\"separator-column\">-</td>\n  <td class=\"end-time-column\"><input name=\"end_time\" class=\"time_field end_time\" value=\"";
  stack1 = "h:mmtt";
  stack2 = helpers.end || depth0.end;
  stack3 = helpers.dateToString || depth0.dateToString;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, { hash: {} }); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "dateToString", stack2, stack1, { hash: {} }); }
  else { stack1 = stack3; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = helpers.locked || depth0.locked;
  stack2 = helpers['if'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></td>\n  <td class=\"delete-column\">\n    ";
  stack1 = helpers.locked || depth0.locked;
  stack2 = helpers.unless;
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </td>\n</tr>\n";
  return buffer;});
  
  return templates['calendar/TimeBlockRow'];
});
