define("translations/content_imports",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{em2:{content_imports:{buttons:{"import":"Import Class"},errors:{failed:"Class Import failed with the following error:"},messages:{uploading:"Uploading Class Export..."}}},es:{content_imports:{buttons:{"import":"Importar el Curso"},errors:{failed:"La importación del curso falló  con los siguientes errores:",upload_failed:"La carga falló , intente de nuevo"},messages:{copying:"Copiando esto tomará unos cuantos minutos",uploading:"Cargando la Exportación del Curso..."}}}}})}),define("content_migration",["i18n!content_imports","jquery","jquery.instructure_forms","jquery.instructure_misc_plugins"],function(a,b){b(function(){function o(a){a=typeof a!="undefined"?a:".zip",h.text(a),d.val("1"),g.show()}function p(){m.show()}function q(){c.find("#migration_config > div").hide(),d.val("0"),g.hide(),i.val(""),f.attr("disabled",!0),m.hide(),n.removeAttr("checked"),j.find(".migration_config").ifExists(function(){$plugin_mother=k.find(b(this).data("mother_id")),$plugin_mother.append(b(this)),$plugin_mother.triggerHandler("pluginHidden",[e,l]),$alt_config=l.find(".migration_alt_config"),$alt_config&&$plugin_mother.append($alt_config)})}var c=b("#config_options"),d=b("#export_file_enabled"),e=b("#migration_form"),f=e.find(".submit_button"),g=e.find("#file_upload"),h=e.find("#upload_extension"),i=e.find("#export_file_input"),j=e.find("#migration_config"),k=b("#migration_configs"),l=b("#migration_alt_div"),m=b("#overwrite_questions_config"),n=b("#overwrite_questions");b("#choose_migration_system").change(function(){q(),b(this).val()=="none"?c.hide():(plugin_config_id="#plugin_"+b(this).val(),$plugin_mother_div=k.find(plugin_config_id),$plugin_config=$plugin_mother_div.find(".migration_config"),$plugin_config.data("mother_id",plugin_config_id),j.append($plugin_config),$plugin_alt_config=$plugin_mother_div.find(".migration_alt_config"),$plugin_alt_config&&($plugin_alt_config.data("mother_id",plugin_config_id),l.append($plugin_alt_config)),c.show(),$plugin_mother_div.triggerHandler("pluginShown",[o,e,p]))}).change(),b("#import_subset").change(function(){b("#import_subset_options").showIf(b(this).attr("checked"))}).change(),b("#export_file_input").change(function(){b(this).val().match(/\.zip$|\.imscc$/i)?(f.attr("disabled",!1),b(".zip_error").hide()):(f.attr("disabled",!0),b(".zip_error").show())}),b("#migration_form").formSubmit({fileUpload:function(){return d.val()=="1"},fileUploadOptions:{preparedFileUpload:!0,singleFile:!0,object_name:"migration_settings",context_code:b("#current_context_code").text(),upload_only:!0,uploadDataUrl:e.attr("action"),formDataTarget:"uploadDataUrl"},processData:function(a){return d.val()!="1"&&(a.export_file=null),a},beforeSubmit:function(c){d.val()=="1"&&b(this).find(".submit_button").attr("disabled",!0).text(a.t("messages.uploading","Uploading Course Export..."))},success:function(c){b(this).find(".submit_button").attr("disabled",!1).text(a.t("buttons.import","Import Course")),b(this).slideUp(),b("#file_uploaded").slideDown()},error:function(c){d.val()=="1"&&b(this).find(".submit_button").attr("disabled",!1).text(a.t("errors.upload_failed","Upload Failed, please try again")),b(this).formErrors(c)}})})}),function(){require(["content_migration"])}.call(this),define("compiled/bundles/content_migration",function(){})