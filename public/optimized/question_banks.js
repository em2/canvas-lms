define(["i18n!question_banks","jquery","jquery.ajaxJSON","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_misc_plugins","jquery.keycodes","jquery.loadingImg","jquery.templateData"],function(a,b){b(document).ready(function(){function c(a){var c=b(a).parents(".question_bank");if(!c.hasClass("dont_save")&&!c.hasClass("save_in_progress")&&c.attr("id")!="question_bank_new"){b("#edit_bank_form").submit();return}c.removeClass("dont_save"),c.find(".header_content").show(),b("body").append(b("#edit_bank_form").hide()),c.attr("id")=="question_bank_new"&&c.remove()}b(".add_bank_link").click(function(a){a.preventDefault();var c=b("#question_bank_blank").clone(!0).attr("id","question_bank_new");b("#questions").prepend(c.show()),c.find(".edit_bank_link").click()}),b(".question_bank .delete_bank_link").click(function(c){c.preventDefault(),b(this).parents(".question_bank").confirmDelete({url:b(this).attr("href"),message:a.t("delete_question_bank_prompt","Are you sure you want to delete this bank of questions?"),success:function(){b(this).slideUp(function(){b(this).remove()})}})}),b(".question_bank .bookmark_bank_link").click(function(a){a.preventDefault();var c=b(this),d=c.parents(".question_bank");b.ajaxJSON(b(this).attr("href"),"POST",{},function(a){d.find(".bookmark_bank_link").toggle()})}),b(".question_bank .edit_bank_link").click(function(a){a.preventDefault();var c=b(this).parents(".question_bank"),d=c.getTemplateData({textValues:["title","full_name"]});c.find(".header_content").hide();var e=b("#edit_bank_form");c.find(".header").prepend(e.show()),e.attr("action",b(this).attr("href")),e.attr("method","PUT"),c.attr("id")=="question_bank_new"&&(e.attr("action",b("#bank_urls .add_bank_url").attr("href")),e.attr("method","POST")),e.fillFormData(d,{object_name:"assessment_question_bank"})}),b("#edit_bank_form .bank_name_box").keycodes("return esc",function(a){a.keyString=="esc"?(b(this).parents(".question_bank").addClass("dont_save"),c(this)):a.keyString=="return"&&b("#edit_bank_form").submit()}),b("#edit_bank_form .bank_full_name_box").keycodes("return esc",function(a){a.keyString=="esc"?(b(this).parents(".question_bank").addClass("dont_save"),c(this)):a.keyString=="return"&&b("#edit_bank_form").submit()}),b("#edit_bank_form").formSubmit({object_name:"assessment_question_bank",beforeSubmit:function(a){var d=b(this).parents(".question_bank");d.attr("id","question_bank_adding");try{d.addClass("save_in_progress"),c(d.find(".bank_name_box"))}catch(e){}return d.fillTemplateData({data:a}),d.loadingImage(),d},success:function(a,c){c.loadingImage("remove"),c.removeClass("save_in_progress");var d=a.assessment_question_bank;d.last_updated_at=b.parseFromISO(d.updated_at).datetime_formatted,c.fillTemplateData({data:d,hrefValues:["id"]})},error:function(a,c){c.loadingImage("remove"),c.removeClass("save_in_progress"),c.find(".edit_bank_link").click(),b("#edit_bank_form").formErrors(a)}})})})