I18n.scoped("plugins",function(a){$("form.edit_plugin_setting").live("submit",function(){$(this).find("button").attr("disabled",true).filter(".save_button").text(a.t("buttons.saving","Saving..."))});$(document).ready(function(){$(".disabled_checkbox").change(function(){$("#settings .plugin_settings").showIf(!$(this).attr("checked"))}).change()})});$.extend(true,I18n=I18n||{},{translations:{es:{plugins:{buttons:{saving:"Guardando..."}}}}});