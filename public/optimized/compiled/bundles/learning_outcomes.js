define("translations/learning_outcomes",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{learning_outcomes:{criteria:{does_not_meet_expectations:"No cumple con las Expectativas",exceeds_expectations:"Excede las Expectaciones",meets_expectations:"Cumple con las Expectativas"},details_failed_to_load:"la carga de los detalles falló, intente de nuevo",find_existing_outcome:"Encontrar un Resultado Existente",loading_outcomes:"Cargando resultados...",loading_outcomes_failed:"Cargado de los resultados falló, intente de nuevo",outcome_criterion:"Criterio de Resultados de Aprendizaje",remove_learning_outcome:"¿Está seguro que quiere remover este resultado de aprendizaje?",remove_outcome_group:"¿Seguro que quiere remover este grupo de resultados de aprendizaje y todos sus resultados?",show_details:"mostrar los detalles"}}}})}),define("translations/find_outcome",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{find_outcome:{errors:{outcome_retrieval_failed:"La Recuperación de Resultados falló. Intente de nuevo."},messages:{loading_outcomes:"Cargando Resultados...",no_outcomes_found:"No se encontraron Resultados",no_rubric_outcomes_found:"No se encontraron Resultados Configurados para Rúbricas"},titles:{find_outcome:"Encontrar Resultado",find_outcome_criterion:"Encontrar los Criterios de Resultados"}}}}})}),define("find_outcome",["i18n!find_outcome","jquery","jquery.ajaxJSON","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.templateData"],function(a,b){var c=function(){return{find:function(d,e){e=e||{},c.callback=d;var f=b("#find_outcome_criterion_dialog");f.hasClass("loaded")||(f.find(".loading_message").text(a.t("messages.loading_outcomes","Loading Outcomes...")),b.ajaxJSON(f.find(".outcomes_list_url").attr("href"),"GET",{},function(c){valids=[];for(var d in c){var g=c[d].learning_outcome;(!e.for_rubric||g.data&&g.data.rubric_criterion)&&valids.push(g)}if(valids.length===0){var h;e.for_rubric?h=a.t("messages.no_rubric_outcomes_found","No Rubric-Configured Outcomes found"):h=a.t("messages.no_outcomes_found","No Outcomes found"),f.find(".loading_message").text(h)}else{f.find(".loading_message").hide(),f.addClass("loaded");for(var d in valids){var g=valids[d];g.name=g.short_description,g.mastery_points=g.data.rubric_criterion.mastery_points||g.data.rubric_criterion.points_possible;var i=f.find(".outcomes_select.blank:first").clone(!0).removeClass("blank");g.title=g.short_description;var j=b("<div/>");j.text(g.short_description),g.title=b.truncateText(b.trim(j.text()),35),g.display_name=g.cached_context_short_name||"",i.fillTemplateData({data:g}),f.find(".outcomes_selects").append(i.show());var k=f.find(".outcome.blank:first").clone(!0).removeClass("blank");k.find(".mastery_level").attr("id","outcome_question_bank_mastery_"+g.id).end().find(".mastery_level_text").attr("for","outcome_question_bank_mastery_"+g.id),g.learning_outcome_id=g.id;var l=g.data&&g.data.rubric_criterion,m=l.points_possible&&l.mastery_points!=null&&l.mastery_points/l.points_possible||0;m=Math.round(m*1e4)/100||"",k.find(".mastery_level").val(m),k.fillTemplateData({data:g,htmlValues:["description"]}),k.addClass("outcome_"+g.id);if(g.data&&g.data.rubric_criterion)for(var n in g.data.rubric_criterion.ratings){var o=g.data.rubric_criterion.ratings[n],p=k.find(".rating.blank").clone(!0).removeClass("blank");p.fillTemplateData({data:o}),k.find("tr").append(p.show())}f.find(".outcomes_list").append(k)}f.find(".outcomes_select:not(.blank):first").click()}},function(b){f.find(".loading_message").text(a.t("errors.outcome_retrieval_failed","Outcomes Retrieval failed unexpected.  Please try again."))}));var g;e.for_rubric?g=a.t("titles.find_outcome_criterion","Find Outcome Criterion"):g=a.t("titles.find_outcome","Find Outcome"),f.dialog("close").dialog({autoOpen:!1,modal:!0,title:g,width:700,height:400}).dialog("open")}}}();return window.find_outcome=c,b(document).ready(function(){b("#find_outcome_criterion_dialog .outcomes_select").click(function(a){a.preventDefault(),b("#find_outcome_criterion_dialog .outcomes_select.selected_side_tab").removeClass("selected_side_tab"),b(this).addClass("selected_side_tab");var c=b(this).getTemplateData({textValues:["id"]}).id;b("#find_outcome_criterion_dialog .outcomes_list .outcome").hide(),b("#find_outcome_criterion_dialog .outcomes_list .outcome_"+c).show()}),b("#find_outcome_criterion_dialog .select_outcome_link").click(function(a){a.preventDefault();var d=b(this).parents(".outcome");b("#find_outcome_criterion_dialog").dialog("close"),b.isFunction(c.callback)&&c.callback(d)})}),c}),define("learning_outcomes",["i18n!learning_outcomes","jquery","find_outcome","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.loadingImg","jquery.templateData","compiled/tinymce","tinymce.editor_box","vendor/jquery.scrollTo","jqueryui/sortable"],function(a,b,c){var d={ratingCounter:0,updateOutcome:function(a,c){if(!c||c.length===0)c=b("#outcome_"+a.id);if(!c||c.length===0)c=b("#outcome_blank").clone(!0).removeAttr("id"),b("#outcomes .outcome_group:first").append(c.show()),b("#outcomes .outcome_group:first .child_outcomes").sortable("refresh");a.asset_string=b.underscore("learning_outcome_"+a.id),c.find("textarea.description").val(a.description),c.fillTemplateData({data:a,id:"outcome_"+a.id,htmlValues:["description"],hrefValues:["id"]}),c.addClass("loaded"),c.find(".rubric_criterion .rating:not(.blank)").remove();if(a.data&&a.data.rubric_criterion){for(var e in a.data.rubric_criterion.ratings){var f=a.data.rubric_criterion.ratings[e],g=c.find(".rubric_criterion .rating.blank:first").clone(!0).removeClass("blank"),h=d.ratingCounter++;g.find(".description").text(f.description),g.find(".points").text(f.points),c.find(".add_holder").before(g.show())}c.find(".mastery_points").text(a.data.rubric_criterion.mastery_points),c.find(".points_possible").text(a.data.rubric_criterion.points_possible)}if(a.permissions){c.find(".edit_outcome_link").showIf(a.permissions.update&&i);var i=a.context_code==b("#find_outcome_dialog .context_code").text();c.find(".really_delete_outcome_link").showIf(i),c.find(".remove_outcome_link").showIf(!i)}return c},sizeRatings:function(){},hideEditOutcome:function(){b("#edit_outcome_form textarea").editorBox("destroy");var a=b("#outcomes #edit_outcome_form").prev(".learning_outcome");b("body").append(b("#edit_outcome_form").hide()),a.attr("id")=="outcome_new"?a.remove():a.show()},editOutcome:function(a,c){if(a&&a.length>0&&!a.hasClass("loaded")){a.find(".show_details_link").triggerHandler("click",function(){d.editOutcome(a,c)});return}d.hideEditOutcome();if(!a||a.length===0){a=b("#outcome_blank").clone(!0).attr("id","outcome_new");if(!c||c.length==0)c=b("#outcomes .outcome_group:first");b("#outcomes .child_outcomes:first").append(a.show()),c.find(".child_outcomes").sortable("refresh")}var e=b("#edit_outcome_form");e.attr("action",a.find(".edit_outcome_link").attr("href")),e.attr("method","PUT"),a.attr("id")=="outcome_new"&&(e.attr("action",b("#outcome_links .add_outcome_url").attr("href")),e.attr("method","POST"));var f=a.getTemplateData({textValues:["short_description","description","mastery_points"]});f.description=a.find("textarea.description").val()||a.find("textarea.description").html(),e.fillFormData(f,{object_name:"learning_outcome"}),e.find("#outcome_include_rubric_example").attr("checked",!0).change(),e.find(".rubric_criterion .rating:not(.blank)").remove(),a.find(".rubric_criterion .rating:not(.blank)").each(function(){e.find("#outcome_include_rubric_example").attr("checked",!0);var a=e.find(".rubric_criterion .rating.blank:first").clone(!0).removeClass("blank"),c=b(this).getTemplateData({textValues:["description","points"]}),f=d.ratingCounter++;a.find(".outcome_rating_description").val(c.description).attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][description]"),a.find(".outcome_rating_points").val(c.points).attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][points]"),e.find(".add_holder").before(a.show())}),e.find(".mastery_points").val(f.mastery_points),e.find("#outcome_include_rubric_example").change(),a.after(e.show()),a.hide(),e.find(":text:visible:first").focus().select(),e.find("textarea").editorBox()},deleteOutcome:function(c){c.confirmDelete({message:a.t("remove_learning_outcome","Are you sure you want to remove this learning outcome?"),url:c.find(".delete_outcome_link").attr("href"),success:function(){b(this).slideUp(function(){b(this).remove()})}})},updateOutcomeGroup:function(a,c){if(!c||c.length===0)c=b("#group_"+a.id);if(!c||c.length===0)c=b("#group_blank").clone(!0).removeAttr("id"),b("#outcomes .outcome_group:first").append(c.show()),b("#outcomes .outcome_group:first .child_outcomes").sortable("refresh"),c.find(".child_outcomes").sortable(d.sortableOptions),b(".outcome_group .child_outcomes").sortable("option","connectWith",".child_outcomes");return a.asset_string=b.underscore("learning_outcome_group_"+a.id),c.find("textarea.description").val(a.description),c.fillTemplateData({data:a,id:"group_"+a.id,hrefValues:["id"],htmlValues:["description"]}),c},hideEditOutcomeGroup:function(){b("#edit_outcome_group_form textarea").editorBox("destroy");var a=b("#outcomes #edit_outcome_group_form").prev(".outcome_group");b("body").append(b("#edit_outcome_group_form").hide()),a.attr("id")=="group_new"?a.remove():a.show()},editOutcomeGroup:function(a){d.hideEditOutcomeGroup();if(!a||a.length===0)a=b("#group_blank").clone(!0).attr("id","group_new"),b("#outcomes .child_outcomes:first").append(a.show()),b("#outcomes .outcome_group:first .child_outcomes").sortable("refresh"),a.find(".child_outcomes").sortable(d.sortableOptions),b(".outcome_group .child_outcomes").sortable("option","connectWith",".child_outcomes");var c=b("#edit_outcome_group_form");c.attr("action",a.find(".edit_group_link").attr("href")),c.attr("method","PUT"),a.attr("id")=="group_new"&&(c.attr("action",b("#outcome_links .add_outcome_group_url").attr("href")),c.attr("method","POST"));var e=a.getTemplateData({textValues:["title","description"]});e.description=a.find("textarea.description").val(),c.fillFormData(e,{object_name:"learning_outcome_group"}),a.after(c.show()),a.hide(),c.find(":text:visible:first").focus().select(),c.find("textarea").editorBox()},deleteOutcomeGroup:function(c){c.confirmDelete({message:a.t("remove_outcome_group","Are you sure you want to remove this learning outcome group and all its outcomes?"),url:c.find(".delete_group_link").attr("href"),success:function(){b(this).slideUp(function(){b(this).remove()})}})},sortableOptions:{axis:"y",connectWith:"#outcomes .child_outcomes",containment:"#outcomes",handle:".reorder_link",update:function(a,c){var d=b(c.item).parent().closest(".outcome_group"),e=d.children(".header").getTemplateData({textValues:["asset_string","id"]}).id,f={},g=b.replaceTags(b("#outcome_links .reorder_items_url").attr("href"),"id",e),h=d.children(".child_outcomes").children(".learning_outcome, .outcome_group").map(function(a,c){return b(c).children(".header").getTemplateData({textValues:["asset_string","id"]}).asset_string});for(var i=0,j=h.length;i<j;i++)f["ordering["+h[i]+"]"]=i;b.ajaxJSON(g,"POST",f)}}};b(document).ready(function(){b("#outcome_information_link").click(function(c){c.preventDefault(),b("#outcome_criterion_dialog").dialog("close").dialog({autoOpen:!1,title:a.t("outcome_criterion","Learning Outcome Criterion"),width:400}).dialog("open")}),b(".show_details_link,.hide_details_link").click(function(c,e){c.preventDefault();var f=b(this).closest(".learning_outcome");if(b(this).hasClass("show_details_link"))if(f.hasClass("loaded"))f.addClass("expanded");else{var g=b(this);g.text("loading details...");var h=f.find("a.show_details_link").attr("href");b.ajaxJSON(h,"GET",{},function(c){g.text(a.t("show_details","show details")),d.updateOutcome(c.learning_outcome,f),f.addClass("expanded"),e&&b.isFunction(e)&&e()},function(b){g.text(a.t("details_failed_to_load","details failed to load, please try again"))})}else f.removeClass("expanded")}),b("#outcomes .child_outcomes").sortable(d.sortableOptions),b(".delete_group_link").click(function(a){a.preventDefault(),d.deleteOutcomeGroup(b(this).closest(".outcome_group"))}),b(".edit_group_link").click(function(a){a.preventDefault(),d.editOutcomeGroup(b(this).closest(".outcome_group"))}),b("#find_outcome_dialog .select_outcomes_link").click(function(a){a.preventDefault(),b("#find_outcome_dialog .select_outcome_checkbox:checked").each(function(){var a=b(this).parents(".outcomes_dialog_select"),c=a.getTemplateData({textValues:["id"]}).id,e=b("#outcome_dialog_"+c),c=e.getTemplateData({textValues:["id"]}).id,f=b("#outcomes .outcome_group:first > .header").getTemplateData({textValues:["id"]}).id,g=b.replaceTags(b("#find_outcome_dialog .add_outcome_url").attr("href"),"learning_outcome_id",c);g=b.replaceTags(g,"learning_outcome_group_id",f);var h=e.getTemplateData({textValues:["id","short_description","description"]});h.permissions={};var e=d.updateOutcome(h);b("html,body").scrollTo(e),e.loadingImage(),b("#find_outcome_dialog").dialog("close"),b.ajaxJSON(g,"POST",{},function(a){e.loadingImage("remove"),d.updateOutcome(a.learning_outcome)},function(){e.loadingImage("remove"),e.remove()})})}),b(".edit_outcome_link").click(function(a){a.preventDefault(),d.editOutcome(b(this).parents(".learning_outcome"))}),b(".delete_outcome_link").click(function(a){a.preventDefault(),d.deleteOutcome(b(this).parents(".learning_outcome"))}),b(".add_outcome_link").click(function(a){a.preventDefault();var c=b(this).closest(".outcome_group");c.length==0&&(c=null),d.editOutcome(null,c)}),b(".add_outcome_group_link").click(function(a){a.preventDefault(),d.editOutcomeGroup()}),b("#edit_outcome_group_form .cancel_button").click(function(a){d.hideEditOutcomeGroup()}),b("#edit_outcome_form .cancel_button").click(function(a){d.hideEditOutcome()}),b("#find_outcome_dialog .outcomes_dialog_select").click(function(a){if(b(a.target).closest("input").length>0)return;a.preventDefault(),b("#find_outcome_dialog .outcomes_dialog_select.selected_side_tab").removeClass("selected_side_tab"),b(this).addClass("selected_side_tab");var c=b(this).getTemplateData({textValues:["id"]}).id;b("#find_outcome_dialog").find(".outcomes_dialog_outcome").hide().end().find("#outcome_dialog_"+c).show()}),b(".find_outcome_link").click(function(c){var d=b("#find_outcome_dialog");c.preventDefault(),d.dialog("close").dialog({autoOpen:!0,width:600,height:350,title:a.t("find_existing_outcome","Find Existing Outcome")}).dialog("open");if(!d.hasClass("loaded")){d.find(".loading_message").text(a.t("loading_outcomes","Loading outcomes..."));var e=d.find(".outcomes_url").attr("href");b.ajaxJSON(e,"GET",{},function(a){d.find(".loading_message").remove(),a.length===0&&d.find(".loading_message").text("No outcomes found");for(var b in a){var c=a[b].learning_outcome,e=d.find(".outcomes_dialog_select.blank:first").clone(!0);e.fillTemplateData({data:c}).removeClass("blank"),d.find(".outcomes_dialog_outcomes_select").append(e.show());var f=d.find(".outcomes_dialog_outcome.blank:first").clone(!0);f.removeClass("blank"),f.data("outcome",c),f.find(".criterion.blank").hide(),c.outcome_total=c.points_possible,f.fillTemplateData({data:c,htmlValues:["description"],id:"outcome_dialog_"+c.id}),d.find(".outcomes_dialog_outcomes").append(f)}d.find(".outcomes_dialog_holder").show(),d.find(".outcomes_dialog_outcomes_select .outcomes_dialog_select:visible:first").click(),d.addClass("loaded")},function(b){d.find(".loading_message").text(a.t("loading_outcomes_failed","Loading outcomes failed, please try again"))})}}),b("#edit_outcome_form").formSubmit({processData:function(a){return a.learning_outcome_group_id=b(this).closest(".outcome_group").find(".header").first().getTemplateData({textValues:["id"]}).id,a},beforeSubmit:function(a){var c=b(this).prev(".outcome");c.attr("id")=="outcome_new"&&c.attr("id","outcome_adding"),b(this).loadingImage()},success:function(a){b(this).loadingImage("remove"),d.updateOutcome(a.learning_outcome,b(this).prev(".learning_outcome")),d.hideEditOutcome()},error:function(a){b(this).loadingImage("remove"),b(this).formErrors(a)}}),b("#edit_outcome_group_form").formSubmit({processData:function(a){var c=b(this).parent().closest(".outcome_group").children(".header").getTemplateData({textValues:["id"]}).id;return a["learning_outcome_group[learning_outcome_group_id]"]=c,a},beforeSubmit:function(a){var c=b(this).prev(".outcome_group");c.attr("id")=="group_new"&&c.attr("id","group_adding"),b(this).loadingImage()},success:function(a){b(this).loadingImage("remove"),d.updateOutcomeGroup(a.learning_outcome_group,b(this).prev(".outcome_group")),d.hideEditOutcomeGroup()},error:function(a){b(this).loadingImage("remove"),b(this).formErrors(a)}}),b("#edit_outcome_form .switch_views_link").click(function(a){a.preventDefault(),b("#edit_outcome_form textarea:first").editorBox("toggle")}),b("#outcome_include_rubric_example").change(function(){var c=b(this).parents("form");c.find(".rubric_criterion").showIf(b(this).attr("checked")),c.find(".outcome_rating_points:first").blur(),c.find(".outcome_criterion_title").val()||c.find(".outcome_criterion_title").val(c.find(".outcome_short_description").val());if(c.find(".rating:not(.blank)").length===0){var e=c.find(".rating.blank:first").clone(!0).removeClass("blank"),f=d.ratingCounter++;e.find(".outcome_rating_description").val(a.t("criteria.exceeds_expectations","Exceeds Expectations")).attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][description]"),e.find(".outcome_rating_points").val("5").attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][points]"),c.find(".add_holder").before(e.show()),f=d.ratingCounter++,e=c.find(".rating.blank:first").clone(!0).removeClass("blank"),e.find(".outcome_rating_description").val(a.t("criteria.meets_expectations","Meets Expectations")).attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][description]"),e.find(".outcome_rating_points").val("3").attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][points]"),c.find(".add_holder").before(e.show()),f=d.ratingCounter++,e=c.find(".rating.blank:first").clone(!0).removeClass("blank"),e.find(".outcome_rating_description").val(a.t("criteria.does_not_meet_expectations","Does Not Meet Expectations")).attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][description]"),e.find(".outcome_rating_points").val("0").attr("name","learning_outcome[rubric_criterion][ratings]["+f+"][points]"),c.find(".add_holder").before(e.show()),c.find(".mastery_points").val("3")}c.find(".outcome_rating_points:first").blur()}),b("#edit_outcome_form .outcome_rating_points").blur(function(){var a=0;b(this).val(parseFloat(b(this).val())),b("#edit_outcome_form .rating:not(.blank) .outcome_rating_points").each(function(){var c=parseFloat(b(this).val(),10);c&&(a=Math.max(c,a))}),b("#edit_outcome_form .points_possible").text(a)}),b("#edit_outcome_form .mastery_points").blur(function(){b(this).val(parseFloat(b(this).val())||0)}),b("#edit_outcome_form .add_rating_link").click(function(a){a.preventDefault();var c=b(this).parents("table").find("tr.rating:visible:first").clone(!0).removeClass("blank");c.length===0&&(c=b(this).parents("table").find("tr.rating.blank").clone(!0).removeClass("blank")),b(this).parents("table").find(".criterion_title").after(c.show());var e=d.ratingCounter++;c.find(".outcome_rating_description").attr("name","learning_outcome[rubric_criterion][ratings]["+e+"][description]"),c.find(".outcome_rating_points").attr("name","learning_outcome[rubric_criterion][ratings]["+e+"][points]"),c.find(".outcome_rating_points").val(parseFloat(c.find(".outcome_rating_points").val(),10)+1),c.find(".outcome_rating_points:first").blur(),d.sizeRatings()}),b("#edit_outcome_form .delete_rating_link").click(function(a){a.preventDefault(),b(this).parents("tr").remove(),d.sizeRatings()})})}),function(){require(["learning_outcomes"])}.call(this),define("compiled/bundles/learning_outcomes",function(){})