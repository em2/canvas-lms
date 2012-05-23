define("translations/quizzes.index",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{em2:{quizzes:{index:{buttons:{publishing_quizzes:"Publishing Assessments..."},confirms:{delete_quiz:"Are you sure you want to delete this assessment?"},default_title:"New Assessment"}}},es:{quizzes:{index:{buttons:{publishing_quizzes:"Publicando Evaluaciones..."},confirms:{delete_quiz:"¿Seguro que quiere borrar esa evaluación?"},default_title:"Evaluación Sin Nombre"}}}}})}),define("translations/content_locks",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{em2:{content_locks:{messages:{quiz_locked_at:"This assessment was locked %{at}.",quiz_locked_module:"This assessment is part of the module *%{module}* and hasn't been unlocked yet.",quiz_locked_no_reason:"This assessment is locked.  No other reason has been provided.",quiz_locked_until:"This assessment is locked until %{date}."}}},es:{content_locks:{buttons:{ok_thanks:"Ok, Gracias"},messages:{assignment_locked_at:"Esta tarea fue bloqueada en %{at}.",assignment_locked_module:"Esta tarea es parte del módulo *%{module}* y aún no ha sido desbloqueada.",assignment_locked_no_reason:"Esta tarea esta bloqueada. No se ha provisto otra razón.",assignment_locked_until:"Esta tarea está bloqueada hasta %{date}.",content_locked_at:"Este contenido fue bloqueado en %{at}.",content_locked_module:"Este contenido es parte del módulo *%{module}* y aún no ha sido desbloqueado.",content_locked_no_reason:"Este contenido está bloqueado. No se ha provisto otra razón.",content_locked_until:"Este contenido está bloqueado hasta %{date}.",file_locked_at:"Este archivo fue bloqueado en %{at}.",file_locked_module:"Este archivo es parte del módulo *%{module}* y no ha sido desbloqueado aún.",file_locked_no_reason:"Este archivo está bloqueado. No se ha provisto otra razón.",file_locked_until:"Este archivo ha sido bloqueado hasta %{date}.",page_locked_at:"Esta página fue bloqueado en %{at}.",page_locked_module:"Esta página es parte del módulo *%{module}* y aún no ha sido desbloqueado.",page_locked_no_reason:"Esta página está bloqueada. No se ha provisto otra razón.",page_locked_until:"Esta página está bloqueada hasta %{date}.",quiz_locked_at:"Esta evaluación fue bloqueada en %{at}.",quiz_locked_module:"Esta evaluación es parte del módulo *%{module}* y aún no ha sido desbloqueado.",quiz_locked_no_reason:"Esta evaluación está bloqueada. No se ha provisto otra razón.",quiz_locked_until:"Esta evaluación está bloqueada hasta %{date}.",topic_locked_at:"Este tema fue bloqueado en %{at}.",topic_locked_module:"Este tema es parte del módulo *%{module}* y aún no ha sido desbloqueado.",topic_locked_no_reason:"Este tema está bloqueado. No se ha provisto otra razón.",topic_locked_until:"Este tema está bloqueado hasta %{date}.",visit_modules_page_for_details:"Visite la página de los módulos para información de cómo desbloquear este contenido."},titles:{content_is_locked:"El Contenido está Bloqueado"}}}}})}),define("content_locks",["INST","i18n!content_locks","jquery","str/htmlEscape","jquery.instructure_date_and_time","jquery.instructure_jquery_patches"],function(a,b,c,d){a.lockExplanation=function(a,e){if(a.lock_at)switch(e){case"quiz":return b.t("messages.quiz_locked_at","This quiz was locked %{at}.",{at:c.parseFromISO(a.lock_at).datetime_formatted});case"assignment":return b.t("messages.assignment_locked_at","This assignment was locked %{at}.",{at:c.parseFromISO(a.lock_at).datetime_formatted});case"topic":return b.t("messages.topic_locked_at","This topic was locked %{at}.",{at:c.parseFromISO(a.lock_at).datetime_formatted});case"file":return b.t("messages.file_locked_at","This file was locked %{at}.",{at:c.parseFromISO(a.lock_at).datetime_formatted});case"page":return b.t("messages.page_locked_at","This page was locked %{at}.",{at:c.parseFromISO(a.lock_at).datetime_formatted});default:return b.t("messages.content_locked_at","This content was locked %{at}.",{at:c.parseFromISO(a.lock_at).datetime_formatted})}else if(a.unlock_at)switch(e){case"quiz":return b.t("messages.quiz_locked_until","This quiz is locked until %{date}.",{date:c.parseFromISO(a.unlock_at).datetime_formatted});case"assignment":return b.t("messages.assignment_locked_until","This assignment is locked until %{date}.",{date:c.parseFromISO(a.unlock_at).datetime_formatted});case"topic":return b.t("messages.topic_locked_until","This topic is locked until %{date}.",{date:c.parseFromISO(a.unlock_at).datetime_formatted});case"file":return b.t("messages.file_locked_until","This file is locked until %{date}.",{date:c.parseFromISO(a.unlock_at).datetime_formatted});case"page":return b.t("messages.page_locked_until","This page is locked until %{date}.",{date:c.parseFromISO(a.unlock_at).datetime_formatted});default:return b.t("messages.content_locked_until","This content is locked until %{date}.",{date:c.parseFromISO(a.unlock_at).datetime_formatted})}else if(a.context_module){var f="";switch(e){case"quiz":f+=b.t("messages.quiz_locked_module","This quiz is part of the module *%{module}* and hasn't been unlocked yet.",{module:d(a.context_module.name),wrapper:"<b>$1</b>"});break;case"assignment":f+=b.t("messages.assignment_locked_module","This assignment is part of the module *%{module}* and hasn't been unlocked yet.",{module:d(a.context_module.name),wrapper:"<b>$1</b>"});break;case"topic":f+=b.t("messages.topic_locked_module","This topic is part of the module *%{module}* and hasn't been unlocked yet.",{module:d(a.context_module.name),wrapper:"<b>$1</b>"});break;case"file":f+=b.t("messages.file_locked_module","This file is part of the module *%{module}* and hasn't been unlocked yet.",{module:d(a.context_module.name),wrapper:"<b>$1</b>"});break;case"page":f+=b.t("messages.page_locked_module","This page is part of the module *%{module}* and hasn't been unlocked yet.",{module:d(a.context_module.name),wrapper:"<b>$1</b>"});break;default:f+=b.t("messages.content_locked_module","This content is part of the module *%{module}* and hasn't been unlocked yet.",{module:d(a.context_module.name),wrapper:"<b>$1</b>"})}if(c("#context_modules_url").length>0)return f+="<br/>",f+="<a href='"+c("#context_modules_url").attr("href")+"'>",f+=b.t("messages.visit_modules_page_for_details","Visit the modules page for information on how to unlock this content."),f+="</a>",f}else switch(e){case"quiz":return b.t("messages.quiz_locked_no_reason","This quiz is locked.  No other reason has been provided.");case"assignment":return b.t("messages.assignment_locked_no_reason","This assignment is locked.  No other reason has been provided.");case"topic":return b.t("messages.topic_locked_no_reason","This topic is locked.  No other reason has been provided.");case"file":return b.t("messages.file_locked_no_reason","This file is locked.  No other reason has been provided.");case"page":return b.t("messages.page_locked_no_reason","This page is locked.  No other reason has been provided.");default:return b.t("messages.content_locked_no_reason","This content is locked.  No other reason has been provided.")}},c(document).ready(function(){c(".content_lock_icon").live("click",function(e){if(c(this).data("lock_reason")){e.preventDefault();var f=c(this).data("lock_reason"),g=f.type,h=c("<div/>");h.html(a.lockExplanation(f,g));var i=c("#lock_reason_dialog");if(i.length===0){i=c("<div/>").attr("id","lock_reason_dialog"),c("body").append(i.hide());var j="<div class='lock_reason_content'></div><div class='button-container'><button type='button' class='button'>"+d(b.t("buttons.ok_thanks","Ok, Thanks"))+"</button></div>";i.append(j),i.find(".button-container .button").click(function(){i.dialog("close")})}i.find(".lock_reason_content").empty().append(h),i.dialog("close").dialog({autoOpen:!1,title:b.t("titles.content_is_locked","Content Is Locked")}).dialog("open")}})})}),define("quiz_index",["i18n!quizzes.index","jquery","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","jquery.templateData"],function(a,b){b(document).ready(function(){b(".delete_quiz_link").click(function(c){c.preventDefault(),b(this).parents(".quiz").confirmDelete({url:b(this).attr("href"),message:a.t("confirms.delete_quiz","Are you sure you want to delete this quiz?"),error:function(a){b(this).formErrors(a)}})}),b(".publish_multiple_quizzes_link").click(function(c){c.preventDefault();var d=b("#publish_multiple_quizzes_dialog"),e=d.find(".quiz_item.blank:first").clone(!0),f=d.find(".quiz_list").find(".quiz_item:not(.blank)").remove().end();b("#unpublished_quizzes .quiz").each(function(){var c=e.clone(!0),d=b(this).getTemplateData({textValues:["quiz_id","quiz_title"]});c.removeClass("blank"),c.find(".id").val(d.quiz_id).attr("id","quiz_checkbox_"+d.quiz_id).end().find(".title").text(d.quiz_title||a.t("default_title","Unnamed Quiz")).attr("for","quiz_checkbox_"+d.quiz_id),f.append(c.show())}),d.find("button").attr("disabled",!1),d.dialog("close").dialog({autoOpen:!1,width:400}).dialog("open")}),b("#publish_quizzes_form").submit(function(){b(this).find("button").attr("disabled",!0).filter(".submit_button").text(a.t("buttons.publishing_quizzes","Publishing Quizzes..."))}),b("#publish_multiple_quizzes_dialog .cancel_button").click(function(){b("#publish_multiple_quizzes_dialog").dialog("close")});if(b("#quiz_locks_url").length>0){var c={},d=[];b("li.quiz").each(function(){d.push("quiz_"+b(this).attr("id").substring(13))}),c.assets=d.join(","),b.ajaxJSON(b("#quiz_locks_url").attr("href"),"GET",c,function(a){for(var c in a){var d=c,e=!!a[c];if(e){var f=b("#quiz_lock_icon").clone().removeAttr("id").toggle();a[c].type="quiz",f.data("lock_reason",a[c]),b("#summary_"+d).find(".quiz_title").prepend(f)}}},function(){})}})}),function(){require(["quiz_index","content_locks"])}.call(this),define("compiled/bundles/quizzes_index",function(){})