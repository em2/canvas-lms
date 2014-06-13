define('jst/courses/section/enrollment', ["compiled/handlebars_helpers","i18n!courses.section.enrollment"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['courses/section/enrollment'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<li id=\"enrollment_";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"user user_";
  stack1 = helpers.user_id || depth0.user_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + " ";
  stack1 = helpers.typeClass || depth0.typeClass;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "typeClass", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" title=\"";
  stack1 = helpers.user || depth0.user;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + ": ";
  stack1 = helpers.user || depth0.user;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.login_id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user.login_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n  <span class=\"links\">\n    ";
  stack1 = helpers.permissions || depth0.permissions;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.manage_students);
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <a href=\"/confirmations/";
  stack1 = helpers.user_id || depth0.user_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/re_send/";
  stack1 = helpers.user_id || depth0.user_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "?enrollment_id=";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"re_send_confirmation_url\" style=\"display: none;\">&nbsp;</a>\n  </span>\n  <a href=\"/courses/";
  stack1 = helpers.course_id || depth0.course_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "course_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/users/";
  stack1 = helpers.user_id || depth0.user_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"name\">";
  stack1 = helpers.user || depth0.user;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.sortable_name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user.sortable_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n  <div class=\"short_name\">";
  stack1 = helpers.user || depth0.user;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.short_name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user.short_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n  <div class=\"enrollment_type\">";
  stack1 = helpers.typeLabel || depth0.typeLabel;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "typeLabel", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n  <div class=\"email\">";
  stack1 = helpers.user || depth0.user;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.login_id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user.login_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n\n  <span class=\"clear\"></span>\n</li>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <a href=\"/courses/";
  stack1 = helpers.course_id || depth0.course_id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "course_id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/unenroll/";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"unenroll_user_link no-hover\" title=\"";
  stack1 = "Remove User from Course";
  stack2 = "links.unenroll_user";
  stack3 = {};
  stack4 = "courses.section.enrollment";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <img alt=\"delete_enrollment\" src=\"/images/delete_circle.png\" />\n    </a>\n    ";
  return buffer;}

  buffer += "<!-- taken from app/views/shared/_enrollment.html.erb -->\n";
  stack1 = depth0;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  
  return templates['courses/section/enrollment'];
});
