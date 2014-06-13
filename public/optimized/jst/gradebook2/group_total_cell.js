define('jst/gradebook2/group_total_cell', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradebook2/group_total_cell'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers.percentage || depth0.percentage;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "percentage", { hash: {} }); }
  buffer += escapeExpression(stack1) + "%\n    ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n      -\n    ";}

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <span class='letter-grade-points'>";
  stack1 = helpers.letterGrade || depth0.letterGrade;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "letterGrade", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n  ";
  return buffer;}

  buffer += "<div class=\"gradebook-cell\">\n  <div class=\"gradebook-tooltip\">";
  stack1 = helpers.score || depth0.score;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "score", { hash: {} }); }
  buffer += escapeExpression(stack1) + " / ";
  stack1 = helpers.possible || depth0.possible;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "possible", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n  <span class=\"percentage\">\n    ";
  stack1 = helpers.possible || depth0.possible;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </span>\n   ";
  stack1 = helpers.letterGrade || depth0.letterGrade;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;});
  
  return templates['gradebook2/group_total_cell'];
});
