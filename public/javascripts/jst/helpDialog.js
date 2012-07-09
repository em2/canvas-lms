define('jst/helpDialog', ["compiled/handlebars_helpers","i18n!help_dialog"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['helpDialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <li>\n        <a href=\"";
  stack1 = helpers.url || depth0.url;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(4, program4, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" target=\"_blank\">\n          <span class=\"text\">";
  stack1 = helpers.text || depth0.text;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "text", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n          <span class=\"subtext\">";
  stack1 = helpers.subtext || depth0.subtext;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "subtext", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n        </a>\n      </li>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers.url || depth0.url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "url", { hash: {} }); }
  return escapeExpression(stack1);}

function program4(depth0,data) {
  
  
  return "#";}

function program6(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n      <div class=\"ui-state-error\">\n        <span class=\"ui-icon ui-icon-alert\"></span>\n        <strong>";
  stack1 = "Wait! A *better browser* may help solve the problem.";
  stack2 = "wait_a_better_browser_may_help_solve_the_problem";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = "<a target=\"_blank\" href=\"http://guides.instructure.com/s/2204/m/4214/l/41056-Which-browsers-does-Canvas-support-\">$1</a>";
  stack3['w0'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n        <div>";
  stack1 = "You are using Internet Explorer version %{browserVersion}, Try again using the latest version of *Chrome* or **Firefox**";
  stack2 = "you_are_using_browser_version_version_try_again_using_the_latest_version_of_chrome_or_firefox";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = "<a href=\"http://getfirefox.com\">$1</a>";
  stack3['w1'] = stack4;
  stack4 = "<a href=\"http://google.com/chrome\">$1</a>";
  stack3['w0'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n      </div>\n    ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n      <div class=\"ui-state-highlight\">\n        <span class=\"ui-icon ui-icon-info\"></span>\n        <strong>";
  stack1 = "For an instant answer:";
  stack2 = "for_an_instant_answer";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n        <div>";
  stack1 = "See if your issue is addressed in the *Canvas Guides*.";
  stack2 = "see_if_your_issue_is_addressed_in_the_canvas_guides";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = "<a href=\"http://guides.instructure.com/\">$1</a>";
  stack3['w0'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n      </div>\n    ";
  return buffer;}

  buffer += "<div id=\"help-dialog\">\n  <ul id=\"help-dialog-options\" class=\"help-dialog-pane\">\n    ";
  stack1 = helpers.helpLinks || depth0.helpLinks;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n  <form class=\"help-dialog-pane\" id=\"teacher_feedback\" style=\"display:none\" action=\"/api/v1/conversations\" method=\"POST\">\n    <label for=\"teacher-feedback-recipients\">\n      ";
  stack1 = "Which course is this question about?";
  stack2 = "which_course_is_this_question_about";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <small>";
  stack1 = "Message will be sent to all the Teachers / TA's in the course.";
  stack2 = "message_will_be_sent_to_all_the_teachers_tas_in_the_course";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</small>\n    </label>\n    <select name=\"recipients[]\" id=\"teacher-feedback-recipients\"></select>\n    <label for=\"teacher-feedback-body\">";
  stack1 = "Message";
  stack2 = "message";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n    <textarea id=\"teacher-feedback-body\" name=\"body\"></textarea>\n    <div class=\"button-container\">\n      <button type=\"submit\" class=\"button\" data-text-while-loading=\"";
  stack1 = "Sending...";
  stack2 = "sending";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = "Send Message";
  stack2 = "send_message";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n    </div>\n  </form>\n  <form class=\"help-dialog-pane\" id=\"create_ticket\" style=\"display:none\" action=\"/errors\" method=\"POST\">\n    <h4>";
  stack1 = "File a ticket for a personal response from our support team";
  stack2 = "file_a_ticket_for_a_personal_response_from_our_support_team";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h4>\n    ";
  stack1 = helpers.showBadBrowserMessage || depth0.showBadBrowserMessage;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(8, program8, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div>\n      <label for=\"error_subject\">";
  stack1 = "Subject";
  stack2 = "subject";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <input id=\"error_subject\" name=\"error[subject]\" />\n    </div>\n    <div>\n      <label for=\"error-comments\">\n        ";
  stack1 = "Description";
  stack2 = "description";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <small>";
  stack1 = "Include a link to a screencast/screenshot using something like *Jing*.";
  stack2 = "include_a_link_to_a_screencast_or_screenshot_using_something_like_jing";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = "<a href=\"http://www.techsmith.com/download/jing\">$1</a>";
  stack3['w0'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</small>\n      </label>\n      <textarea id=\"error-comments\" name=\"error[comments]\"></textarea>\n    </div>\n    <label for=\"severity\">";
  stack1 = "How is this affecting you?";
  stack2 = "how_is_this_affecting_you";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n    <select name=\"error[user_perceived_severity]\" id=\"severity\">\n      <option value=\"\">";
  stack1 = "Please select one...";
  stack2 = "please_select_one";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</option>\n      <option value=\"just_a_comment\">";
  stack1 = "Just a casual question, comment, idea, suggestion";
  stack2 = "just_a_casual_question_comment_idea_suggestion";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</option>\n      <option value=\"not_urgent\">";
  stack1 = "I need some help but it's not urgent";
  stack2 = "i_need_some_help_but_its_not_urgent";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</option>\n      <option value=\"workaround_possible\">";
  stack1 = "Something's broken but I can work around it for now";
  stack2 = "somethings_broken_but_i_can_work_around_it_for_now";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</option>\n      <option value=\"blocks_what_i_need_to_do\">";
  stack1 = "I can't get things done until I hear back from you";
  stack2 = "i_cant_get_things_done_until_i_hear_back_from_you";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</option>\n      <option value=\"extreme_critical_emergency\">";
  stack1 = "EXTREME CRITICAL EMERGENCY!!";
  stack2 = "extreme_critical_emergency";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</option>\n    </select>\n    <div style=\"";
  stack1 = helpers.showEmail || depth0.showEmail;
  stack2 = helpers.hiddenUnless || depth0.hiddenUnless;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "hiddenUnless", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "\">\n      <label for=\"error-email\">";
  stack1 = "Your email address";
  stack2 = "your_email_address";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <input type=\"email\" name=\"error[email]\" id=\"error-email\">\n    </div>\n    <input type=\"hidden\" name=\"error[url]\" value=\"";
  stack1 = helpers.url || depth0.url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n    <div class=\"button-container\">\n      <button type=\"submit\" data-text-while-loading=\"";
  stack1 = "Submitting Ticket...";
  stack2 = "Submitting_Ticket";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" class=\"button submit_button\"><img src=\"/images/email.png\" alt=\"\"/>";
  stack1 = "Submit Ticket";
  stack2 = "submit_this_support_request";
  stack3 = {};
  stack4 = "helpDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n    </div>\n  </form>\n</div>\n";
  return buffer;});
  
  return templates['helpDialog'];
});
