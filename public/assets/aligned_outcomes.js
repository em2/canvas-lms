I18n.scoped("shared.aligned_outcomes",function(e){$(document).ready(function(){var h=$("#aligned_outcomes .outcomes_url").attr("href"),i=function(a){$("#aligned_outcomes .outcomes .outcome:not(.blank)").remove();var b=parseFloat($("#full_assignment_holder input[name='assignment[mastery_score]']").val()),c=parseFloat($("#full_assignment_holder input[name='assignment[points_possible]']").val()),d=null;if(isFinite(b)||isFinite(c))d=b||c||0;for(var f in a){b=a[f].content_tag;c=b.learning_outcome;var g=
$("#aligned_outcomes .outcomes .outcome.blank:first").clone(true).removeClass("blank");c.mastery="";if(b.rubric_association_id){g.addClass("rubric_alignment");c.mastery=e.t("mastery_info_see_rubric","see the rubric for mastery details")}else if(d)c.mastery=e.t("mastery_score_info","mastery with a score of %{score} or higher",{score:d});g.fillTemplateData({data:c,hrefValues:["id"],htmlValues:["description"]});$("#aligned_outcomes .outcomes").append(g.show())}$("#aligned_outcomes").showIf(a.length>
0);$("#align_outcomes_dialog:visible").length>0&&$(".align_outcomes_link:first").click()};typeof h!="undefined"&&$.ajaxJSON(h,"GET",{},function(a){i(a)});$(".align_outcomes_link").click(function(a){a.preventDefault();$("#aligned_outcomes").show();$("html,body").scrollTo($("#aligned_outcomes"));a=(a=parseFloat($("#full_assignment_holder input[name='assignment[mastery_score]']").val()))||"";$("#align_outcomes_dialog .outcome_checkbox").each(function(){$(this).attr("checked",false).attr("disabled",false)});
$("#align_outcomes_dialog .rubric_aligned").hide();$("#aligned_outcomes .outcomes .outcome:not(.blank):not(.rubric_alignment)").each(function(){var b=$(this).getTemplateData({textValues:["id"]}).id;$("#align_outcome_for_"+b).attr("checked",true)});$("#aligned_outcomes .outcomes .outcome.rubric_alignment:not(.blank)").each(function(){var b=$(this).getTemplateData({textValues:["id"]}).id;$("#align_outcome_for_"+b).attr("checked",true).attr("disabled",true);$(this).parents(".outcome").find(".rubric_aligned").show()});
$("#align_outcomes_dialog .outcome_checkbox").each(function(){$(this).change()});$("#aligned_outcomes_mastery_score").val(a);$("#align_outcomes_dialog").dialog("close").dialog({autoOpen:false,title:e.t("buttons.align_outcomes","Align Outcomes"),width:500}).dialog("open")});$("#align_outcomes_dialog .cancel_button").click(function(){$("#align_outcomes_dialog").dialog("close")});$("#align_outcomes_dialog .outcome_checkbox").change(function(){$(this).parents(".outcome").toggleClass("selected_outcome",
$(this).attr("checked"))});$("#align_outcomes_dialog .save_button").click(function(){var a=[];$(".outcome_checkbox:checked").each(function(){a.push($(this).val())});a=a.join(",");var b=$("#aligned_outcomes .outcomes_url").attr("href"),c=parseFloat($("#aligned_outcomes_mastery_score").val())||"",d=$(this);d.text(e.t("status.aligning_outcomes","Aligning Outcomes..."));$("#align_outcomes_dialog .button-container .button").attr("disabled",true);$.ajaxJSON(b,"POST",{outcome_ids:a,mastery_score:c},function(f){$("#align_outcomes_dialog .button-container .button").attr("disabled",
false);d.text(e.t("buttons.align_outcomes","Align Outcomes"));$("#full_assignment_holder input[name='assignment[mastery_score]']").val(c);i(f);$("#align_outcomes_dialog").dialog("close")},function(){$("#align_outcomes_dialog .button-container .button").attr("disabled",false);d.text(e.t("errors.align_outcomes_failed","Aligning Outcomes Failed, Please Try Again"))})})})});
$.extend(true,I18n=I18n||{},{translations:{es:{shared:{aligned_outcomes:{buttons:{align_outcomes:"Adaptar los resultados"},mastery_score_info:"dominio del tema con una calificaci\u00f3n de %{score} o mayor",errors:{align_outcomes_failed:"Adaptaci\u00f3n de los resultados fall\u00f3, intente de nuevo"},mastery_info_see_rubric:"ver la r\u00fabrica para los detalles del dominio del tema",status:{aligning_outcomes:"Adaptando los resultados..."}}}}}});