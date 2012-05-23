define("translations/quizzes.show",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{em2:{quizzes:{show:{confirms:{delete_quiz:"Are you sure you want to delete this assessment?",delete_quiz_submissions_warning:{one:"Warning: 1 student has already taken this assessment. If you delete it, any completed submissions will be deleted and no longer appear in the gradebook.",other:"Warning: %{count} students have already taken this assessment. If you delete it, any completed submissions will be deleted and no longer appear in the gradebook."}},have_not_taken_the_quiz:"Have NOT taken the assessment",have_taken_the_quiz:"Have taken the assessment"}}},es:{quizzes:{show:{confirms:{delete_quiz:"¿Seguro que quiere borrar esta evaluación?",delete_quiz_submissions_warning:{one:"Aviso: 1 estudiante ya ha tomado esta evaluación. Si lo borra, cualquier envío completo será borrado y no aparecerá en su libro de calificaciones.",other:"Aviso: %{count} estudiantes ya han tomado esta evaluación. Si lo borra, cualquier envíos completos serán borrados y no aparecerán en su libro de calificaciones."}},have_not_taken_the_quiz:"NO ha tomado la evaluación",have_taken_the_quiz:"Se ha tomado la evaluación"}}}}})}),define("translations/quizzes.rubric",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{quizzes:{rubric:{loading:"Cargando...",titles:{details:"Detalles de Rúbricas de la Tarea"}}}}}})}),define("translations/message_students",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{message_students:{buttons:{send_message:"Enviar Mensaje",send_message_failed:"Envío del Mensaje Falló, intente de nuevo",sending_message:"Enviando Mensaje..."},message_student:"Enviar Mensaje a Estudiantes para %{course_name}",send_message:"Enviar el Mensaje"}}}})}),define("quiz_rubric",["i18n!quizzes.rubric","jquery","jquery.instructure_jquery_patches"],function(a,b){b(document).ready(function(){b(".show_rubric_link").click(function(c){function g(){e=b("#rubrics.rubric_dialog"),e.dialog("close").dialog({title:a.t("titles.details","Assignment Rubric Details"),width:600,modal:!1,resizable:!0,autoOpen:!1}).dialog("open")}c.preventDefault();var d=b(this).attr("rel"),e=b("#rubrics.rubric_dialog");if(e.length)g();else{var f=b("<div/>");f.text(a.t("loading","Loading...")),b("body").append(f),f.dialog({width:400,height:200}),b.get(d,function(a){b("body").append(a),f.dialog("close"),f.remove(),g()})}})})}),define("message_students",["i18n!message_students","jquery","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins"],function(a,b){var c=b("#message_students_dialog"),d={};return window.messageStudents=function(e){d=e,c.find(".message_types").empty();for(var f in e.options){var g=b("<option/>"),h=e.options[f];g.val(f).text(h.text),c.find(".message_types").append(g)}var i=e.title,j=c.find("ul li.blank:first"),k=c.find("ul"),l={};c.find("ul li:not(.blank)").remove();for(var f in e.students){var m=j.clone(!0).removeClass("blank");m.find(".name").text(e.students[f].name),m.find(".score").text(e.students[f].score),m.data("id",e.students[f].id),m.user_data=e.students[f],k.append(m.show()),l[e.students[f].id]=m}k.show(),c.data("students_hash",l),c.find(".asset_title").text(i),c.find(".out_of").showIf(e.points_possible!=null),c.find(".send_button").text(a.t("send_message","Send Message")),c.find(".points_possible").text(e.points_possible),c.find("textarea").val(""),c.find("select")[0].selectedIndex=0,c.find("select").change(),c.dialog({width:600,modal:!0}).dialog("open").dialog("option","title",a.t("message_student","Message Students for %{course_name}",{course_name:i}))},b(document).ready(function(){c.find(".cutoff_score").bind("change blur keyup",function(){c.find("select").change()}),c.find(".cancel_button").click(function(){c.dialog("close")}),b("#message_assignment_recipients").formSubmit({processData:function(a){var c=[];return b(this).find(".student:visible").each(function(){c.push(b(this).data("id"))}),c.length==0?!1:(a.recipients=c.join(","),a)},beforeSubmit:function(c){b(this).find("button").attr("disabled",!0).filter(".send_button").text(a.t("buttons.sending_message","Sending Message..."))},success:function(c){b(this).find(".send_button").text("Message Sent!");var d=b(this);setTimeout(function(){d.find("button").attr("disabled",!1).filter(".send_button").text(a.t("buttons.send_message","Send Message")),b("#message_students_dialog").dialog("close")},2e3)},error:function(c){b(this).find("button").attr("disabled",!1).filter(".send_button").text(a.t("buttons.send_message_failed","Sending Message Failed, please try again"))}}),c.find("select").change(function(){var a=parseInt(b(this).val(),10)||0,e=d.options[a],f=c.data("students_hash"),g=parseFloat(c.find(".cutoff_score").val(),10);!g&&g!==0&&(g=null);var h=null,i=[];for(var a in f)i.push(f[a]);f&&(e&&e.callback?h=e.callback.call(window.messageStudents,g,i):d.callback&&(h=d.callback.call(window.messageStudents,e.text,g,i))),h=h||[],c.find(".cutoff_holder").showIf(e.cutoff),c.find(".student_list").toggleClass("show_score",e.cutoff||e.score),c.find("button").attr("disabled",h.length==0);var j={};for(var a in h)j[parseInt(h[a],10)||0]=!0;for(var a in f)f[a].showIf(j[a])})}),messageStudents}),define("quiz_show",["i18n!quizzes.show","jquery","jquery.instructure_date_and_time","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","message_students"],function(a,b){b(document).ready(function(){function c(){var a={};b(".student_list .student").each(function(c){var d={};d.id=b(this).attr("data-id"),d.name=b.trim(b(this).find(".name").text()),d.submitted=b(this).closest(".student_list").hasClass("submitted"),a[d.id]=d});var c=[];for(var d in a)c.push(a[d]);return c}b(".delete_quiz_link").click(function(d){d.preventDefault(),students=c(),submittedCount=b.grep(students,function(a){return a.submitted}).length;var e=a.t("confirms.delete_quiz","Are you sure you want to delete this quiz?");submittedCount<0&&(e+="\n\n"+a.t("confirms.delete_quiz_submissions_warning",{one:"Warning: 1 student has already taken this quiz. If you delete it, any completed submissions will be deleted and no longer appear in the gradebook.",other:"Warning: %{count} students have already taken this quiz. If you delete it, any completed submissions will be deleted and no longer appear in the gradebook."},{count:submittedCount})),b("nothing").confirmDelete({url:b(this).attr("href"),message:e,success:function(){window.location.href=b("#context_quizzes_url").attr("href")}})}),b(".quiz_details_link").click(function(a){a.preventDefault(),b("#quiz_details").slideToggle()}),b(".message_students_link").click(function(d){d.preventDefault(),students=c();var e=b("#quiz_title").text();window.messageStudents({options:[{text:a.t("have_taken_the_quiz","Have taken the quiz")},{text:a.t("have_not_taken_the_quiz","Have NOT taken the quiz")}],title:e,students:students,callback:function(c,d,e){return e=b.grep(e,function(b,d){var e=b.user_data;if(c==a.t("have_taken_the_quiz","Have taken the quiz"))return e.submitted;if(c==a.t("have_not_taken_the_quiz","Have NOT taken the quiz"))return!e.submitted}),b.map(e,function(a){return a.user_data.id})}})}),b.scrollSidebar(),b("#let_students_take_this_quiz_button").ifExists(function(a){var c=b("#unlock_for_how_long_dialog");a.click(function(){return c.dialog("open"),!1}),c.dialog({autoOpen:!1,modal:!0,resizable:!1,width:400,buttons:{Unlock:function(){var c=b(this).find(".datetime_suggest").text();a.closest("form").append(b(this).dialog("destroy")).find("#quiz_lock_at").val(c).end().submit()}}}).find(".datetime_field").datetime_field()})})}),function(){require(["quiz_show","quiz_rubric","message_students"])}.call(this),define("compiled/bundles/quiz_show",function(){})