define('jst/changePointsPossibleToMatchRubricDialog', ["compiled/handlebars_helpers","i18n!change_points_possible_to_match_rubric_dialog"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['changePointsPossibleToMatchRubricDialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0;


  buffer += "<p title=\"";
  stack1 = "Change points possible to match rubric?";
  stack2 = "titles.update_assignment_points";
  stack3 = {};
  stack4 = "changePointsPossibleToMatchRubricDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  ";
  stack1 = "This assignment has %{assignmentPoints} points possible, would you like to change it to have %{rubricPoints} points possible to match this rubric?";
  stack2 = "prompts.update_assignment_points";
  stack3 = {};
  stack4 = "changePointsPossibleToMatchRubricDialog";
  stack3['scope'] = stack4;
  stack4 = helpers['t'] || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</p>";
  return buffer;});
  
  return templates['changePointsPossibleToMatchRubricDialog'];
});
