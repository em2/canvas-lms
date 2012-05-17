define("translations/context.inbox",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{context:{inbox:{buttons:{mark_all_as_read:"Marcar Todos los Mensajes como Leídos"},errors:{mark_as_read_failed:"No se pudo marcar como leído, intente de nuevo"},status:{marking_all_as_read:"Marcando Todo como Leído..."}}}}}})}),define("context_inbox",["i18n!context.inbox","jquery","str/pluralize","jquery.ajaxJSON","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_misc_helpers","jquery.templateData","vendor/jquery.pageless","vendor/jquery.scrollTo"],function(a,b,c){b(document).ready(function(){var c=[];b("#visible_message_types :checkbox").each(function(){b(this).attr("checked")&&c.push(b(this).val())}),c=c.join(","),b("#visible_message_types :checkbox").change(function(){var a=[];b("#visible_message_types :checkbox").each(function(){b("#message_list").toggleClass("show_"+b(this).val(),!!b(this).attr("checked")),b(this).attr("checked")&&a.push(b(this).val())}),a=a.join(","),a!=c&&b.ajaxJSON(b(".update_user_url").attr("href"),"PUT",{"user[visible_inbox_types]":a},function(a){c=a.user.visible_types},function(){})}).change(),b("#mark_inbox_as_read_form").formSubmit({beforeSubmit:function(c){b(this).find("button").attr("disabled",!0).find(".msg").text(a.t("status.marking_all_as_read","Marking All as Read..."))},success:function(c){b("#message_list .inbox_item:visible").addClass("read"),b(this).find("button").attr("disabled",!1).find(".msg").text(a.t("buttons.mark_all_as_read","Mark All Messages as Read")),b("#identity .unread-messages-count").remove(),b(this).slideUp()},error:function(c){b(this).find("button").attr("disabled",!1).find(".msg").text(a.t("errors.mark_as_read_failed","Marking failed, please try again"))}})}),window.messages={updateInboxItem:function(a,d,e){var f=d.inbox_item;f.created_at=b.parseFromISO(f.created_at).datetime_formatted;if(!a||a.length===0)a=b("#inbox_item_blank:first").clone(!0).removeAttr("id");a.addClass(b.underscore(f.asset_type)),f.sender_name=f.sender_name;var g=f.context_code.split("_");f.context_id=g.pop(),f.context_type_pluralized=c(g.join("_")),f.context_name=b(".context_name_for_"+f.context_code).text(),a.fillTemplateData({data:f,id:"inbox_item_"+f.id,hrefValues:["id","user_id","sender_id","context_id","context_type_pluralized"]}),b("#message_list .no_messages").remove();if(a.parents("#message_list").length===0){a.css("display","");if(e&&e=="top")b("#message_list").prepend(a),b("html,body").scrollTo(b("#messages_view"));else{var h=f.workflow_state=="read";a.toggleClass("read",h),b("#message_list #pageless-loader").length>0?b("#message_list #pageless-loader").before(a):b("#message_list").append(a)}}return a}}}),function(){require(["context_inbox"])}.call(this),define("compiled/bundles/discussion_replies",function(){})