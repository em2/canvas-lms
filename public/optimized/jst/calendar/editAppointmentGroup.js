define('jst/calendar/editAppointmentGroup', ["compiled/handlebars_helpers","i18n!calendar.edit_appointment_group"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/editAppointmentGroup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n          ";
  stack1 = helpers.can_create_appointment_groups || depth0.can_create_appointment_groups;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\"";
  stack1 = helpers.asset_string || depth0.asset_string;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "asset_string", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = helpers.name || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n          ";
  return buffer;}

function program4(depth0,data) {
  
  
  return "checked";}

function program6(depth0,data) {
  
  
  return " ";}

function program8(depth0,data) {
  
  
  return " style=\"display:none;\" ";}

function program10(depth0,data) {
  
  
  return " style=\"display:none;\" ";}

  buffer += "<form action='#' id='edit_appointment_form'>\n  <div class=\"left-column-wrapper\">\n    <p>\n      <b>";
  stack1 = "Name";
  stack2 = "name";
  stack3 = {};
  stack4 = "calendar.editAppointmentGroup";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b><br />\n      <input type=\"text\" name=\"title\" style=\"width: 190px\" value=\"";
  stack1 = helpers.appointment_group || depth0.appointment_group;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.title);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "appointment_group.title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n    </p>\n    <p>\n      <b>";
  stack1 = "Location";
  stack2 = "location";
  stack3 = {};
  stack4 = "calendar.editAppointmentGroup";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b><br />\n      <input type=\"text\" name=\"location\" style=\"width: 190px\" value=\"";
  stack1 = helpers.appointment_group || depth0.appointment_group;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.location_name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "appointment_group.location_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n    </p>\n    <p>\n      <b>";
  stack1 = "Calendar";
  stack2 = "calendar";
  stack3 = {};
  stack4 = "calendar.editAppointmentGroup";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b><br />\n      <select name=\"context_code\" class=\"context_id\">\n        ";
  stack1 = helpers.contexts || depth0.contexts;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n    </p>\n    <p>\n      <input type=\"checkbox\" class=\"group-signup-checkbox\" id=\"group-signup-checkbox\" name=\"use_group_signup\" value=\"1\" ";
  stack1 = "Group";
  stack2 = helpers.participant_type || depth0.participant_type;
  stack3 = helpers.ifEqual || depth0.ifEqual;
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n      <label for=\"group-signup-checkbox\">Have students sign up in groups.</label>\n    </p>\n    <p>\n      <div class=\"section-signup\">\n        <b>";
  stack1 = "Limit Signups to";
  stack2 = "course_section";
  stack3 = {};
  stack4 = "calendar.editAppointmentGroup";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b><br />\n        <div class=\"section_select\">\n          <select name=\"section_id\"></select>\n        </div>\n      </div>\n      <div class=\"group-signup\" style=\"display: none\">\n        <b>";
  stack1 = "Group Category";
  stack2 = "group_category";
  stack3 = {};
  stack4 = "calendar.editAppointmentGroup";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b><br />\n        <div class=\"group_select\">\n          <select name=\"group_category_id\"></select>\n        </div>\n      </div>\n    </p>\n  </div>\n  <div class=\"right-column-wrapper\">\n    <div class=\"time-block-list-wrapper\">\n      <div class=\"time-block-list\">\n        <table class=\"time-block-list-header\">\n          <tr>\n            <th class=\"date-column\">Date</th>\n            <th class=\"time-range-column\" colspan=\"4\">Time Range</th>\n          </tr>\n        </table>\n        <div class=\"time-block-list-body-wrapper\">\n          <table class=\"time-block-list-body\"></table>\n        </div>\n        <div class=\"splitter\" style=\"font-size: 0.8em\">\n          <p>\n            <a class=\"split-link button small-button\" href=\"#\">Split</a>into slots of <input type=\"number\" name=\"duration\" value=\"30\" style=\"width: 40px\" /> minutes each.\n          </p>\n        </div>\n      </div>\n    </div>\n    <div style=\"margin-top: 1.5em\">\n      <b>Options</b>\n      <ul class=\"ag-options\">\n        <li>\n          <input type=\"checkbox\" id=\"appointment-blocks-per-slot-option-button\" name=\"per_slot_option\" value=\"1\" />\n          <label for=\"appointment-blocks-per-slot-option-button\">Limit each time slot to</label>\n          <input type=\"number\" name=\"participants_per_appointment\" value=\"";
  stack1 = helpers.appointment_group || depth0.appointment_group;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.participants_per_appointment);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "appointment_group.participants_per_appointment", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" style=\"width: 40px;\" />\n          <label for=\"appointment-blocks-per-slot-option-button\">\n            <span ";
  stack1 = "Group";
  stack2 = helpers.participant_type || depth0.participant_type;
  stack3 = helpers.ifEqual || depth0.ifEqual;
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(8, program8, data);
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"per_appointment_groups_label\">groups.</span>\n            <span ";
  stack1 = "Group";
  stack2 = helpers.participant_type || depth0.participant_type;
  stack3 = helpers.ifEqual || depth0.ifEqual;
  tmp1 = self.program(10, program10, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"per_appointment_users_label\">users.</span>\n          </label>\n        </li>\n        <li>\n          <input type=\"checkbox\" id=\"appointment-blocks-participant-visibility-button\" name=\"participant_visibility\" value=\"1\" />\n          <label for=\"appointment-blocks-participant-visibility-button\">Allow students to see who has signed up for time slots.</label>\n        </li>\n        <li>\n          <input type=\"checkbox\" id=\"max-per-student-option\" name=\"max_appointments_per_participant_option\" value=\"1\">\n          <label for=\"max-per-student-option\">Limit participants to</label>\n          <input type=\"number\" name=\"max_appointments_per_participant\" value=\"";
  stack1 = helpers.appointment_group || depth0.appointment_group;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.max_appointments_per_participant);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "appointment_group.max_appointments_per_participant", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" min=\"1\"style=\"width: 40px\">\n          <label for=\"max-per-student-option\">appointment(s).</label>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"details-wrapper\">\n    <b>Details:</b><br />\n    <textarea name=\"description\" style=\"width: 100%\">";
  stack1 = helpers.appointment_group || depth0.appointment_group;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.description);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "appointment_group.description", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</textarea>\n  </div>\n</form>\n";
  return buffer;});
  
  return templates['calendar/editAppointmentGroup'];
});
