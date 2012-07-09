define('jst/discussions/_reply_attachment', ["compiled/handlebars_helpers","i18n!discussions.reply_attachment"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['discussions/_reply_attachment'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0;


  buffer += "<li>\n  <input name=\"attachment\" type=\"file\">\n  <a href=\"#\" data-event=\"removeReplyAttachment\">";
  stack1 = "remove";
  stack2 = "remove_attachment";
  stack3 = {};
  stack4 = "discussions.reply_attachment";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n</li>\n";
  return buffer;});
  
Handlebars.registerPartial('discussions/reply_attachment', templates['discussions/_reply_attachment']);

  return templates['discussions/_reply_attachment'];
});
