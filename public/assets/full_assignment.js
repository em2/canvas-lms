var wikiSidebar,hideFullAssignmentForm,addGroupCategory;
I18n.scoped("full_assignment",function(j){jQuery(function(a){function f(b){a("#"+b).editorBox("focus")||setTimeout(function(){f(b)},500)}function g(){var b=a("#full_assignment"),d=a("#edit_assignment_form");if(d.css("display")==="none"){var c=b.getTemplateData({textValues:["title","due_date_string","due_time_string","points_possible","points_type"]});if(c.description=="No Content")c.description="";c.due_date=c.due_date_string;c.due_time=c.due_time_string;var i=Date.parse(a.trim(c.due_date+" "+c.due_time));
c.due_at=i&&a.dateString(i)+" at "+a.timeString(i);d.find("select[name='points_type']").change();d.fillFormData(c,{object_name:"assignment"});b.find(".description, .edit_full_assignment_link").hide();d.show().find("textarea:first").editorBox();if(wikiSidebar){wikiSidebar.attachToEditor(d.find("textarea:first"));wikiSidebar.show();a("#sidebar_content").hide()}d.find(".more_options_link").show();d.find(".more_assignment_values").hide();setTimeout(function(){f(d.find("textarea:first").attr("id"))},500);
d.parents(".ui-dialog").length||a("html,body").scrollTo(d);setTimeout(function(){d.find(".assignment_type").change()},500)}}hideFullAssignmentForm=function(){var b=a("#full_assignment");a("#edit_assignment_form").hide();if(wikiSidebar){wikiSidebar.hide();a("#sidebar_content").show()}b.find(".description").show();b.find(".edit_full_assignment_link").show()};wikiSidebar&&wikiSidebar.init();var e=a("#edit_assignment_form");e.find(".more_options_link").click(function(b){a(this).focus();b.preventDefault();
e.find(".more_options_link").hide();e.find(".more_assignment_values").show();e.find(".assignment_type").change()});a(".edit_full_assignment_link").click(function(b){b.preventDefault();g()});e.find(".time_field").timepicker();e.find(".date_field").datetime_field();e.find(".assignment_type").change(function(){var b=a(this).val();e.find(".assignment_content").showIf(b=="assignment"||b=="discussion_topic"||b=="external_tool");e.find(".submission_content").showIf(b=="assignment");e.find(".quiz_content").showIf(b==
"quiz");e.find(".discussion_topic_content").showIf(b=="discussion_topic");e.find(".external_tool_content").showIf(b=="external_tool");e.find(".not_graded_content").showIf(b=="not_graded");e.find(".more_assignment_values.assignment_content").showIf((b=="assignment"||b=="discussion_topic")&&!e.find(".more_options_link:visible").length);b=="external_tool"&&a("#assignment_external_tool_tag_attributes_url").val()==""&&a("#edit_external_tool_url").click()}).triggerHandler("change");e.find(".points_possible").change(function(){var b=
parseFloat(a(this).val());if(isNaN(b)||!isFinite(b))a(this).val("");else{var d=a("#edit_assignment_form"),c=d.getFormData({object_name:"assignment"}),i=a(this).data("old_value"),k={};k.points_possible=b;if(!c.mastery_score||i&&c.mastery_score==Math.round(i*7.5)/10)k.mastery_score=Math.round(b*7.5)/10;if(!c.max_score||c.max_score==i)k.max_score=b;c.min_score||(k.min_score=0);d.fillFormData(k,{object_name:"assignment",call_change:false});a(this).data("old_value",b)}}).change();a(".more_grading_options_link").click(function(){var b=
a(this).hasClass("hide_options");a(this).toggleClass("hide_options").text(b?j.t("links.more_grading_options","more grading options"):j.t("links.hide_grading_options","hide grading options"));a(".more_grading_options").showIf(!b);return false});a(".switch_full_assignment_view").click(function(){e.find("textarea:first").editorBox("toggle");return false});e.find(".submission_type_option").change(function(){e.find(".online_submission_types").showIf(a(this).val()=="online")}).change();e.formSubmit({required:["title"],
object_name:"assignment",property_validations:{unlock_at:function(b,d){var c=Date.parse(d.unlock_at),i=Date.parse(d.due_at);if(c&&i&&c>i)return j.t("messages.unlock_before_due","The assignment should be unlocked before it's due")},lock_at:function(b,d){var c=Date.parse(d.lock_at),i=Date.parse(d.due_at);if(c&&i&&c<i)return j.t("messages.lock_after_due","The assignment shouldn't be locked again until after the due date")},"=submission_type":function(b,d){if(b=="online"&&d.assignment_type=="assignment")if(!d.online_upload&&
!d.online_text_entry&&!d.online_url&&!d.media_recording)return j.t("messages.need_online_submission_type","Please choose at least one type of online submission")},"external_tool_tag_attributes[url]":function(b,d){if(d.assignment_type=="external_tool"&&(b.length<3||b.indexOf(" ")>=0))return j.t("messages.need_url","Please specify a valid URL")}},onFormError:function(b){var d=[];a.each(b,function(c,i){i.object.is(":visible")||d.push(a.h(i.message))});d.length&&a(this).find("a.more_options_link").errorBox(a.h(j.t("messages.hidden_errors",
"There were errors on one or more advanced options")))},processData:function(b){var d;if(a(this).find(".more_grading_options").css("display")=="none"){delete b["assignment[min_score]"];delete b["assignment[max_score]"];delete b["assignment[mastery_score]"];delete b.never_drop}a.each(["unlock_at","lock_at","due_at"],function(c,i){if(i=="due_at"||b["assignment["+i+"]"])if(d=Date.parse(b["assignment["+i+"]"]))b["assignment["+i+"]"]=d.toString("yyyy-MM-ddTHH:mm:ss")});a.extend(b,{"assignment[submission_types]":b.submission_type,
due_date:a.dateString(d),description:a(this).find("textarea:first").editorBox("get_code"),"assignment[description]":b.description});if(b.submission_type=="online")b["assignment[submission_types]"]=a.map(["online_upload","online_text_entry","online_url","media_recording"],function(c){return b[c]&&c}).join(",")||"none";if(b.assignment_type=="quiz")b["assignment[submission_types]"]="online_quiz";if(b.assignment_type=="not_graded")b["assignment[submission_types]"]="not_graded";if(b.assignment_type=="discussion_topic")b["assignment[submission_types]"]=
"discussion_topic";if(b.assignment_type=="external_tool")b["assignment[submission_types]"]="external_tool";return b},beforeSubmit:function(b){hideFullAssignmentForm();return a("#full_assignment").fillTemplateData({data:a.extend(a(this).getFormData({object_name:"assignment"}),{description:a(this).find("textarea:first").editorBox("get_code"),due_date_string:b.due_date,due_time_string:b.due_time}),except:["description"]}).loadingImage()},success:function(b,d){var c=b.assignment,i=a.parseFromISO(c.due_at,
"due_date");d=a("#full_assignment");a.extend(c,{due_date:i.date_formatted,due_time:i.time_formatted,timestamp:i.timestamp,due_date_string:i.date_string,due_time_string:i.time_string,lock_at:a.parseFromISO(c.lock_at).datetime_formatted,unlock_at:a.parseFromISO(c.unlock_at).datetime_formatted});d.find(".quiz_content").showIf(c.submission_types=="online_quiz"&&c.quiz);d.find(".discussion_topic_content").showIf(c.submission_types=="discussion_topic"&&c.discussion_topic);a("#turnitin_enabled").showIf(c.turnitin_enabled);
a(".readable_submission_types").text(c.readable_submission_types||"").showIf(c.readable_submission_types);c.quiz&&a.extend(c,{quiz_id:c.quiz.id,quiz_title:c.quiz.title});c.discussion_topic&&a.extend(c,{discussion_topic_id:c.discussion_topic.id,discussion_topic_title:c.discussion_topic.title});a(this).find("textarea:first").editorBox("set_code",c.description);a(this).fillFormData(c,{object_name:"assignment"});d.fillTemplateData({data:c,htmlValues:["description"]});a("#full_assignment_holder").find(".points_text").showIf(c.points_possible||
c.points_possible===0);d.find(".assignment_quiz_link").attr("href",a.replaceTags(d.find(".assignment_quiz_url").attr("href"),"quiz_id",c.quiz_id));d.find(".assignment_topic_link").attr("href",a.replaceTags(d.find(".assignment_topic_url").attr("href"),"discussion_topic_id",c.discussion_topic_id));d.loadingImage("remove");a(this).triggerHandler("assignment_updated",b);a("#full_assignment_holder .redirect_on_finish_url").ifExists(function(){var k=a(this).attr("href");if(k.indexOf("#")>0)k=k.substr(0,
k.indexOf("#"));window.location.href=k+"#assignment_"+c.id})},error:function(b,d){g();d.loadingImage("remove");e.formErrors(b)}});e.find(".cancel_button").click(function(){hideFullAssignmentForm(true)});e.find("select.grading_type").change(function(){e.find(".edit_letter_grades_link").showIf(a(this).val()=="letter_grade")});e.find("#auto_peer_reviews,#manual_peer_reviews").change(function(){e.find(".auto_peer_reviews").showIf(a("#auto_peer_reviews").attr("checked"))}).change();a(".rubric .long_description_link").click(function(b){b.preventDefault();
if(!a(this).parents(".rubric").hasClass("editing")){b=a(this).parents(".criterion").getTemplateData({textValues:["long_description","description"]});var d=a(this).parents(".criterion").hasClass("learning_outcome_criterion"),c=a("#rubric_long_description_dialog");c.fillTemplateData({data:b,htmlValues:d?["long_description"]:[]});c.find(".editing").hide();c.find(".displaying").show();c.dialog("close").dialog({autoOpen:false,title:j.t("titles.criterion_long_description","Criterion Long Description"),
width:400}).dialog("open")}});a("#edit_external_tool_url, #assignment_external_tool_tag_attributes_url").click(function(b){b.preventDefault();INST.selectContentDialog({select_button_text:j.t("buttons.select_url","Select"),no_name_input:true,submit:function(d){a("#assignment_external_tool_tag_attributes_url").val(d["item[url]"]);a("#assignment_external_tool_tag_attributes_new_tab").val(d["item[new_tab]"])}});a("#external_tool_create_url").val(a("#assignment_external_tool_tag_attributes_url").val())});
e.find(":input").keycodes("esc",function(b){b.preventDefault();a(this).parents("form").find(".cancel_button").click()});var h=e.find("#assignment_assignment_group_id");attachAddAssignmentGroup(h);if(editIfNoContent){h=a.trim(a("#full_assignment").find(".description").text());if(!h||h==""||h=="No Content")setTimeout(g,500)}a("#assignment_group_assignment").change(function(){a("#assignment_group_category").showIf(a(this).attr("checked"));a(this).attr("checked")||a("#assignment_group_category").val("")}).change();
a("#assignment_turnitin_enabled").change(function(){a("#assignment_turnitin_settings").showIf(a(this).attr("checked"))}).change();a("#assignment_peer_reviews").change(function(){a("#assignment_peer_reviews_options").showIf(a(this).attr("checked"));a(this).attr("checked")||a("#assignment_peer_reviews_options :text").val("")}).change();a.scrollSidebar();a("#assignment_group_category_select").change(function(){var b=a(this);a(this).val()=="new"&&addGroupCategory&&addGroupCategory(function(d){d=d[0].group_category;
var c=a(document.createElement("option"));c.text(d.name).val(d.id);b.find("option:last").before(c);b.val(d.id)})});a("#assignment_online_upload").change(function(){a("#restrict_file_extensions_options").showIf(a(this).attr("checked"))}).change();a("#assignment_restrict_file_extensions").change(function(){var b=a("#allowed_extensions_options");if(a(this).attr("checked"))b.show();else{b.hide();a("#assignment_allowed_extensions").val("")}}).change();setTimeout(function(){if(location.hash=="#add_rubric")a(".add_rubric_link:visible:first").click();
else if(location.hash=="#edit_rubric"){var b=a(".edit_rubric_link:visible:first");a("html,body").scrollTo(b.closest(".rubric"));b.click()}else if(a("#full_assignment_holder").hasClass("editing")){a(".edit_full_assignment_link:first").click();a("#full_assignment_holder .more_options_link:first").click()}},500)})});
I18n.scoped("grading_standards",function(j){$(document).ready(function(){$(".add_standard_link").click(function(a){a.preventDefault();a=$("#grading_standard_blank").clone(true).attr("id","grading_standard_new");$("#standards").append(a.show());a.find(".edit_grading_standard_link").click()});$(".edit_letter_grades_link").click(function(a){a.preventDefault();$("#edit_letter_grades_form").dialog("close").dialog({title:j.t("titles.grading_scheme_info","View/Edit Grading Scheme"),autoOpen:false,width:600,
height:310}).dialog("open")});$(".grading_standard .delete_grading_standard_link").click(function(a){a.preventDefault();a=$(this).parents(".grading_standard");var f=a.find(".update_grading_standard_url").attr("href");a.confirmDelete({url:f,message:j.t("confirm.delete_grading_scheme","Are you sure you want to delete this grading scheme?"),success:function(){$(this).slideUp(function(){$(this).remove()})},error:function(){$.flashError(j.t("errors.cannot_delete_grading_scheme","There was a problem deleting this grading scheme"))}})});
$(".grading_standard .remove_grading_standard_link").click(function(a){function f(){$("#edit_assignment_form .grading_standard_id").val("");$("#assignment_grading_type").val("points").change();$("#course_grading_standard_enabled").attr("checked",false).change();$("#course_form .grading_scheme_set").text(j.t("grading_scheme_not_set","Not Set"));g.addClass("editing");g.find(".update_grading_standard_url").attr("href",$("#update_grading_standard_url").attr("href"));var h={title:"",id:null,data:$.parseJSON($("#default_grading_standard_data").val())};
g.fillTemplateData({data:h,id:"grading_standard_blank",avoid:".find_grading_standard",hrefValues:["id"]}).find(".edit_grading_standard_link").removeClass("read_only");g.triggerHandler("grading_standard_updated",h);$("#edit_letter_grades_form").dialog("close");g.undim()}a.preventDefault();if(!confirm(j.t("confirm.unlink_grading_scheme","Are you sure you want to unlink this grading scheme?")))return false;var g=$(this).parents(".grading_standard");g.dim();a={"assignment[grading_standard_id]":"","assignment[grading_type]":"points"};
var e=$("#edit_assignment_form").attr("action");if($("#update_course_url").length){a={"course[grading_standard_id]":""};e=$("#update_course_url").attr("href")}else if(e&&e.match(/assignments$/))e=null;e?$.ajaxJSON(e,"PUT",a,f,function(){$.flashError(j.t("errors.cannot_remove_grading_scheme","There was a problem removing this grading scheme.  Please reload the page and try again."))}):f()});$(".grading_standard .edit_grading_standard_link").click(function(a){a.preventDefault();var f=$(this).parents(".grading_standard");
f.addClass("editing");$(this).hasClass("read_only")&&f.attr("id","grading_standard_blank");f.find(".grading_standard_row").each(function(){var g=$(this).getTemplateData({textValues:["min_score","name"]});$(this).find(".standard_value").val(g.min_score).end().find(".standard_name").val(g.name)});$("#standards").ifExists(function(){$("html,body").scrollTo(f)});f.find(":text:first").blur().focus().select()});$(".grading_standard .grading_standard_brief").find(".collapse_data_link,.expand_data_link").click(function(a){a.preventDefault();
a=$(this).parents(".grading_standard_brief");a.find(".collapse_data_link,.expand_data_link").toggle();a.find(".details").slideToggle()});$(".grading_standard_select").live("click",function(a){a.preventDefault();a=$(this).getTemplateData({textValues:["id"]}).id;$(".grading_standard .grading_standards_select .grading_standard_select").removeClass("selected_side_tab");$(this).addClass("selected_side_tab");$(".grading_standard .grading_standards .grading_standard_brief").hide();$("#grading_standard_brief_"+
a).show()});$(".grading_standard").find(".find_grading_standard_link,.cancel_find_grading_standard_link").click(function(a){a.preventDefault();$(this).parents(".grading_standard").find(".display_grading_standard,.find_grading_standard").toggle();var f=$(this).parents(".grading_standard").find(".find_grading_standard:visible");if(f.length>0&&!f.hasClass("loaded")){f.find(".loading_message").text(j.t("status.loading_grading_standards","Loading Grading Standards..."));a=f.find(".grading_standards_url").attr("href");
$.ajaxJSON(a,"GET",{},function(g){if(g.length===0)f.find(".loading_message").text(j.t("no_grading_standards","No grading standards found"));else{f.find(".loading_message").remove();for(var e in g){var h=g[e].grading_standard;h.user_name=h.display_name;var b=f.find(".grading_standards_select .grading_standard_select.blank:first").clone(true);b.fillTemplateData({data:h}).data("context_code",h.context_code).removeClass("blank");f.find(".grading_standards_select").append(b.show());b=f.find(".grading_standard_brief.blank:first").clone(true);
b.fillTemplateData({data:h,id:"grading_standard_brief_"+h.id}).data("context_code",h.context_code);b.removeClass("blank");for(var d=0;d<h.data.length;d++){var c=h.data[d];c={name:c[0],value:d==0?100:"< "+h.data[d-1][1]*100,next_value:c[1]*100};var i=b.find(".details_row.blank:first").clone(true);i.removeClass("blank");i.fillTemplateData({data:c});b.find(".details > table").append(i.show())}f.find(".grading_standards").append(b)}f.find(".grading_standards_select .grading_standard_select:visible:first a:first").click()}f.addClass("loaded");
f.find(".grading_standards_holder").slideDown()},function(){f.find(".loading_message").text(j.t("errors.cannot_load_grading_standards","Loading Grading Standards Failed.  Please Try Again"))})}});$(".grading_standard .grading_standard_brief .select_grading_standard_link").click(function(a){a.preventDefault();a=$(this).parents(".grading_standard_brief").getTemplateData({textValues:["id","title"],dataValues:["context_code"]});var f=a.id,g=a.title,e=[];$(this).parents(".grading_standard_brief").find(".details_row:not(.blank)").each(function(){var h=
$(this).find(".name").text(),b=parseFloat($(this).find(".next_value").text())/100;if(isNaN(b))b="";e.push([h,b])});$(this).parents(".grading_standard").triggerHandler("grading_standard_updated",{id:f,data:e,title:g});f=$("#edit_letter_grades_form").data().context_code;$(this).parents(".grading_standard").find(".edit_grading_standard_link").toggleClass("read_only",f!=a.context_code);$(this).parents(".find_grading_standard").find(".cancel_find_grading_standard_link").click()});$(".grading_standard .cancel_button").click(function(){$(this).parents(".grading_standard").removeClass("editing").find(".insert_grading_standard").hide();
var a=$(this).parents(".grading_standard");a.find(".to_add").remove();a.find(".to_delete").removeClass("to_delete").show();a.attr("id")=="grading_standard_new"&&a.remove()});$(".grading_standard").bind("grading_standard_updated",function(a,f){var g=$(this);g.addClass("editing");g.find(".update_grading_standard_url").attr("href",$("#update_grading_standard_url").attr("href"));g.fillTemplateData({data:f,id:"grading_standard_"+(f.id||"blank"),avoid:".find_grading_standard",hrefValues:["id"]}).fillFormData(f,
{object_name:"grading_standard"});var e=g.find(".insert_grading_standard:first").clone(true),h=g.find(".grading_standard_row:first").clone(true).removeClass("blank"),b=g.find(".grading_standard_data");b.empty();b.append(e.clone(true).show());for(var d in f.data){var c=h.clone(true),i=f.data[d];c.removeClass("to_delete").removeClass("to_add");c.find(".standard_name").val(i[0]).attr("name","grading_standard[standard_data][scheme_"+d+"][name]").end().find(".standard_value").val(i[1]*100).attr("name",
"grading_standard[standard_data][scheme_"+d+"][value]");b.append(c.show());b.append(e.clone(true).show())}b.find(":text:first").blur();b.append(h.hide());b.append(e.hide());g.find(".grading_standard_row").each(function(){$(this).find(".name").text($(this).find(".standard_name").val()).end().find(".min_score").text($(this).find(".standard_value").val()).end().find(".max_score").text($(this).find(".edit_max_score").text())});g.removeClass("editing");g.find(".insert_grading_standard").hide();if(f.id){g.find(".remove_grading_standard_link").removeClass("read_only");
g={"assignment[grading_standard_id]":f.id,"assignment[grading_type]":"letter_grade"};e=$("#edit_assignment_form").attr("action");$("#edit_assignment_form .grading_standard_id").val(f.id);if($("#update_course_url").length){g={"course[grading_standard_id]":f.id};e=$("#update_course_url").attr("href")}else if(e&&e.match(/assignments$/))e=null;e&&$.ajaxJSON(e,"PUT",g,function(k){$("#course_form .grading_scheme_set").text(k&&k.course&&k.course.grading_standard_title||j.t("grading_scheme_currently_set",
"Currently Set"))},function(){})}else g.find(".remove_grading_standard_link").addClass("read_only")});$(".grading_standard .save_button").click(function(){var a=$(this).parents(".grading_standard"),f=$("#edit_letter_grades_form .create_grading_standard_url,#create_grading_standard_url").attr("href"),g="POST";if(a.attr("id")!="grading_standard_blank"&&a.attr("id")!="grading_standard_new"){f=$(this).parents(".grading_standard").find(".update_grading_standard_url").attr("href");g="PUT"}var e=a.find(".standard_title,.grading_standard_row:visible").getFormData();
a.find("button").attr("disabled",true).filter(".save_button").text(j.t("status.saving","Saving..."));$.ajaxJSON(f,g,e,function(h){h=h.grading_standard;a.find("button").attr("disabled",false).filter(".save_button").text(j.t("buttons.save","Save"));a.triggerHandler("grading_standard_updated",h)},function(){a.find("button").attr("disabled",false).filter(".save_button").text(j.t("errors.save_failed","Save Failed"))})});$(".grading_standard thead").mouseover(function(){if($(this).parents(".grading_standard").hasClass("editing")){$(this).parents(".grading_standard").find(".insert_grading_standard").hide();
$(this).parents(".grading_standard").find(".insert_grading_standard:first").show()}});$(".grading_standard .grading_standard_row").mouseover(function(a){if($(this).parents(".grading_standard").hasClass("editing")){$(this).parents(".grading_standard").find(".insert_grading_standard").hide();a=a.pageY;var f=$(this).offset(),g=$(this).height();a>f.top+g/2?$(this).next(".insert_grading_standard").show():$(this).prev(".insert_grading_standard").show()}});$(".grading_standard .insert_grading_standard_link").click(function(a){a.preventDefault();
if(!($(this).parents(".grading_standard").find(".grading_standard_row").length>40)){a=$(this).parents(".grading_standard");for(var f=a.find(".grading_standard_row:first").clone(true).removeClass("blank"),g=a.find(".insert_grading_standard:first").clone(true),e=null;!e||$(".standard_name[name='grading_standard[standard_data][scheme_"+e+"][name]']").length>0;)e=Math.round(Math.random()*1E4);f.find(".standard_name").val("-").attr("name","grading_standard[standard_data][scheme_"+e+"][name]");f.find(".standard_value").attr("name",
"grading_standard[standard_data][scheme_"+e+"][value]");$(this).parents(".insert_grading_standard").after(f.show());f.after(g);a.find(":text:first").blur();f.find(":text:first").focus().select();f.addClass("to_add")}});$(".grading_standard .delete_row_link").click(function(a){a.preventDefault();if(!($(this).parents(".grading_standard").find(".grading_standard_row:visible").length<2)){a=$(this).parents(".grading_standard_row");a.prev(".insert_grading_standard").length>0?a.prev(".insert_grading_standard").remove():
a.next(".insert_grading_standard").remove();a.fadeOut(function(){$(this).addClass("to_delete");$(".grading_standard input[type='text']:first").triggerHandler("change")})}});$(".grading_standard input[type='text']").bind("blur change",function(){var a=$(this).parents(".grading_standard"),f=parseFloat($(this).parents(".grading_standard_row").find(".standard_value").val());f=Math.round(f*10)/10;$(this).parents(".grading_standard_row").find(".standard_value").val(f);if(isNaN(f))f=null;var g=f||100;f=
f||0;var e=a.find(".grading_standard_row:not(.blank,.to_delete)");for(a=e.index($(this).parents(".grading_standard_row"))+1;a<e.length;a++){var h=e.eq(a),b=parseFloat(h.find(".standard_value").val());if(isNaN(b))b=null;if(a==e.length-1)b=0;else if(!b||b>g-0.1)b=parseInt(g)-1;h.find(".standard_value").val(b);g=b}for(a=e.index($(this).parents(".grading_standard_row"))-1;a>=0;a--){h=e.eq(a);b=parseFloat(h.find(".standard_value").val());if(isNaN(b))b=null;if(a==e.length-1)b=0;else if(!b||b<f+0.1)b=parseInt(f)+
1;f=b;h.find(".standard_value").val(b)}g=100;e.each(function(d){var c=parseFloat($(this).find(".standard_value").val());d=e.index(this);if(isNaN(c))c=null;if(d==e.length-1)c=0;else if(!c||c>g-0.1)c=parseInt(g)-1;$(this).find(".standard_value").val(c);g=c});f=0;for(a=e.length-1;a>=0;a--){h=e.eq(a);b=parseFloat(h.find(".standard_value").val());if(isNaN(b))b=null;if(a==e.length-1)b=0;else if(!b||b<f+0.1)b=parseInt(f)+1;f=b;h.find(".standard_value").val(b)}e.each(function(d){d=e.eq(d-1);var c=0;if(d&&
d.length>0){c=parseFloat(d.find(".standard_value").val());if(isNaN(c))c=0;$(this).find(".edit_max_score").text("< "+c)}});e.filter(":first").find(".edit_max_score").text(100)})})});
$.extend(true,I18n=I18n||{},{translations:{es:{grading_standards:{grading_scheme_not_set:"No Establecido",buttons:{save:"Guardar"},no_grading_standards:"No se encontraron estandares de calificaci\u00f3n",confirm:{delete_grading_scheme:"\u00bfSeguro que quiere borrar este esquema de calificaci\u00f3n?",unlink_grading_scheme:"\u00bfSeguro que quiere desenlazar este esquema de calificaci\u00f3n?"},errors:{save_failed:"Guardado Fall\u00f3",cannot_delete_grading_scheme:"Hubo un problema borrando este esquema de calificaci\u00f3n",
cannot_remove_grading_scheme:"Hubo un problema removiendo este esquema de calificaci\u00f3n. Por favor recargue la p\u00e1gina e intente de nuevo.",cannot_load_grading_standards:"Fall\u00f3 la Carga de Estandares de Calificaci\u00f3n. Intente de Nuevo."},titles:{grading_scheme_info:"Ver/Editar Esquema de Calificaci\u00f3n"},grading_scheme_currently_set:"Establecido Actualmente",status:{saving:"Guardando...",loading_grading_standards:"Cargando los Estandares de Calificaci\u00f3n..."}},full_assignment:{messages:{need_online_submission_type:"Escoja al menos un tipo de env\u00edo en l\u00ednea",
unlock_before_due:"La tarea deber\u00eda ser desbloqueada antes de su fecha l\u00edmite",lock_after_due:"La tarea no deber\u00eda ser bloqueada hasta despu\u00e9s de la fecha l\u00edmite"},titles:{criterion_long_description:"Descripci\u00f3n Detallada del Criterio"},links:{hide_grading_options:"esconder las opciones de calificaci\u00f3n",more_grading_options:"m\u00e1s opciones de calificaci\u00f3n"}}}}});