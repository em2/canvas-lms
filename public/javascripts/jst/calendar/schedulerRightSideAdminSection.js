define('jst/calendar/schedulerRightSideAdminSection', ["compiled/handlebars_helpers","i18n!calendar.scheduler_right_side_admin_section"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/schedulerRightSideAdminSection'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0;


  buffer += "<div class=\"rs-section\">\n  <p>The scheduler tool lets you set up time slots that students (or student groups) can sign up for. To get started, click the button below.</p>\n  <button class=\"create_link button\">";
  stack1 = "Create an appointment group";
  stack2 = "create_a_new_set_of_appointments";
  stack3 = {};
  stack4 = "calendar.schedulerRightSideAdminSection";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n</div>\n";
  return buffer;});
  
  return templates['calendar/schedulerRightSideAdminSection'];
});
