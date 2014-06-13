define('jst/discussions/_entry_content', ["compiled/handlebars_helpers","i18n!discussions.entry_content"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['discussions/_entry_content'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.author || depth0.author;
  stack1 = self.invokePartial(partials.avatar, 'avatar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;}

function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers.parent_cid || depth0.parent_cid;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "parent_cid", { hash: {} }); }
  return escapeExpression(stack1);}

function program5(depth0,data) {
  
  
  return "content";}

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n          <li><a data-event=\"edit\" href=\"#\"><span class=\"ui-icon ui-icon-pencil\" />";
  stack1 = "Edit";
  stack2 = "edit";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n          <li><a data-event=\"remove\" href=\"#\"><span class=\"ui-icon ui-icon-trash\" />";
  stack1 = "Delete";
  stack2 = "delete";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n        ";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n          <li><a href=\"";
  stack1 = helpers.speedgraderUrl || depth0.speedgraderUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "speedgraderUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"><span class=\"ui-icon ui-icon-check\" />";
  stack1 = "Open in SpeedGrader";
  stack2 = "open_in_speedgrader";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n        ";
  return buffer;}

function program11(depth0,data) {
  
  
  return "unknown";}

function program13(depth0,data) {
  
  var stack1, stack2;
  stack1 = helpers.author || depth0.author;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.url);
  stack2 = helpers['if'];
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " href=\"";
  stack1 = helpers.author || depth0.author;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.url);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "author.url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" ";
  return buffer;}

function program16(depth0,data) {
  
  var stack1;
  stack1 = helpers.author || depth0.author;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.display_name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "author.display_name", { hash: {} }); }
  return escapeExpression(stack1);}

function program18(depth0,data) {
  
  var stack1, stack2, stack3, stack4;
  stack1 = "Unknown Author";
  stack2 = "unknown_author";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}

function program20(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <div class=\"discussion-fyi\">This comment was edited by <a ";
  stack1 = helpers.editor || depth0.editor;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.url);
  stack2 = helpers['if'];
  tmp1 = self.program(21, program21, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = helpers.editor || depth0.editor;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.display_name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "editor.display_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></div>\n  ";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " href=\"";
  stack1 = helpers.editor || depth0.editor;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.url);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "editor.url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" ";
  return buffer;}

function program23(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <div class=\"comment_attachments\">\n      ";
  stack1 = helpers.attachments || depth0.attachments;
  stack2 = helpers.each;
  tmp1 = self.program(24, program24, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  ";
  return buffer;}
function program24(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div><a href=\"";
  stack1 = helpers.url || depth0.url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = helpers['content-type'] || depth0['content-type'];
  stack2 = helpers.mimeClass || depth0.mimeClass;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "mimeClass", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "\" title=\"";
  stack1 = helpers.filename || depth0.filename;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "filename", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = helpers.display_name || depth0.display_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "display_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></div>\n      ";
  return buffer;}

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['discussions/reply_form'], 'discussions/reply_form', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}

  buffer += "<header class=\"discussion-section admin-link-hover-area ";
  stack1 = helpers.read_state || depth0.read_state;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "read_state", { hash: {} }); }
  buffer += escapeExpression(stack1) + " clearfix\" data-event=\"toggleCollapsed\">\n  <div class=\"discussion-read-state tooltip\">\n    <span class=\"tooltip_wrap unread\">\n      <span class=\"tooltip_text\">";
  stack1 = "Unread";
  stack2 = "unread";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n    </span>\n    <span class=\"tooltip_wrap just_read\">\n      <span class=\"tooltip_text\">";
  stack1 = "Just Read";
  stack2 = "just_read";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n    </span>\n  </div>\n  ";
  stack1 = helpers.author || depth0.author;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"discussion-header-content right-of-avatar\">\n    <div class=\"hide-if-collapsed admin-links\">\n      <button class=\"al-trigger\" data-event=\"openMenu\"><span class=\"al-trigger-inner\">";
  stack1 = "Manage";
  stack2 = "manage";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></button>\n      <ul class=\"al-options\">\n        <li><a href=\"#";
  stack1 = helpers.parent_cid || depth0.parent_cid;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(5, program5, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span class=\"ui-icon ui-icon-arrowreturnthick-1-w\" />";
  stack1 = "Go To Parent";
  stack2 = "go_to_parent";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n        ";
  stack1 = helpers.canModerate || depth0.canModerate;
  stack2 = helpers['if'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.speedgraderUrl || depth0.speedgraderUrl;
  stack2 = helpers['if'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    </div>\n    <div class=\"discussion-header-right\">\n      <div class=\"discussion-pubdate\">";
  stack1 = helpers.updated_at || depth0.updated_at;
  stack2 = {};
  stack3 = true;
  stack2['pubdate'] = stack3;
  stack3 = helpers.friendlyDatetime || depth0.friendlyDatetime;
  tmp1 = {};
  tmp1.hash = stack2;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack1, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "friendlyDatetime", stack1, tmp1); }
  else { stack1 = stack3; }
  buffer += escapeExpression(stack1) + "</div>\n    </div>\n    <h2 class=\"discussion-title\">\n      <a class=\"author ";
  stack1 = helpers.author || depth0.author;
  stack2 = helpers.unless;
  tmp1 = self.program(11, program11, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" title=\"";
  stack1 = "Author's name";
  stack2 = "authors_name";
  stack3 = {};
  stack4 = "discussions.entry_content";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.author || depth0.author;
  stack2 = helpers['if'];
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"author\">";
  stack1 = helpers.author || depth0.author;
  stack2 = helpers['if'];
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(18, program18, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n    </h2>\n    <h1 class=\"show-if-collapsed discussion-subtitle summary ellipsis\">";
  stack1 = helpers.summary || depth0.summary;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "summary", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n  </div>\n</header>\n<div class=\"discussion-section hide-if-collapsed message_wrapper\">\n  <span class=\"message-notification\" data-bind=\"messageNotification\"></span>\n  <div data-bind=\"message\" class=\"message user_content\">";
  stack1 = helpers.message || depth0.message;
  stack2 = helpers.convertNativeToMediaCommentThumnail || depth0.convertNativeToMediaCommentThumnail;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "convertNativeToMediaCommentThumnail", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "</div>\n  ";
  stack1 = helpers.editor || depth0.editor;
  stack2 = helpers['if'];
  tmp1 = self.program(20, program20, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers.attachments || depth0.attachments;
  stack2 = helpers['if'];
  tmp1 = self.program(23, program23, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  stack1 = helpers.canReply || depth0.canReply;
  stack2 = helpers['if'];
  tmp1 = self.program(26, program26, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  
Handlebars.registerPartial('discussions/entry_content', templates['discussions/_entry_content']);

  return templates['discussions/_entry_content'];
});
