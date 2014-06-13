define('jst/discussions/_reply_form', ["compiled/handlebars_helpers","i18n!discussions.reply_form"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['discussions/_reply_form'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n      ";
  stack1 = "Add a side comment...";
  stack2 = "add_side_comment";
  stack3 = {};
  stack4 = "discussions.reply_form";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n      ";
  stack1 = "Write a reply...";
  stack2 = "write_a_reply";
  stack3 = {};
  stack4 = "discussions.reply_form";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n          <a href=\"#\" class=\"discussion-reply-add-attachment\" data-event=\"addReplyAttachment\">";
  stack1 = "Attach";
  stack2 = "attach_file";
  stack3 = {};
  stack4 = "discussions.reply_form";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n        ";
  return buffer;}

  buffer += "<form class=\"discussion-section hide-if-collapsed discussion-reply-form\">\n  <span class=\"notification\" data-bind=\"notification\"></span>\n  <label class=\"discussion-reply-label hide-if-replying\" data-event=\"addReply\" for=\"reply_message_for_";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n    ";
  stack1 = helpers.allowsSideComments || depth0.allowsSideComments;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </label>\n  <div class=\"show-if-replying\">\n    <textarea class=\"reply-textarea\" id=\"reply_message_for_";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"></textarea>\n\n    <div class=\"clearfix\">\n      <div class=\"discussion-reply-buttons\">\n        <button class=\"button small-button\" type=\"submit\">";
  stack1 = "Post Response";
  stack2 = "post_response";
  stack3 = {};
  stack4 = "discussions.reply_form";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n        <a href=\"javascript:\" class=\"cancel_button\">";
  stack1 = "Cancel";
  stack2 = "cancel";
  stack3 = {};
  stack4 = "discussions.reply_form";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n      </div>\n\n      <div class=\"discussion-reply-attachments-container\">\n        <ul class=\"discussion-reply-attachments\"></ul>\n        ";
  stack1 = helpers.canAttach || depth0.canAttach;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    </div>\n  </div>\n</form>\n";
  return buffer;});
  
Handlebars.registerPartial('discussions/reply_form', templates['discussions/_reply_form']);

  return templates['discussions/_reply_form'];
});
