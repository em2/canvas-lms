define('jst/calendar/appointmentGroupList', ["compiled/handlebars_helpers","i18n!calendar.appointment_group_list"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/appointmentGroupList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n  <button class=\"button single_item_done_button\">Done, Go Back To List</button>\n  <h2 id=\"appointment-group-list-header\">";
  stack1 = "My Appointment Groups";
  stack2 = "my_appointment_groups";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h2>\n  <ul id=\"appointment-group-list\">\n    ";
  stack1 = helpers.appointment_groups || depth0.appointment_groups;
  stack2 = helpers.each;
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <li class='appointment-group-item admin-link-hover-area ";
  stack1 = helpers.requiring_action || depth0.requiring_action;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers.published || depth0.published;
  stack2 = helpers.unless;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-appointment-group-id='";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n        ";
  stack1 = helpers.is_manageable || depth0.is_manageable;
  stack2 = helpers['if'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.requiring_action || depth0.requiring_action;
  stack2 = helpers['if'];
  tmp1 = self.program(12, program12, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(14, program14, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <h3><a class=\"view_calendar_link\" href=\"#\">";
  stack1 = helpers.title || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></h3>\n        ";
  stack1 = helpers.context || depth0.context;
  stack2 = helpers['if'];
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.location_name || depth0.location_name;
  stack2 = helpers['if'];
  tmp1 = self.program(20, program20, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.description || depth0.description;
  stack2 = helpers['if'];
  tmp1 = self.program(22, program22, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.is_manageable || depth0.is_manageable;
  stack2 = helpers['if'];
  tmp1 = self.program(24, program24, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </li>\n    ";
  return buffer;}
function program3(depth0,data) {
  
  
  return "requiring-action";}

function program5(depth0,data) {
  
  
  return "unpublished-ag";}

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n          <div class=\"admin-links\">\n            <button class=\"al-trigger\"><span class=\"al-trigger-inner\">Manage</span></button>\n            <ul class=\"al-options\">\n              <li><a class=\"edit_link\" href=\"#\"><span class=\"ui-icon ui-icon-pencil\" />Edit</a></li>\n              <li><a class=\"message_link\" href=\"#\"><span class=\"ui-icon ui-icon-mail-closed\" />";
  stack1 = "Group";
  stack2 = helpers.participant_type || depth0.participant_type;
  stack3 = helpers.ifEqual || depth0.ifEqual;
  tmp1 = self.program(8, program8, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(10, program10, data);
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n              <li><a class=\"delete_link\" href=\"#\"><span class=\"ui-icon ui-icon-trash\" />Delete</a></li>\n            </ul>\n          </div>\n        ";
  return buffer;}
function program8(depth0,data) {
  
  var stack1, stack2, stack3, stack4;
  stack1 = "Message Groups Who...";
  stack2 = "message_groups";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}

function program10(depth0,data) {
  
  var stack1, stack2, stack3, stack4;
  stack1 = "Message Students Who...";
  stack2 = "message_students";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}

function program12(depth0,data) {
  
  
  return "\n          <div class=\"alert-message block-message warning\">\n            <p>\n              You can <a class=\"view_calendar_link\" href=\"#\">sign up</a> for this.\n            </p>\n          </div>\n        ";}

function program14(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n          ";
  stack1 = helpers.signed_up_times || depth0.signed_up_times;
  stack2 = helpers['if'];
  tmp1 = self.program(15, program15, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program15(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <div class=\"alert-message block-message success\">\n              <p>You're signed up for</p>\n              ";
  stack1 = helpers.signed_up_times || depth0.signed_up_times;
  stack2 = helpers.each;
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n          ";
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <p><strong><a href=\"#\" class=\"show_event_link\" data-event-id=\"";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = helpers.formatted_time || depth0.formatted_time;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "formatted_time", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></strong></p>\n              ";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div class='ag-context'><a href=\"";
  stack1 = helpers.context || depth0.context;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.url);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "context.url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = helpers.context || depth0.context;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "context.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></div>\n        ";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n          <div class=\"ag-location\">\n            <strong>";
  stack1 = "Location:";
  stack2 = "location";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n            <span>";
  stack1 = helpers.location_name || depth0.location_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "location_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n          </div>\n        ";
  return buffer;}

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n          <p class=\"ag-description\">";
  stack1 = helpers.description || depth0.description;
  stack2 = helpers.newlinesToBreak || depth0.newlinesToBreak;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "newlinesToBreak", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "</p>\n        ";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n          <div class=\"ag-x-of-x-signed-up\">\n            ";
  stack1 = "Group";
  stack2 = helpers.participant_type || depth0.participant_type;
  stack3 = helpers.ifEqual || depth0.ifEqual;
  tmp1 = self.program(25, program25, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(27, program27, data);
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.published || depth0.published;
  stack2 = helpers.unless;
  tmp1 = self.program(29, program29, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </div>\n        ";
  return buffer;}
function program25(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n              ";
  stack1 = "%{signed_up} groups have signed up";
  stack2 = "x_groups_have_signed_up";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n              ";
  stack1 = "%{signed_up} people have signed up";
  stack2 = "x_people_have_signed_up";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}

function program29(depth0,data) {
  
  
  return "(unpublished)";}

function program31(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  ";
  stack1 = helpers.canManageAGroup || depth0.canManageAGroup;
  stack2 = helpers['if'];
  tmp1 = self.program(32, program32, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(34, program34, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program32(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <h2>\n      ";
  stack1 = "You have not created any appointment groups, and there are none you can sign up for";
  stack2 = "scheduler_explanation_teacher_header";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </h2>\n    <p>\n      ";
  stack1 = "This is the Scheduler Tool. You can use it to create appointment groups for your students to sign up for.";
  stack2 = "scheduler_explanation_teacher_paragraph_1";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n    <p>\n      ";
  stack1 = "For example, lets say you want to go over the midterm paper assignment with each of the students in your course. You would create a new appointment group, specify the dates and times that you're available, tell it to split that time into 15 minute blocks and only allow one student per time-block.";
  stack2 = "scheduler_explanation_teacher_paragraph_2";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n    <p>\n      ";
  stack1 = "Then students would get notified and see that they need to sign up for one of the specified time blocks. They will be shown a calendar with the available time blocks overlaid on top of everything on their other calendars so they can pick a time that works for them.";
  stack2 = "scheduler_explanation_teacher_paragraph_3";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n    <p>\n      ";
  stack1 = "* Get started now by clicking the \"Create an appointment group\" button to the right *";
  stack2 = "scheduler_explanation_teacher_paragraph_4";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = "<strong>$1</strong>";
  stack3['w0'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n  ";
  return buffer;}

function program34(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <h2>\n      ";
  stack1 = "You do not have any appointment groups to sign up for";
  stack2 = "scheduler_explanation_student_header";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </h2>\n    <p>\n      ";
  stack1 = "Teachers can use this scheduler tool to schedule things for their students to sign up for. Things like: \"office hours\", \"group presentation time-slots\" or \"lunch with an alumnus\".";
  stack2 = "scheduler_explanation_student_paragraph_1";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n    <p>\n      ";
  stack1 = "None of your teachers have made any appointments you can sign up for so there is not anything for you do to now. You will be notified if anyone does create something so you can come sign up for it.";
  stack2 = "scheduler_explanation_student_paragraph_2";
  stack3 = {};
  stack4 = "calendar.appointmentGroupList";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n  ";
  return buffer;}

  stack1 = helpers.appointment_groups || depth0.appointment_groups;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(31, program31, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  
  return templates['calendar/appointmentGroupList'];
});
