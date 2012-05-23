define("translations/topics",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{topics:{add_new_announcement:"Agregar un Aviso Nuevo",add_new_entry:"Agregar una Nueva Entrada",add_new_topic:"Agregar un Tema Nuevo",adding:"Agregando...",confirms:{delete_announcement:"¿Seguro que quiere borrar este anuncio?",delete_entry:"¿Seguro que quiere borrar esta entrada?",delete_topic:"¿Seguro que quiere borrar este tema?"},default_topic_title:"Título del Tema",default_user_name:"Nombre de Usuario",errors:{enter_a_message:"Incluya un mensaje",invalid_date_time:"Seleccione una fecha válida"},expand:"Expandir",loading:"Cargando...",no_replies:"Sin Respuestas",no_title:"Sin Título",number_of_replies:{one:"1 Respuesta",other:"%{count} Respuestas",zero:"Sin Respuestas"},reordering:"Reordenando...",titles:{assignment_rubric_details:"Detalles de la Rúbrica de la Tarea",lock_this_topic:"Bloquear este Tema",reorder_discussions:"Reordenar las Discusiones",unlock_this_topic:"Desbloquear este Tema"},update_announcment:"Actualizar el Aviso",update_entry:"Actualizar la Contribución",update_topic:"Actualizar el Tema",updating:"Actualizando..."}}}})}),define("topic",["i18n!topics","jquery","wikiSidebar","jquery.ajaxJSON","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.keycodes","jquery.loadingImg","jquery.templateData","compiled/tinymce","tinymce.editor_box","vendor/jquery.scrollTo"],function(a,b,c){function d(d,e){b("#add_entry_bottom").hide();var g=b("#add_entry_form").clone(!0);d.attr("id")=="entry_id"&&d.attr("id","entry_new");var h=d.attr("id");g.addClass("add_entry_form_new").attr("id","add_entry_form_"+h).find(".entry_content").addClass("entry_content_new").attr("id","entry_content_"+h);var i=d.getTemplateData({textValues:["title","parent_id","attachment_name"],htmlValues:["message"]});i.message=d.find(".content > .message_html").val(),e&&e.message&&(i.message=e.message);var j=a.t("update_entry","Update Entry");g.attr("method","PUT").attr("action",d.find(".edit_entry_url").attr("href")),g.find(".entry_remove_attachment").val("0"),g.find(".add_attachment").show().end().find(".no_attachment").showIf(!i.attachment_name).end().find(".current_attachment").showIf(i.attachment_name).end().find(".upload_attachment").hide().end().find(".attachment_name").text(i.attachment_name),d.attr("id")=="entry_new"&&(j=a.t("add_new_entry","Add New Entry"),d.find(".user_name").text(CURRENT_USER_NAME_FOR_TOPICS).attr("href",function(a,c){return b.replaceTags(c,"user_id",b("#identity .user_id").text())}),g.attr("method","POST").attr("action",b("#topic_urls .add_entry_url").attr("href"))),g.fillFormData(i,{object_name:"discussion_entry"}),d.children(".content").show().children(".subcontent").hide().end().find(".message").hide().end().append(g.show()).end().children(".header").find(".post_date").hide().end().find(".link_box").hide().end().find(".title").hide().end().prepend("<div class='add_message title' style='float: left; padding-right: 20px;'>"+j+"</div>").show(),g.find(".entry_content_new").editorBox().editorBox("set_code",i.message),c&&(c.attachToEditor(g.find(".entry_content_new")),b("#sidebar_content").hide(),c.show()),g.find("button[type='submit']").val(j),setTimeout(function(){f("entry_content_"+h)},500),l(d),b("html,body").scrollTo(g)}function e(a){b("#"+a).find(".cancel_button").click()}function f(a){if(!b("#"+a).editorBox("focus")){setTimeout(function(){f(a)},500);return}}function g(){var a=b(".add_entry_form_new"),d=a.parents(".discussion_entry");a.find(".entry_content_new").editorBox("destroy"),a.hide(),c&&(b("#sidebar_content").show(),c.hide()),d.children(".header").show().find(".post_date").show().end().find(".add_message").remove().end().find(".title").show().end().find(".link_box").show().end().end().children(".content").show().children(".subcontent").show().end().find(".message").show().end(),a.appendTo(b("body"))}function h(a){j();var b=a.parents(".discussion_subtopic:first");a.next().remove(),a.remove(),m(b)}function i(){var a=b(".discussion_topic.selected,.discussion_entry.selected,.communication_sub_message.selected");if(a.length===0)a=b(".discussion_topic:first").addClass("selected");else{var c=b(".discussion_topic,.discussion_entry,.communication_sub_message"),d=b(".discussion_topic,.discussion_entry,.communication_sub_message").index(a.get(0)),e=null;for(var f=d+1;f<c.length;f++){var g=b(c.get(f));if(g.css("display")!="none"){e=g;break}}e&&(a=e)}l(a,!0)}function j(){var a=b(".discussion_topic.selected,.discussion_entry.selected,.communication_sub_message.selected");if(a.length===0)a=b(".discussion_topic:first").addClass("selected");else{var c=b(".discussion_topic,.discussion_entry,.communication_sub_message"),d=b(".discussion_topic,.discussion_entry,.communication_sub_message").index(a.get(0)),e=null;for(var f=d-1;f>=0;f--){var g=b(c.get(f));if(g.css("display")!="none"){e=g;break}}e&&(a=e)}l(a,!0)}function k(){var a=b(".discussion_topic.selected,.discussion_entry.selected,.communication_sub_message.selected");a.removeClass("selected")}function l(a,c){var d=b(".discussion_topic.selected,.discussion_entry.selected,.communication_sub_message.selected");k(),a.length===0?a=b(".discussion_topic:first").addClass("selected"):a.addClass("selected"),c&&(b("html,body").scrollTo(a),a.mouseover(),a.find(":tabbable:visible:first").focus())}function m(c){var d=b("#entry_list").children(".discussion_entry");d.removeClass("discussion_start").removeClass("discussion_end"),d.length===0?b(".discussion_topic").addClass("discussion_end"):b(".discussion_topic").removeClass("discussion_end"),d.filter(":last").addClass("discussion_end"),b(".message_count").text(messageCount),b(".message_count_text").text(messageCount==1?"post":"posts"),b(".total_message_count").text(totalMessageCount);if(c){d=c.children(".discussion_entry"),d.removeClass("discussion_start").removeClass("discussion_end"),d.filter(":first").addClass("discussion_start"),d.filter(":last").addClass("discussion_end");var e=c.prev(".discussion_entry");e.hasClass("has_loaded")&&e.fillTemplateData({data:{replies:a.t("number_of_replies",{zero:"No Replies",one:"1 Reply",other:"%{count} Replies"},{count:c.children(".discussion_entry").length})}})}}b(document).ready(function(){setTimeout(function(){b(".communication_sub_message.blank").each(function(){b(this).find(".user_name").text("")})},500);var c=[];b.ajaxJSON(b(".discussion_entry_permissions_url").attr("href"),"GET",{},function(a){for(var b in a){var d=a[b].discussion_entry;c.push({id:"entry_"+d.id,permissions:d.permissions||{}})}setTimeout(e,500)},function(){});var e=function(){for(var a=0;a<10;a++){var d=c.shift();if(d){var f=d.permissions,g=d.id;if(f.update||f["delete"]||f.reply){var h=b("#"+g);f.update&&h.find(".header .edit_entry_link").removeClass("disabled_link"),f["delete"]&&h.find(".header .delete_entry_link").removeClass("disabled_link"),f.reply&&(h.find(".add_entry_link").removeClass("disabled_link"),h.find(".reply_message").show())}}}c.length>0&&setTimeout(e,500)};b(".show_rubric_link").click(function(c){function d(){f=b("#rubrics.rubric_dialog"),f.dialog("close").dialog({title:a.t("titles.assignment_rubric_details","Assignment Rubric Details"),width:600,modal:!1,resizable:!0,autoOpen:!1}).dialog("open")}c.preventDefault();var e=b(this).attr("rel"),f=b("#rubrics.rubric_dialog");if(f.length)d();else{var g=b("<div/>");g.text(a.t("loading","Loading...")),b("body").append(g),g.dialog({width:400,height:200}),b.get(e,function(a){b("body").append(a),g.dialog("close"),g.remove(),d()})}}),b(".add_topic_rubric_link").click(function(c){c.preventDefault();var d=b("#rubrics.rubric_dialog");d.dialog("close").dialog({title:a.t("titles.assignment_rubric_details","Assignment Rubric Details"),width:600,modal:!1,resizable:!0,autoOpen:!1}).dialog("open"),b(".add_rubric_link").click()}),b("#add_entry_form .add_attachment_link").click(function(a){a.preventDefault();var c=b(this).parents("form");c.find(".no_attachment").slideUp().addClass("current"),c.find(".current_attachment").hide().removeClass("current"),c.find(".upload_attachment").slideDown()}),b("#add_entry_form .delete_attachment_link").click(function(a){a.preventDefault();var c=b(this).parents("form");c.find(".current_attachment").slideUp().removeClass("current"),c.find(".no_attachment").slideDown().addClass("current"),c.find(".upload_attachment").hide(),c.find(".entry_remove_attachment").val("1")}),b("#add_entry_form .replace_attachment_link").click(function(a){a.preventDefault();var c=b(this).parents("form");c.find(".upload_attachment").slideDown(),c.find(".no_attachment").hide().removeClass("current"),c.find(".current_attachment").slideUp().addClass("current")}),b("#add_entry_form .cancel_attachment_link").click(function(a){a.preventDefault();var c=b(this).parents("form");c.find(".no_attachment.current").slideDown(),c.find(".upload_attachment").slideUp(),c.find(".current_attachment.current").slideDown(),c.find(".attachment_uploaded_data").val(""),c.find(".entry_remove_attachment").val("0")}),b("#add_entry_form").formSubmit({fileUpload:function(a){var c=a["attachment[uploaded_data]"];return c&&b(this).attr("action",b(this).attr("action")+".text"),c},object_name:"discussion_entry",processData:function(){var a=b(this).getFormData({object_name:"discussion_entry"});return a.message=b(this).find(".entry_content_new").editorBox("get_code"),a["discussion_entry[message]"]=a.message,a},beforeSubmit:function(c){var d=b(this).parents(".discussion_entry"),e=a.t("updating","Updating...");d.attr("id")=="entry_new"&&(e=a.t("adding","Adding..."),d.attr("id","entry_id")),d.next().attr("id","replies_entry_id"),c.post_date=e,d.fillTemplateData({data:c,except:["message"],avoid:".subcontent"}),g();var f=d.parents(".discussion_subtopic");return m(f),d.find(".content").loadingImage(),d},success:function(c,d){var e=c.discussion_entry;e.user_name=e.user_name?e.user_name:a.t("default_user_name","User Name"),delete e.user;var f=b.parseFromISO(e.created_at,"event");e.post_date=f.datetime_formatted,d.attr("id")=="entry_id"&&(totalMessageCount++,d.parents(".discussion_subtopic").length===0&&messageCount++,m());if(e.attachment){e.attachment_name=e.attachment.display_name;var g=b.replaceTags(d.find(".entry_attachment_url").attr("href"),"attachment_id",e.attachment.id);d.find(".attachment_name").attr("href",g)}d.find(".attachment_data").showIf(e.attachment),d.find("input.parent_id").val(e.id),d.find("span.parent_id").text(e.id),d.find(".content > .message_html").val(e.message),d.fillTemplateData({id:"entry_"+e.id,data:e,htmlValues:["message"],hrefValues:["id","user_id","discussion_topic_id"],avoid:".subcontent"}),d.find(".add_entry_link").toggleClass("disabled_link",!e.permissions.reply).end().find(".edit_entry_link").toggleClass("disabled_link",!e.permissions.update).end().find(".delete_entry_link").toggleClass("disabled_link",!e.permissions["delete"]),d.find(".content").loadingImage("remove"),d.find(".user_content").removeClass("enhanced"),b("#initial_post_required").length&&location.reload(),b(document).triggerHandler("user_content_change")},error:function(a,b){return b.find(".content").loadingImage("remove"),d(b),b.attr("id")=="entry_id"&&b.attr("id","entry_new"),b.find("form")}}),b("#add_entry_form .cancel_button").click(function(a){var c=b(this).parents(".discussion_entry");b("#add_entry_bottom").show(),g(),c.attr("id")=="entry_new"&&h(c)}),b(".add_entry_link").live("click",function(c,e){c.preventDefault(),c.stopPropagation();if(b("#entry_new").length>0)return;var f=b("#entry_list"),g={parent_id:0};b(this).parents(".discussion_subtopic").length>0?(f=b(this).parents(".discussion_subtopic"),g.parent_id=f.prev().getTemplateData({textValues:["id"]}).id):b(this).parents(".discussion_entry").length>0&&(f=b(this).parents(".discussion_entry").next(),g.parent_id=f.prev().getTemplateData({textValues:["id"]}).id);var h=f.prev(".discussion_entry");if(h.length>0&&h.find(".replies_link").text()!=a.t("no_replies","No Replies")&&!h.hasClass("has_loaded"))return;var i=b("#entry_blank").clone(!0),j=b("#replies_entry_blank").clone(!0);i.fillTemplateData({data:g}),f.append(i.show()),f.append(j),m(i.parents(".discussion_subtopic:first")),i.attr("id","entry_new"),d(i,e)}),b(".switch_entry_views_link").live("click",function(a){a.preventDefault(),b(this).parents("form").find("textarea").editorBox("toggle")}),b(".edit_entry_link").live("click",function(a){a.preventDefault();if(b(this).parents(".discussion_entry").length>0){var c=b(this).parents(".discussion_entry");d(c)}else b(".discussion_topic:first .edit_topic_link").click()}),b(".delete_entry_link").live("click",function(c){c.preventDefault();var d=b("#add_entry_form").getFormData({values:["authenticity_token"]});b(this).closest(".discussion_entry,.communication_sub_message").confirmDelete({token:d.authenticity_token,url:b(this).attr("href"),message:a.t("confirms.delete_entry","Are you sure you want to delete this entry?"),success:function(){b(this).fadeOut("normal",function(){var a=b(this).parents(".discussion_subtopic:first");b(this).remove(),m(a)}),totalMessageCount--,b(this).parents(".discussion_subtopic").length===0&&messageCount--,m()}})}),b("#entry_list").delegate(".replies_link","click",function(a){a.preventDefault()}),b(".toggle_subtopics_link").live("click",function(c){c.preventDefault(),b(this).text().indexOf(a.t("expand","Expand"))!=-1?b(".toggle_subtopics_link").toggle():b(".toggle_subtopics_link").toggle()}),b(document).click(function(a){b(a.target).parents(".discussion_entry,.discussion_topic").length===0?k():l(b(a.target).closest(".communication_sub_message,.discussion_entry,.discussion_topic").filter(":first"))}),b.scrollSidebar(),b("#add_entry_form :input").keydown(function(a,c){if(a.keyCode==27||c==27){a.preventDefault();var d=b(this).parents("form").attr("id");setTimeout("cancelEditEntry('"+d+"')",100)}}),b(document).fragmentChange(function(a,c){if(c.match(/^#reply/)){var d=null;try{d=b.parseJSON(c.substring(6))}catch(e){}b("#sidebar .add_entry_link:visible:first").triggerHandler("click",d)}}),b(document).keycodes("j k d e r n",function(a){a.preventDefault(),a.stopPropagation();var c=b(".discussion_entry,.discussion_topic,.communication_sub_message").filter(".selected:first");if(a.keyCode==74)i();else if(a.keyCode==75)j();else if(a.keyCode==68)c.find(".delete_topic_link,.delete_entry_link").clickLink();else if(a.keyCode==69)c.find(".edit_topic_link,.edit_entry_link").clickLink();else if(a.keyCode==82){c.find(".add_entry_link").length?c.find(".add_entry_link").clickLink():c.closest(".communication_message").find(".add_entry_link").clickLink();var d=b(".add_sub_message_form,.new_discussion_entry").filter(":visible:first");d.length&&b("html,body").scrollTo(d)}else a.keyCode==78&&b(document).find(".add_entry_link:first").clickLink()})})}),function(){require(["topic"])}.call(this),define("compiled/bundles/topic",function(){})