I18n.scoped("gradebook",function(e){var c={init:function(){$(".assignment_header").click(function(a){a.preventDefault();$(this).find(".ui-icon").toggleClass("ui-icon-circle-arrow-n").end().next(".assignment_details").slideToggle("fast")});$(".revert-grade-link").bind("mouseenter mouseleave",function(){$(this).toggleClass("ui-state-hover")}).click(c.handleGradeSubmit)},handleGradeSubmit:function(a){a.preventDefault();a=$(this).parents("tr").data("assignment-id");var d=$(this).parents("tr").data("user-id"),
f=$(this).find(".grade").text().replace("--",""),g=$(".update_submission_grade_url").attr("href"),h=$(".update_submission_grade_url").attr("title");$(".assignment_"+a+"_user_"+d+"_current_grade").addClass("loading");$.ajaxJSON(g,h,{"submission[assignment_id]":a,"submission[user_id]":d,"submission[grade]":f},function(i){$.each(i,function(){var b=this.submission;$(".assignment_"+b.assignment_id+"_user_"+b.user_id+"_current_grade").removeClass("loading").attr("title",e.t("graded_by_me","%{graded_time} by me",
{graded_time:$.parseFromISO(b.graded_at).datetime_formatted})).text(b.grade||"--")})})}};$(document).ready(c.init)});$.extend(true,I18n=I18n||{},{translations:{es:{gradebook:{graded_by_me:"%{graded_time} por m\u00ed"}}}});