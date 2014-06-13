define('jst/calendar/recipientList', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/recipientList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  ";
  stack1 = helpers.recipients || depth0.recipients;
  stack2 = helpers.each;
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <span>";
  stack1 = helpers.name || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n      <input name=\"recipients[]\" type=\"hidden\" value=\"group_";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n    </li>\n  ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  ";
  stack1 = helpers.recipients || depth0.recipients;
  stack2 = helpers.each;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <span>";
  stack1 = helpers.name || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n      <input name=\"recipients[]\" type=\"hidden\" value=\"";
  stack1 = helpers.id || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" />\n    </li>\n  ";
  return buffer;}

  stack1 = "Group";
  stack2 = helpers.recipientType || depth0.recipientType;
  stack3 = helpers.ifEqual || depth0.ifEqual;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(4, program4, data);
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  
  return templates['calendar/recipientList'];
});
