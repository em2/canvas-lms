define(["i18n!grading_standards","jquery","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","jquery.rails_flash_notifications","jquery.templateData","vendor/jquery.scrollTo"],function(a,b){b(document).ready(function(){b(".add_standard_link").click(function(a){a.preventDefault();var c=b("#grading_standard_blank").clone(!0).attr("id","grading_standard_new");b("#standards").append(c.show()),c.find(".edit_grading_standard_link").click()}),b(".edit_letter_grades_link").click(function(c){c.preventDefault(),b("#edit_letter_grades_form").dialog("close").dialog({title:a.t("titles.grading_scheme_info","View/Edit Grading Scheme"),autoOpen:!1,width:600,height:310}).dialog("open")}),b(".grading_standard .delete_grading_standard_link").click(function(c){c.preventDefault();var d=b(this).parents(".grading_standard"),e=d.find(".update_grading_standard_url").attr("href");d.confirmDelete({url:e,message:a.t("confirm.delete_grading_scheme","Are you sure you want to delete this grading scheme?"),success:function(a){b(this).slideUp(function(){b(this).remove()})},error:function(){b.flashError(a.t("errors.cannot_delete_grading_scheme","There was a problem deleting this grading scheme"))}})}),b(".grading_standard .done_button").click(function(a){a.preventDefault(),b("#edit_letter_grades_form").dialog("close")}),b(".grading_standard .remove_grading_standard_link").click(function(c){function d(){b("#edit_assignment_form .grading_standard_id").val(""),b("#assignment_grading_type").val("points").change(),b("#course_grading_standard_enabled").attr("checked",!1).change(),b("#course_form .grading_scheme_set").text(a.t("grading_scheme_not_set","Not Set")),f.addClass("editing"),f.find(".update_grading_standard_url").attr("href",b("#update_grading_standard_url").attr("href"));var c=b.parseJSON(b("#default_grading_standard_data").val()),d={title:"",id:null,data:c};f.fillTemplateData({data:d,id:"grading_standard_blank",avoid:".find_grading_standard",hrefValues:["id"]}).find(".edit_grading_standard_link").removeClass("read_only"),f.triggerHandler("grading_standard_updated",d),b("#edit_letter_grades_form").dialog("close"),f.undim()}c.preventDefault();var e=confirm(a.t("confirm.unlink_grading_scheme","Are you sure you want to unlink this grading scheme?"));if(!e)return!1;var f=b(this).parents(".grading_standard");f.dim();var g={"assignment[grading_standard_id]":"","assignment[grading_type]":"points"},h=b("#edit_assignment_form").attr("action");b("#update_course_url").length?(g={"course[grading_standard_id]":""},h=b("#update_course_url").attr("href")):h&&h.match(/assignments$/)&&(h=null),h?b.ajaxJSON(h,"PUT",g,d,function(){b.flashError(a.t("errors.cannot_remove_grading_scheme","There was a problem removing this grading scheme.  Please reload the page and try again."))}):d()}),b(".grading_standard .edit_grading_standard_link").click(function(a){a.preventDefault();var c=b(this).parents(".grading_standard");c.addClass("editing"),b(this).hasClass("read_only")&&c.attr("id","grading_standard_blank"),c.find(".grading_standard_row").each(function(){var a=b(this).getTemplateData({textValues:["min_score","name"]});b(this).find(".standard_value").val(a.min_score).end().find(".standard_name").val(a.name)}),b("#standards").ifExists(function(){b("html,body").scrollTo(c)}),c.find(":text:first").blur().focus().select()}),b(".grading_standard .grading_standard_brief").find(".collapse_data_link,.expand_data_link").click(function(a){a.preventDefault();var c=b(this).parents(".grading_standard_brief");c.find(".collapse_data_link,.expand_data_link").toggle(),c.find(".details").slideToggle()}),b(".grading_standard_select").live("click",function(a){a.preventDefault();var c=b(this).getTemplateData({textValues:["id"]}).id;b(".grading_standard .grading_standards_select .grading_standard_select").removeClass("selected_side_tab"),b(this).addClass("selected_side_tab"),b(".grading_standard .grading_standards .grading_standard_brief").hide(),b("#grading_standard_brief_"+c).show()}),b(".grading_standard").find(".find_grading_standard_link,.cancel_find_grading_standard_link").click(function(c){c.preventDefault(),b(this).parents(".grading_standard").find(".display_grading_standard,.find_grading_standard").toggle();var d=b(this).parents(".grading_standard").find(".find_grading_standard:visible");if(d.length>0&&!d.hasClass("loaded")){d.find(".loading_message").text(a.t("status.loading_grading_standards","Loading Grading Standards..."));var e=d.find(".grading_standards_url").attr("href");b.ajaxJSON(e,"GET",{},function(b){if(b.length===0)d.find(".loading_message").text(a.t("no_grading_standards","No grading standards found"));else{d.find(".loading_message").remove();for(var c in b){var e=b[c].grading_standard;e.user_name=e.display_name;var f=d.find(".grading_standards_select .grading_standard_select.blank:first").clone(!0);f.fillTemplateData({data:e}).data("context_code",e.context_code).removeClass("blank"),d.find(".grading_standards_select").append(f.show());var g=d.find(".grading_standard_brief.blank:first").clone(!0);g.fillTemplateData({data:e,id:"grading_standard_brief_"+e.id}).data("context_code",e.context_code),g.removeClass("blank");for(var h=0;h<e.data.length;h++){var i=e.data[h],j={name:i[0],value:h==0?100:"< "+e.data[h-1][1]*100,next_value:i[1]*100},k=g.find(".details_row.blank:first").clone(!0);k.removeClass("blank"),k.fillTemplateData({data:j}),g.find(".details > table").append(k.show())}d.find(".grading_standards").append(g)}d.find(".grading_standards_select .grading_standard_select:visible:first a:first").click()}d.addClass("loaded"),d.find(".grading_standards_holder").slideDown()},function(b){d.find(".loading_message").text(a.t("errors.cannot_load_grading_standards","Loading Grading Standards Failed.  Please Try Again"))})}}),b(".grading_standard .grading_standard_brief .select_grading_standard_link").click(function(a){a.preventDefault();var c=b(this).parents(".grading_standard_brief"),d=c.getTemplateData({textValues:["id","title"],dataValues:["context_code"]}),e=d.id,f=d.title,g=[];b(this).parents(".grading_standard_brief").find(".details_row:not(.blank)").each(function(){var a=b(this).find(".name").text(),c=parseFloat(b(this).find(".next_value").text())/100;isNaN(c)&&(c=""),g.push([a,c])}),b(this).parents(".grading_standard").triggerHandler("grading_standard_updated",{id:e,data:g,title:f});var h=b("#edit_letter_grades_form").data().context_code;b(this).parents(".grading_standard").find(".edit_grading_standard_link").toggleClass("read_only",h!=d.context_code),b(this).parents(".find_grading_standard").find(".cancel_find_grading_standard_link").click()}),b(".grading_standard .cancel_button").click(function(a){b(this).parents(".grading_standard").removeClass("editing").find(".insert_grading_standard").hide();var c=b(this).parents(".grading_standard");c.find(".to_add").remove(),c.find(".to_delete").removeClass("to_delete").show(),c.attr("id")=="grading_standard_new"&&c.remove()}),b(".grading_standard").bind("grading_standard_updated",function(c,d){var e=b(this);e.addClass("editing"),e.find(".update_grading_standard_url").attr("href",b("#update_grading_standard_url").attr("href")),e.fillTemplateData({data:d,id:"grading_standard_"+(d.id||"blank"),avoid:".find_grading_standard",hrefValues:["id"]}).fillFormData(d,{object_name:"grading_standard"});var f=e.find(".insert_grading_standard:first").clone(!0),g=e.find(".grading_standard_row:first").clone(!0).removeClass("blank"),h=e.find(".grading_standard_data");h.empty(),h.append(f.clone(!0).show());for(var i in d.data){var j=g.clone(!0),k=d.data[i];j.removeClass("to_delete").removeClass("to_add"),j.find(".standard_name").val(k[0]).attr("name","grading_standard[standard_data][scheme_"+i+"][name]").end().find(".standard_value").val(k[1]*100).attr("name","grading_standard[standard_data][scheme_"+i+"][value]"),h.append(j.show()),h.append(f.clone(!0).show())}h.find(":text:first").blur(),h.append(g.hide()),h.append(f.hide()),e.find(".grading_standard_row").each(function(){b(this).find(".name").text(b(this).find(".standard_name").val()).end().find(".min_score").text(b(this).find(".standard_value").val()).end().find(".max_score").text(b(this).find(".edit_max_score").text())}),e.removeClass("editing"),e.find(".insert_grading_standard").hide();if(d.id){e.find(".remove_grading_standard_link").removeClass("read_only");var l={"assignment[grading_standard_id]":d.id,"assignment[grading_type]":"letter_grade"},m=b("#edit_assignment_form").attr("action");b("#edit_assignment_form .grading_standard_id").val(d.id),b("#update_course_url").length?(l={"course[grading_standard_id]":d.id},m=b("#update_course_url").attr("href")):m&&m.match(/assignments$/)&&(m=null),m&&b.ajaxJSON(m,"PUT",l,function(c){b("#course_form .grading_scheme_set").text(c&&c.course&&c.course.grading_standard_title||a.t("grading_scheme_currently_set","Currently Set"))},function(){})}else e.find(".remove_grading_standard_link").addClass("read_only")}),b(".grading_standard .save_button").click(function(c){var d=b(this).parents(".grading_standard"),e=b("#edit_letter_grades_form .create_grading_standard_url,#create_grading_standard_url").attr("href"),f="POST";d.attr("id")!="grading_standard_blank"&&d.attr("id")!="grading_standard_new"&&(e=b(this).parents(".grading_standard").find(".update_grading_standard_url").attr("href"),f="PUT");var g=d.find(".standard_title,.grading_standard_row:visible").getFormData();d.find("button").attr("disabled",!0).filter(".save_button").text(a.t("status.saving","Saving...")),b.ajaxJSON(e,f,g,function(b){var c=b.grading_standard;d.find("button").attr("disabled",!1).filter(".save_button").text(a.t("buttons.save","Save")),d.triggerHandler("grading_standard_updated",c)},function(){d.find("button").attr("disabled",!1).filter(".save_button").text(a.t("errors.save_failed","Save Failed"))})}),b(".grading_standard thead").mouseover(function(a){if(!b(this).parents(".grading_standard").hasClass("editing"))return;b(this).parents(".grading_standard").find(".insert_grading_standard").hide(),b(this).parents(".grading_standard").find(".insert_grading_standard:first").show()}),b(".grading_standard .grading_standard_row").mouseover(function(a){if(!b(this).parents(".grading_standard").hasClass("editing"))return;b(this).parents(".grading_standard").find(".insert_grading_standard").hide();var c=a.pageY,d=b(this).offset(),e=b(this).height();c>d.top+e/2?b(this).next(".insert_grading_standard").show():b(this).prev(".insert_grading_standard").show()}),b(".grading_standard .insert_grading_standard_link").click(function(a){a.preventDefault();if(b(this).parents(".grading_standard").find(".grading_standard_row").length>40)return;var c=b(this).parents(".grading_standard"),d=c.find(".grading_standard_row:first").clone(!0).removeClass("blank"),e=c.find(".insert_grading_standard:first").clone(!0),f=null;while(!f||b(".standard_name[name='grading_standard[standard_data][scheme_"+f+"][name]']").length>0)f=Math.round(Math.random()*1e4);d.find(".standard_name").val("-").attr("name","grading_standard[standard_data][scheme_"+f+"][name]"),d.find(".standard_value").attr("name","grading_standard[standard_data][scheme_"+f+"][value]"),b(this).parents(".insert_grading_standard").after(d.show()),d.after(e),c.find(":text:first").blur(),d.find(":text:first").focus().select(),d.addClass("to_add")}),b(".grading_standard .delete_row_link").click(function(a){a.preventDefault();if(b(this).parents(".grading_standard").find(".grading_standard_row:visible").length<2)return;var c=b(this).parents(".grading_standard_row");c.prev(".insert_grading_standard").length>0?c.prev(".insert_grading_standard").remove():c.next(".insert_grading_standard").remove(),c.fadeOut(function(){b(this).addClass("to_delete"),b(".grading_standard input[type='text']:first").triggerHandler("change")})}),b(".grading_standard input[type='text']").bind("blur change",function(){var a=b(this).parents(".grading_standard"),c=parseFloat(b(this).parents(".grading_standard_row").find(".standard_value").val());c=Math.round(c*10)/10,b(this).parents(".grading_standard_row").find(".standard_value").val(c),isNaN(c)&&(c=null);var d=c||100,e=c||0,f=a.find(".grading_standard_row:not(.blank,.to_delete)");for(var g=f.index(b(this).parents(".grading_standard_row"))+1;g<f.length;g++){var h=f.eq(g),i=parseFloat(h.find(".standard_value").val());isNaN(i)&&(i=null);if(g==f.length-1)i=0;else if(!i||i>d-.1)i=parseInt(d)-1;h.find(".standard_value").val(i),d=i}for(var g=f.index(b(this).parents(".grading_standard_row"))-1;g>=0;g--){var h=f.eq(g),i=parseFloat(h.find(".standard_value").val());isNaN(i)&&(i=null);if(g==f.length-1)i=0;else if(!i||i<e+.1)i=parseInt(e)+1;e=i,h.find(".standard_value").val(i)}d=100,f.each(function(a){var c=parseFloat(b(this).find(".standard_value").val()),a=f.index(this);isNaN(c)&&(c=null);if(a==f.length-1)c=0;else if(!c||c>d-.1)c=parseInt(d)-1;b(this).find(".standard_value").val(c),d=c}),e=0;for(var g=f.length-1;g>=0;g--){var h=f.eq(g),i=parseFloat(h.find(".standard_value").val());isNaN(i)&&(i=null);if(g==f.length-1)i=0;else if(!i||i<e+.1)i=parseInt(e)+1;e=i,h.find(".standard_value").val(i)}f.each(function(a){var c=f.eq(a-1),d=0;c&&c.length>0&&(d=parseFloat(c.find(".standard_value").val()),isNaN(d)&&(d=0),b(this).find(".edit_max_score").text("< "+d))}),f.filter(":first").find(".edit_max_score").text(100)})})})