$(".cancel_button").click(function(){$("#create_entry").slideUp()}).end().find(":text").keycodes("esc",function(){$(".cancel_button").click()});$("#new_user_note_button").click(function(a){a.preventDefault();$("#create_entry").slideDown();$("#add_entry_form").find(":text:first").focus().select()});
$("#add_entry_form").formSubmit({resetForm:true,beforeSubmit:function(){$("#create_entry").slideUp();$("#proccessing").loadingImage();return true},success:function(a){$("#no_user_notes_message").hide();$(this).find(".title").val("");$(this).find(".note").val("");user_note=a.user_note;user_note.created_at=$.parseFromISO(user_note.updated_at).datetime_formatted;a=$("#add_entry_form").attr("action")+"/"+user_note.id;$("#proccessing").loadingImage("remove");$("#user_note_blank").clone(true).prependTo($("#user_note_list")).attr("id",
"user_note_"+user_note.id).fillTemplateData({data:user_note}).find(".delete_user_note_link").attr("href",a).end().find(".formatted_note").html(user_note.formatted_note).end().slideDown()},error:function(){$("#proccessing").loadingImage("remove");$("#create_entry").slideDown()}});
I18n.scoped("user_notes",function(a){$(".delete_user_note_link").click(function(b){b.preventDefault();b=$("form:first").getFormData().authenticity_token;$(this).parents(".user_note").confirmDelete({message:a.t("confirms.delete_journal_entry","Are you sure you want to delete this journal entry?"),token:b,url:$(this).attr("href"),success:function(){$(this).fadeOut("slow",function(){$(this).remove();$("#user_note_list > .user_note").length||$("#no_user_notes_message").show()})},error:function(c){$(this).formErrors(c)}})})});
$.extend(true,I18n=I18n||{},{translations:{es:{user_notes:{confirms:{delete_journal_entry:"\u00bfSeguro que quiere borrar esta contribuci\u00f3n a la revista?"}}}}});
