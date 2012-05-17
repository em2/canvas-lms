define("translations/user_lists",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{user_lists:{add_n_users:{one:"OK se mira bien, agregue a este usuario",other:"OK se mira bien, agregue a estos %{count} usuarios"},adding_users:"Agregando Usuarios...",buttons:{"continue":"Continue..."},cant_unenroll:"Este usuario fue inscrito automáticamente usando el sistema de inscripción del campus, entonces no pueden ser removidos manualmente. Por favor contacte al administrador de su sistema si tiene preguntas.",delete_confirm:"¿Está seguro que quiere remover este usuario?",duplicate_users:{one:"se encontró 1 usuario duplicado, los duplicados han sido removidos.",other:"se encontraron %{count} duplicados, los duplicados han sido removidos."},invalid_users_notice:"Algunos pudieron haber sido inválidos, y pueda que necesite regresar y arreglar errores.",just_now:"Justo Ahora",messages:{processing:"Procesando..."},user_parsing_errors:{one:"Ocurrió 1 error en el análisis de esa lista de usuarios.",other:"Ocurrieron %{count} errores en el análisis de esa lista de usuarios."},users_added:{one:"1 usuario agregado",other:"%{count} users added"},users_adding_failed:"No se pudieron inscribir usuarios",users_to_add:{one:"Si continua, 1 usuario será agregado.",other:"Si continua así, %{count} usuarios serán agregados."}}}}})}),define("user_lists",["INST","i18n!user_lists","jquery","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.loadingImg","jquery.rails_flash_notifications","jquery.scrollToVisible","jquery.templateData","vendor/jquery.scrollTo"],function(a,b,c){var d=c("#user_lists_processed_person_template").removeAttr("id").detach(),e=c("#user_list_no_valid_users"),f=c("#user_list_with_errors"),g=c("#user_lists_processed_people"),h=c("#user_list_duplicates_found"),i=c("#enroll_users_form"),j=c("#enrollment_blank").removeAttr("id").hide(),k=c("#user_lists_path").attr("href"),l=a.UserLists={init:function(){l.showTextarea(),i.find(".cancel_button").click(function(){c(".add_users_link").show(),i.hide()}).end().find(".go_back_button").click(l.showTextarea).end().find(".verify_syntax_button").click(function(a){a.preventDefault(),l.showProcessing(),c.ajaxJSON(k,"POST",i.getFormData(),l.showResults)}).end().submit(function(a){a.preventDefault(),a.stopPropagation(),i.find(".add_users_button").text(b.t("adding_users","Adding Users...")).attr("disabled",!0),c.ajaxJSON(i.attr("action"),"POST",i.getFormData(),function(a){i.find(".user_list").val(""),l.showTextarea();if(!a||!a.length)return!1;var d=0;c.each(a,function(){d+=l.addUserToList(this.enrollment)});var e=b.t("users_added",{one:"1 user added",other:"%{count} users added"},{count:a.length-d});d>0&&(e+=" "+b.t("users_existed",{one:"(1 user already existed)",other:"(%{count} users already existed)"},{count:d})),c.flashMessage(e)},function(a){c.flashError(b.t("users_adding_failed","Failed to enroll users"))})}),i.find("#enrollment_type").change(function(){c("#limit_privileges_to_course_section_holder").showIf(c(this).val()=="TeacherEnrollment"||c(this).val()=="TaEnrollment")}).change(),c(".unenroll_user_link").click(function(a){a.preventDefault(),a.stopPropagation();if(c(this).hasClass("cant_unenroll"))alert(b.t("cant_unenroll","This user was automatically enrolled using the campus enrollment system, so they can't be manually removed.  Please contact your system administrator if you have questions."));else{$user=c(this).parents(".user"),$sections=c(this).parents(".sections"),$section=c(this).parents(".section");var d=$user;$sections.find(".section:visible").size()>1&&(d=$section),d.confirmDelete({message:b.t("delete_confirm","Are you sure you want to remove this user?"),url:c(this).attr("href"),success:function(){c(this).fadeOut(function(){l.updateCounts()})}})}})},showTextarea:function(){i.find(".add_users_button, .go_back_button, #user_list_parsed").hide(),i.find(".verify_syntax_button, .cancel_button, #user_list_textarea_container").show().removeAttr("disabled"),i.find(".user_list").removeAttr("disabled").loadingImage("remove").focus().select(),i.find(".verify_syntax_button").attr("disabled",!1).text(b.t("buttons.continue","Continue..."))},showProcessing:function(){i.find(".verify_syntax_button").attr("disabled",!0).text(b.t("messages.processing","Processing...")),i.find(".user_list").attr("disabled",!0).loadingImage()},showResults:function(a){i.find(".add_users_button, .go_back_button, #user_list_parsed").show(),i.find(".add_users_button").attr("disabled",!1).text(b.t("add_n_users",{one:"OK Looks Good, Add This 1 User",other:"OK Looks Good, Add These %{count} Users"},{count:a.users.length})),i.find(".verify_syntax_button, .cancel_button, #user_list_textarea_container").hide(),i.find(".user_list").removeAttr("disabled").loadingImage("remove"),g.html("").show(),!a||!a.users||!a.users.length?(e.appendTo(g),i.find(".add_users_button").hide()):(a.errored_users&&a.errored_users.length&&f.appendTo(g).find(".message_content").html(b.t("user_parsing_errors",{one:"There was 1 error parsing that list of users.",other:"There were %{count} errors parsing that list of users."},{count:a.errored_users.length})+" "+b.t("invalid_users_notice","There may be some that were invalid, and you might need to go back and fix any errors.")+" "+b.t("users_to_add",{one:"If you proceed as is, 1 user will be added.",other:"If you proceed as is, %{count} users will be added."},{count:a.users.length})),a.duplicates&&a.duplicates.length&&h.appendTo(g).find(".message_content").html(b.t("duplicate_users",{one:"1 duplicate user found, duplicates have been removed.",other:"%{count} duplicate user found, duplicates have been removed."},{count:a.duplicates.length})),c.each(a.users,function(){d.clone(!0).fillTemplateData({data:this}).appendTo(g).show()}))},updateCounts:function(){c.each(["student","teacher","ta","teacher_and_ta","student_and_observer","observer"],function(){c("."+this+"_count").text(c("."+this+"_enrollments .user:visible").length)})},addUserToList:function(a){var d=c.underscore(a.type),e=c(".user_list."+d+"s");e.length||(d=="student_enrollment"||d=="observer_enrollment"?e=c(".user_list.student_and_observer_enrollments"):e=c(".user_list.teacher_and_ta_enrollments")),e.find(".none").remove(),a.invitation_sent_at=b.t("just_now","Just Now");var f=null;e.find(".user").each(function(){var b=c(this).getTemplateData({textValues:["name"]}).name;if(b&&a.name&&b.toLowerCase()>a.name.toLowerCase())return f=c(this),!1}),a.enrollment_id=a.id;var g=!0;if(!c("#enrollment_"+a.id).length){g=!1;var h=j.clone(!0).fillTemplateData({textValues:["name","membership_type","email","enrollment_id"],id:"enrollment_"+a.id,hrefValues:["id","user_id","pseudonym_id","communication_channel_id"],data:a}).addClass(d).removeClass("nil_class user_").addClass("user_"+a.user_id).toggleClass("pending",a.workflow_state!="active")[f?"insertBefore":"appendTo"](f||e).show().animate({backgroundColor:"#FFEE88"},1e3).animate({display:"block"},2e3).animate({backgroundColor:"#FFFFFF"},2e3,function(){c(this).css("backgroundColor","")});h.find(".enrollment_link").removeClass("enrollment_blank").addClass("enrollment_"+a.id),h.parents(".user_list").scrollToVisible(h)}return l.updateCounts(),g?1:0}};c(a.UserLists.init)}),function(){require(["user_lists"])}.call(this),define("compiled/bundles/user_lists",function(){})