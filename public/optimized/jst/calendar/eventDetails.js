define('jst/calendar/eventDetails', ["compiled/handlebars_helpers","i18n!calendar.event_details"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/eventDetails'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"";
  stack1 = helpers.fullDetailsURL || depth0.fullDetailsURL;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "fullDetailsURL", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"view_event_link\">";
  stack1 = helpers.title || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n      ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.title || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n      ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <tr>\n          <th scope=\"row\">";
  stack1 = "Calendar";
  stack2 = "calendar";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <td><a href=\"";
  stack1 = helpers.contextInfo || depth0.contextInfo;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.url);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "contextInfo.url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = helpers.contextInfo || depth0.contextInfo;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "contextInfo.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n            ";
  stack1 = helpers.actualContextInfo || depth0.actualContextInfo;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </td>\n        </tr>\n      ";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <br><span class=\"event-details-actual-context\">";
  stack1 = helpers.actualContextInfo || depth0.actualContextInfo;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "actualContextInfo.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n            ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <tr>\n          <th scope=\"row\">";
  stack1 = "Location";
  stack2 = "location";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <td>";
  stack1 = helpers.location_name || depth0.location_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "location_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</td>\n        </tr>\n      ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <tr>\n          <th scope=\"row\">";
  stack1 = "Details";
  stack2 = "details";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <td>";
  stack1 = helpers.description || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        </tr>\n      ";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <tr>\n          <th scope=\"row\">";
  stack1 = "Attendees";
  stack2 = "attendees";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <td>\n            ";
  stack1 = helpers.can_edit || depth0.can_edit;
  stack2 = helpers['if'];
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(16, program16, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </td>\n        </tr>\n      ";
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n              <ul id=\"attendees\">\n                ";
  stack1 = helpers.reservations || depth0.reservations;
  stack2 = helpers.each;
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n              </ul>\n            ";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <li data-url=\"";
  stack1 = helpers.event_url || depth0.event_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "event_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n                    <div class=\"ellipsis\">";
  stack1 = helpers.name || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n                    <a href=\"javascript:void(0)\" class=\"cancel_appointment_link\"></a>\n                  </li>\n                ";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n              <ul>\n                ";
  stack1 = helpers.reservations || depth0.reservations;
  stack2 = helpers.each;
  tmp1 = self.program(17, program17, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n              </ul>\n            ";
  return buffer;}
function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <li>";
  stack1 = helpers.name || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</li>\n                ";
  return buffer;}

function program19(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <tr>\n          <th scope=\"row\">";
  stack1 = "Slots available";
  stack2 = "slots_available";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <td>";
  stack1 = helpers.availableSlotsText || depth0.availableSlotsText;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "availableSlotsText", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</td>\n        </tr>\n      ";
  return buffer;}

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"available_slots\">\n        ";
  stack1 = helpers.available_slots_text || depth0.available_slots_text;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "available_slots_text", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n      </div>\n    ";
  return buffer;}

function program23(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n      <a href=\"#\" class=\"button-secondary delete_event_link\">";
  stack1 = "Delete";
  stack2 = "links.delete";
  stack3 = {};
  stack4 = "calendar.eventDetails";
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

function program25(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <a href=\"#\" class=\"reserve_event_link\"><strong>";
  stack1 = "Reserve";
  stack2 = "links.reserve";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong></a>\n      ";
  return buffer;}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <a href=\"#\" class=\"unreserve_event_link\">";
  stack1 = "Un-reserve";
  stack2 = "links.unreserve";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n      ";
  return buffer;}

function program29(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <a href=\"#\" class=\"edit_event_link\">";
  stack1 = "Edit";
  stack2 = "links.edit";
  stack3 = {};
  stack4 = "calendar.eventDetails";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n      ";
  return buffer;}

  buffer += "<div class=\"event-details carat-bottom\">\n  <div class='event-details-header'>\n    <a href=\"#\" class=\"popover_close x-close-link\">×</a>\n    <h3 class=\"details_title title\">\n      ";
  stack1 = helpers.fullDetailsURL || depth0.fullDetailsURL;
  stack2 = helpers.can_edit || depth0.can_edit;
  stack3 = helpers.ifAll || depth0.ifAll;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </h3>\n  </div>\n  <div class=\"event-details-content\">\n    <div class=\"event-details-timestring\">";
  stack1 = helpers.displayTimeString || depth0.displayTimeString;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "displayTimeString", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <table cellspacing=\"0\">\n      ";
  stack1 = helpers.contextInfo || depth0.contextInfo;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.location_name || depth0.location_name;
  stack2 = helpers['if'];
  tmp1 = self.program(8, program8, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.description || depth0.description;
  stack2 = helpers['if'];
  tmp1 = self.program(10, program10, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.reservations || depth0.reservations;
  stack2 = helpers['if'];
  tmp1 = self.program(12, program12, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.availableSlotsText || depth0.availableSlotsText;
  stack2 = helpers['if'];
  tmp1 = self.program(19, program19, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n    <div class=\"details_description lock_explanation\">";
  stack1 = helpers.lock_explanation || depth0.lock_explanation;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "lock_explanation", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    ";
  stack1 = helpers.available_slots_text || depth0.available_slots_text;
  stack2 = helpers['if'];
  tmp1 = self.program(21, program21, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"popover-links-holder event-details-footer\">\n    ";
  stack1 = helpers.can_delete || depth0.can_delete;
  stack2 = helpers['if'];
  tmp1 = self.program(23, program23, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"event-details-links\">\n      ";
  stack1 = helpers.can_reserve || depth0.can_reserve;
  stack2 = helpers['if'];
  tmp1 = self.program(25, program25, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.can_unreserve || depth0.can_unreserve;
  stack2 = helpers['if'];
  tmp1 = self.program(27, program27, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.can_edit || depth0.can_edit;
  stack2 = helpers['if'];
  tmp1 = self.program(29, program29, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>\n";
  return buffer;});
  
  return templates['calendar/eventDetails'];
});
