define('jst/discussions/_deleted_entry', ["compiled/handlebars_helpers","i18n!discussions.deleted_entry"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['discussions/_deleted_entry'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "admin-link-hover-area";}

  buffer += "<header class=\"";
  stack1 = helpers.hideRepliesOnCollapse || depth0.hideRepliesOnCollapse;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " discussion-section ";
  stack1 = helpers.read_state || depth0.read_state;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "read_state", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" data-event=\"toggleCollapsed\">\n  <div class=\"discussion-header-content right-of-avatar\">\n    <h1 class=\"discussion-title\">";
  stack1 = "This entry has been deleted";
  stack2 = "deleted";
  stack3 = {};
  stack4 = "discussions.deleted_entry";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n  </div>\n</header>\n\n";
  return buffer;});
  
Handlebars.registerPartial('discussions/deleted_entry', templates['discussions/_deleted_entry']);

  return templates['discussions/_deleted_entry'];
});
