define("translations/assignments",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{assignments:{assignment:{default_content:"Sin Contenido"},assignment_count:{one:"1 Tarea",other:"%{count} Tareas"},assignment_groups_count:{one:"1 Grupo",other:"%{count} Grupos"},buttons:{delete_group:"Borrar el Grupo"},confirm:{delete_assignment:"¿Seguro que quiere borrar esta tarea?",delete_group:"¿Seguro que quiere borrar este grupo?"},drop_highest_scores:"Elimine las %{number} Calificaciones Mayores",drop_lowest_scores:"Elimine las %{number} Calificaciones Menores",errors:{deleting_group_failed:"El Borrado Falló"},group_name:"Nombre del Grupo",never_drop_scores:"Nunca Eliminar %{assignment_name}",no_assignments:"[Sin Tareas]",number_of_assignments:{one:"1 tarea",other:"%{count} tareas"},other_assignments:"Otras Tareas",select_assignment:"[Seleccionar Tareas]",status:{deleting_group:"Borrando el Grupo..."},titles:{assignment_details:"Detalles de la Tarea"}}}}})}),define("assignments",["INST","i18n!assignments","jquery","str/htmlEscape","instructure-jquery.ui.draggable-patch","jquery.ajaxJSON","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","jquery.keycodes","jquery.loadingImg","jquery.scrollToVisible","jquery.templateData","vendor/date","vendor/jquery.scrollTo","jqueryui/datepicker","jqueryui/droppable","jqueryui/sortable"],function(a,b,c,d){function e(){var a=c("#add_assignment_form"),b=a.parents(".group_assignment"),d=b.parents(".assignment_group");a.find("").end().hide().appendTo(c("body")),b.removeClass("editing"),b.find(".content").show(),b.attr("id")=="assignment_new"?b.remove():b.find(":tabbable:first").focus(),d.find(".group_assignment").length===0&&d.find(".padding").show()}function f(){var a=c(".group_assignment:visible").length,d=c(".assignment_group:visible").length;c(".assignment_count").text(b.t("assignment_count","Assignment",{count:a})),c(".assignment_group_count").text(b.t("assignment_groups_count","Group",{count:d}))}function g(a){e(),a.find(".content").hide().before(c("#add_assignment_form").show()),a.addClass("editing");var b=a.parents(".assignment_group"),d=b.getTemplateData({textValues:["default_assignment_name","assignment_group_id"]}),f=d.default_assignment_name;f+=" "+b.find(".group_assignment").length;var g=a.find("#add_assignment_form"),h="Update",i=a.find(".edit_assignment_link").attr("href");a.attr("id")=="assignment_new"&&(h="Add",i=c(".add_assignment_link.groupless_link:first").attr("href")),a.find(".more_options_link").attr("href",i),g.find("input[type='submit']").val(h);var j=a.getTemplateData({textValues:["title","points_possible","due_date_string","due_time_string","assignment_group_id","submission_types"]});j.title=j.title||f,j.submission_types!="online_quiz"&&j.submission_types!="discussion_topic"&&(g.find(".assignment_submission_types .current_submission_types").val(j.submission_types),g.find(".assignment_submission_types").val(j.submission_types)),j.assignment_group_id=d.assignment_group_id,j.due_time=j.due_time_string,j.due_date=j.due_date_string;var k=Date.parse(j.due_date_string+" "+j.due_time_string);j.due_at="",k&&(j.due_at=k.toString(c.datetime.defaultFormat)),a.attr("id")=="assignment_new"?(o?(g.find(".date_options").show(),g.find(".show_date_link").hide()):(g.find(".date_options").hide(),g.find(".show_date_link").show()),g.attr("action",c("#add_assignment .assignments_url").attr("href")).attr("method","POST")):(j.due_time&&j.due_date?(g.find(".date_options").show(),g.find(".show_date_link").hide()):(g.find(".date_options").hide(),g.find(".show_date_link").show()),g.attr("action",a.find(".title").attr("href")).attr("method","PUT")),!j.due_time||!j.due_date,g.fillFormData(j,{object_name:"assignment"}),g.find(":text:first").focus().select(),c("html,body").scrollToVisible(a)}function h(){var a=c("#add_group_form"),b=a.parents(".assignment_group").find(".header");a.find("input[name='name']").val("").change().end().find(".form_rules").empty().end().hide().appendTo(c("body")),b.find(".hide_info_link").click(),b.find(".header_content, .edit_group_link, .delete_group_link").show(),b.parents(".assignment_group").attr("id")=="group_new"?b.parents(".assignment_group").remove():b.find(".group_name").focus()}function i(a){h();var d=a.getTemplateData({textValues:["name","assignment_group_id","group_weight","assignment_weighting_scheme","rules"]}),e=c("#add_group_form");e.find(".form_rules").empty();var f=(d.rules||"").split("\n"),g=e.find("#assignment_group_rule_blank .assignment_to_never_drop");g.empty();if(a.find(".group_assignment").length>0){var i=c(document.createElement("option"));i.val("0").text(b.t("select_assignment","[Select Assignment]")),g.append(i),a.find(".group_assignment").each(function(){i=c(document.createElement("option"));var a=c(this).getTemplateData({textValues:["id","title"]});i.val(a.id).text(a.title),g.append(i)})}else{var i=c(document.createElement("option"));i.val("0").text(b.t("no_assignments","[No Assignments]")),g.append(i)}g.val("0"),c.each(f,function(a,b){var c=b.split(":");if(c.length==2){var d=e.find("#assignment_group_rule_blank").clone(!0);d.attr("id",""),e.find(".form_rules").append(d.show()),d.find("select[name='rule_type']").val(c[0]).change(),c[0]=="never_drop"?(d.find("input[name='scores_to_drop']").val(""),d.find("select[name='assignment_to_never_drop']").val(c[1])):(d.find("input[name='scores_to_drop']").val(c[1]),d.find("select[name='assignment_to_never_drop']").val("0"))}});var g=e.find(".assignment_to_never_drop");a.find(".header_content").hide().before(e.show()),c("#class_weighting_policy").attr("checked")?a.find("#add_group_form .percent_weighting").show().end().find("#add_group_form .weighting").hide():a.find(".percent_weighting").hide().end().find(".weighting").hide(),e.fillFormData(d,{object_name:"assignment_group"}),a.attr("id")=="group_new"?e.attr("action",c("#add_group .assignment_groups_url").attr("href")).attr("method","POST"):e.attr("action",a.find(".assignment_group_url").attr("href")).attr("method","PUT"),e.find(":text:first").focus().select()}function j(a,b){c(document).triggerHandler("add_assignment");if(!a||a.length===0){var d=c(".assignment_groups_select").val();a=c("#"+d),a.length===0&&(a=c("#groups .assignment_group:first"))}if(a.length===0)return;if(c("#assignment_new").length>0){if(c("#assignment_new").parents(".assignment_group")[0]==a[0]){c("#assignment_new :text:first").focus().select();return}e()}c(".no_assignments_message").hide();var f=c("#assignment_blank").clone(!0);f.attr("id","assignment_new"),a.find(".assignment_list").prepend(f),a.find(".padding").hide(),a.find(".assignment_list").sortable("refresh"),!b||!0?f.slideDown("fast",function(){c(this).find(":text:first").focus().select()}):f.hide().animate({opacity:1},500).slideDown("normal",function(){c(this).find(":text:first").focus().select()}),g(f)}function k(a,b){var d=b.assignment,e=a.attr("id");(e=="assignment_new"||e=="assignment_creating")&&f();if(d.due_at){var g=c.parseFromISO(d.due_at,"due_date");d.due_date=g.date_formatted,d.due_time=g.time_formatted,d.timestamp=g.timestamp,d.due_date_string=c.datepicker.formatDate("mm/dd/yy",g.date),d.due_time_string=g.time_string,a.find(".date_text").show()}else a.find(".date_text").hide(),d.timestamp=0;a.find(".assignment_title").find(".title").attr("title",d.title),a.find(".points_text").showIf(d.points_possible),a.loadingImage("remove"),d.timestamp||(d.timestamp=0);var h=!1;a.attr("id")=="assignment_creating"&&(h=!0),a.fillTemplateData({id:"assignment_"+d.id,data:d,hrefValues:["id"]}),a.find(".description").val(d.description),a.find(".links,.move").css("display",""),a.toggleClass("group_assignment_editable",d.permissions&&d.permissions.update),l(c("#group_"+d.assignment_group_id),a),c("html,body").scrollToVisible(a)}function l(a,b){var d=b.getTemplateData({textValues:["timestamp","title","position"]}),e=!1;d.position=Number(d.position),a.find(".assignment_list .group_assignment").each(function(){if(c(this).attr("id")===b.attr("id")||c(this).attr("id")==="assignment_new")return;var a=c(this).getTemplateData({textValues:["timestamp","title","position"]});if(d.position<a.position||d.position==a.position&&d.timestamp<a.timestamp||d.position==a.position&&d.timestamp==a.timestamp&&d.title<a.title)return e=!0,c(this).before(b),!1}),e||a.find(".assignment_list").append(b)}function m(){var a=c(".assignment_groups_select"),b=a.val();a.empty(),c(".assignment_group:visible").each(function(){var b=c(this).attr("id"),d=c(this).getTemplateData({textValues:["name"]}).name,e=c(document.createElement("option")).val(b).text(d);a.append(e)}),a.val(b)}function n(a){var b=c(".group_assignment.assignment-hover:first"),d=c(".assignment_group.group-hover:first");if(d.length===0){d=c(".assignment_group:visible:first"),d.addClass("group-hover"),d.find(".group_name").focus();return}var e=b,f=null;b.length===0?a=="up"?(f=d.prev(".assignment_group:visible"),e=f.find(".group_assignment:visible:last")):e=d.find(".group_assignment:visible:first"):a=="up"?(e=b.prev(".group_assignment:visible"),e.length===0&&(e=null,d.find(".group_name").focus())):(e=b.next(".group_assignment:visible"),e.length===0&&(f=d.next(".assignment_group:visible"),f.length===0&&(f=null,e=b))),b.removeClass("assignment-hover"),f?(f.length===0&&(f=d),d.removeClass("group-hover"),f.addClass("group-hover"),f.find(".group_name").focus(),e.length>0&&e.parents(".assignment_group")[0]==f[0]&&(e.addClass("assignment-hover"),e.find(":tabbabble:first").focus())):e&&(e.addClass("assignment-hover"),e.find(":tabbable:first").focus())}var o=!1,p={handle:".group_move, .group_move_icon",scroll:!0,axis:"y",start:function(a,b){var c=b.item.outerWidth();b.helper.width(c)},update:function(a){var b=c(a.target).parents(".assignment_group").css("width",""),d=[];c("#groups .assignment_group").each(function(){var a=c(this).getTemplateData({textValues:["assignment_group_id"]});c(this)[0]!=b[0]&&d.push(a.assignment_group_id)});var e={};e.order=d.join(",");var f=c(".reorder_groups_url").attr("href");c.ajaxJSON(f,"POST",e,function(a){c(document).triggerHandler("group_reorder",a)})}},q={items:".group_assignment",connectWith:".assignment_group .assignment_list",handle:".move_icon, .move",axis:"y",opacity:.8,scroll:!0,containment:"#content",update:function(a,b){var d=c(b.item).parents(".assignment_group"),e=d.find(".reorder_assignments_url").attr("href"),f=[];d.find(".assignment_list .group_assignment").each(function(a){c(this).find(".position").text(a+1),f.push(c(this).getTemplateData({textValues:["id"]}).id)});var g=f.join(","),h=[e,g].join("-");q.lastUpdate!==h&&(q.lastUpdate=h,c.ajaxJSON(e,"POST",{order:g}))}},r={handle:".move_icon, .move",axis:"y",helper:function(){var a=c(this).clone();return a.css("zIndex",20),a.css("backgroundImage","#ccc"),a.find(".links").hide(),a.addClass("assignment-hover"),a.width(c(this).outerWidth()),a},opacity:.8,scroll:!0},s={accept:".group_assignment",hoverClass:"droppable_group",drop:function(a,b){var d=c(this),e=d.getTemplateData({textValues:["assignment_group_id"]}),f=c(b.draggable),g=f.parents(".assignment_group");e["assignment[assignment_group_id]"]=e.assignment_group_id;var h=f.find(".title").attr("href");f.addClass("event_pending"),l(d,f),d.find(".padding").hide(),g.find(".group_assignment").length<=1&&g.find(".padding").show(),c.ajaxJSON(h,"PUT",e,function(a){var b=a.assignment;f.removeClass("event_pending");var e=d;d=c("#group_"+b.assignment_group_id),l(d,f),d.find(".padding").hide(),e.find(".group_assignment").length<=1&&e.find(".padding").show()})}};c(document).ready(function(){function r(a){var b=a.find(".header").getTemplateData({textValues:["assignment_group_id"]}).assignment_group_id;h(),a.slideUp("normal",function(){c(this).remove(),m(),c("#group_weight_"+b).remove(),c("#group_weight .group_weight:visible:first .weight").triggerHandler("change",!1),f(),c("#groups .assignment_group").length<=1&&c("#groups .assignment_group .delete_group_link").hide()})}c("#add_assignment_form .more_options_link").click(function(b){b.preventDefault();var d=c(this).attr("href").split("#"),e=c(this).parents("form").getFormData({object_name:"assignment"}),f={};e.title&&(f.title=e.title),e.due_at&&(f.due_at=e.due_at),e.points_possible&&(f.points_possible=e.points_possible),e.assignment_group_id&&(f.assignment_group_id=e.assignment_group_id),e.submission_types&&(f.submission_types=e.submission_types),a&&a.gettingStartedPage&&(f.getting_started="1"),f.return_to=location.href,d[0]+="?"+c.param(f),location.href=d.join("#")}),c(".datetime_field").datetime_field(),c(document).bind("group_reorder",function(a,b){if(b&&b.order)for(var d in b.order){var e=b.order[d];c("#groups").append(c("#group_"+e)),c("#group_weight tbody:first").append(c("#group_weight_"+e))}}),c(document).bind("group_create",function(a,b){if(b&&b.assignment_group){var d=b.assignment_group,e=c("#groups .assignment_group").index(c("#group_"+d.id)),f=c("#group_weight .group_weight").eq(e),g=c("#group_weight_blank").clone(!0).removeAttr("id");g.fillTemplateData({data:d,id:"group_weight_"+d.id}),g.find(".weight").val(d.group_weight).triggerHandler("change"),c("#group_weight tbody:first").prepend(g.show()),c("#group_weight tbody").sortable("refresh")}}),c("#class_weighting_policy").bind("checked",function(a){var b=c(this).attr("checked");c("#groups .assignment_group").find(".more_info_brief,.group_weight_percent").showIf(b)}),c("#group_weight .group_weight").hover(function(){c("#group_weight .group_weight_hover").removeClass("group_weight_hover"),c(this).addClass("group_weight_hover")},function(){}),c(document).bind("mouseover",function(a){c(a.target).closest("#group_weight").length===0&&c("#group_weight .group_weight_hover").removeClass("group_weight_hover"),c(a.target).closest(".assignment_group").length===0&&c(".group_assignment.assignment-hover").removeClass("assignment-hover")}),c("#group_weight").bind("weight_change",function(){var a=0;c("#group_weight .weight:visible").each(function(){var b=parseFloat(c(this).val(),10);isNaN(b)&&(b=0),a+=b}),c("#group_weight #group_weight_total").text(a+"%")}),c("#group_weight .weight").bind("change",function(a,b){var d=parseFloat(c(this).val(),10);isNaN(d)&&(d=0),c(this).val(d),c("#group_weight").triggerHandler("weight_change");if(b!==!1){var e=c(this);e.parents(".group_weight").loadingImage({image_size:"small"});var f=e.parents(".group_weight").getTemplateData({textValues:["id"]}).id,g=c("#group_"+f).find(".assignment_group_url").attr("href"),h={"assignment_group[group_weight]":e.val()};c.ajaxJSON(g,"PUT",h,function(a){e.parents(".group_weight").loadingImage("remove");var b=a.assignment_group.group_weight||0;e.val(b),e.triggerHandler("change",!1),c("#group_"+f).find(".group_weight").text(b)},function(a){e.parents(".group_weight").loadingImage("remove")})}}).each(function(){c(this).triggerHandler("change",!1)}),c("#group_weight tbody").sortable({handle:".move",scroll:!0,axis:"y",update:function(a){var b=[];c("#group_weight .group_weight").each(function(){var a=c(this).getTemplateData({textValues:["id"]});b.push(a.id)});var d={};d.order=b.join(",");var e=c(".reorder_groups_url").attr("href");c("#group_weight").loadingImage(),c.ajaxJSON(e,"POST",d,function(a){c("#group_weight").loadingImage("remove"),c(document).triggerHandler("group_reorder",a)},function(){c("#group_weight").loadingImage("remove")})}}),c("#class_weighting_policy").change(function(a,b){if(b){c(this).triggerHandler("checked");return}var d={},e=c(this).attr("checked");d["course[group_weighting_scheme]"]=e?"percent":"equal",c("#class_weighting_box").loadingImage({image_size:"small"}),c.ajaxJSON(c("#class_weighting_box .context_url").attr("href"),"PUT",d,function(a){var b=a.course;c("#group_weight").showIf(e);var d=!1;c("#group_weight .group_weight:visible").each(function(){var a=parseInt(c(this).find(".weight").val(),10);a&&(d=!0)});if(!d){var f=c("#group_weight .group_weight:visible").length,g=100/f;c("#group_weight .group_weight:visible").each(function(){c(this).find(".weight").val(g).triggerHandler("change")}),c("#group_weight .group_weight:visible:last").find(".weight").val(100-g*(f-1)).triggerHandler("change")}c("#class_weighting_box").loadingImage("remove"),e=b.group_weighting_scheme=="percent",c("#class_weighting_policy").attr("checked",e),c("#class_weighting_policy").triggerHandler("checked")})}).triggerHandler("change",!0),c(".more_info_link").click(function(a){a.preventDefault(),c(this).hide(),c(this).parents(".assignment_group").find(".hide_info_link").show().end().find(".more_info").show();var e="",f=c(this).parents(".assignment_group").find(".rules").text().split("\n");c.each(f,function(a,f){var g=f.split(":");if(g.length==2){var h=g[0],i=g[1];if(h=="drop_lowest")e+=d(b.t("drop_lowest_scores","Drop the Lowest %{number} Scores",{number:i}))+"<br/>";else if(h=="drop_highest")e+=d(b.t("drop_highest_scores","Drop the Highest %{number} Scores",{number:i}))+"<br/>";else if(h=="never_drop"){var j=c("#assignment_"+i).find(".title").text();e+=d(b.t("never_drop_scores","Never Drop %{assignment_name}",{assignment_name:j}))+"<br/>"}}}),c(this).parents(".assignment_group").find(".rule_details").html(e)}),c(".hide_info_link").click(function(a){a.preventDefault(),c(this).parents(".assignment_group").find(".more_info_link").show().end().find(".hide_info_link").hide().end().find(".more_info").hide()}),c(".group_assignment").hover(function(a){c(".assignment_group.group-hover").removeClass("group-hover"),c(this).parents(".assignment_group").addClass("group-hover"),c("#groups .assignment_group").length>1&&c(this).parents(".assignment_group").find(".edit_group_link:visible").length>0?c(this).parents(".assignment_group").find(".group_move_icon").show():c(this).parents(".assignment_group").find(".group_move_icon").hide(),c(".group_assignment.assignment-hover").removeClass("assignment-hover"),c(this).addClass("assignment-hover"),c("#groups .assignment_group").length>0&&c(this).find(".edit_assignment_link").css("display")!="none"?(c(this).find(".submitted_icon").hide(),c(this).find(".move_icon").show()):c(this).find(".move_icon").hide()},function(a){}),c(".add_group_link").click(function(a){a.preventDefault();if(c("#group_new").length>0&&c("#add_group_form").css("display")=="block")return;c("#group_blank .header .name").text(b.t("other_assignments","Other Assignments"));var d=c("#group_blank").clone(!0);d.find(".assignment_list").empty(),d.attr("id","group_new").find(".header .name").text(b.t("group_name","Group Name")),c("#groups").prepend(d.show()),d.find(".padding").show();var e=c("#class_weighting_policy").attr("checked");d.find(".assignment_list").sortable(q),c(".assignment_group .assignment_list").sortable("option","connectWith",".assignment_group .assignment_list"),i(d)}),c(".edit_group_link").click(function(a){a.preventDefault();var b=c(this).parents(".assignment_group");i(b)}),c("#delete_assignments_dialog").delegate(".delete_button","click",function(){var a=c("#delete_assignments_dialog"),d=a.data("group_id");$old_group=c("#group_"+d);var e={},f=a.getFormData();if(f.action=="move"){if(!f.group_id)return;e.move_assignments_to=f.group_id;var g=c("#group_"+f.group_id)}a.find("button").attr("disabled",!0).filter(".delete_button").text(b.t("status.deleting_group","Deleting Group..."));var h=$old_group.find(".delete_group_link").attr("href");c.ajaxJSON(h,"DELETE",e,function(d){r($old_group);if(d.new_assignment_group&&d.new_assignment_group.active_assignments)for(var e in d.new_assignment_group.active_assignments){var f=d.new_assignment_group.active_assignments[e];$assignment=c("#assignment_"+f.id),k($assignment,{assignment:f})}a.find("button").attr("disabled",!1).filter(".delete_button").text(b.t("buttons.delete_group","Delete Group")),a.dialog("close")},function(){a.find("button").attr("disabled",!1).filter(".delete_button").text(b.t("errors.deleting_group_failed","Delete Failed"))})}).delegate(".cancel_button","click",function(){c("#delete_assignments_dialog").dialog("close")}),c(".delete_group_link").click(function(a){a.preventDefault();var d=c(this).parents(".assignment_group"),e=d.find(".group_assignment:visible").length;if(e>0){var f=d.find(".header").getTemplateData({textValues:["assignment_group_id","name"]});f.assignment_count=b.t("number_of_assignments","assignment",{count:e});var g=c("#delete_assignments_dialog");g.fillTemplateData({data:f}),g.find("button").attr("disabled",!1).filter(".delete_button").text(b.t("buttons.delete_group","Delete Group")),g.find(".group_select option:not(.blank)").remove(),c(".assignment_group:visible").each(function(){if(c(this)[0]!=d[0]){var a=c(this).getTemplateData({textValues:["assignment_group_id","name"]}),b=c("<option/>").val(a.assignment_group_id||"").text(a.name);g.find(".group_select").append(b)}}),g.find(".group_select")[0].selectedIndex=0,g.find("#assignment_group_delete").attr("checked",!0),g.dialog("close").dialog({autoOpen:!1,width:500}).dialog("open").data("group_id",f.assignment_group_id);return}d.confirmDelete({message:b.t("confirm.delete_group","Are you sure you want to delete this group?"),url:c(this).attr("href"),success:function(){r(d)}})}),c("#add_group_form .cancel_button").click(function(){var a=c(this).parents(".assignment_group");h()}),c("#add_group_form").formSubmit({object_name:"assignment_group",processData:function(a){a=c(this).getFormData({object_name:"assignment_group"});var b=c(this).parents(".assignment_group").find(".header"),d=b.find(".form_rules .rule"),e="";return c.each(d,function(a,b){var d=c(b),f=d.find("select[name='rule_type']").val(),g=d.find("input[name='scores_to_drop']").val(),h=d.find("select[name='assignment_to_never_drop']").val();if(f=="never_drop"){if(h!="0"){var i=f+":"+h+"\n";e+=i}}else{var j=parseInt(g,10);if(!isNaN(j)&&isFinite(j)&&j>0){var i=f+":"+g+"\n";e+=i}}}),a.rules=e,a["assignment_group[rules]"]=a.rules,a},beforeSubmit:function(a){var b=c(this).parents(".assignment_group"),d=b.find(".header");return d.fillTemplateData({data:a,htmlValues:["rules"]}),d.loadingImage({image_size:"small"}),b.attr("id")=="group_new"&&b.attr("id","group_creating"),h(),b},success:function(a,b){var d=b.find(".header");d.loadingImage("remove");var e=a.assignment_group;b.attr("id")=="group_creating"&&c(document).triggerHandler("group_create",a),f(),e.assignment_group_id=e.id,b.attr("id","group_"+e.id),d.fillTemplateData({data:e,hrefValues:["id"]}),c("#group_weight_"+e.id).find(".weight").val(e.group_weight||0).triggerHandler("change",!1),b.toggleClass("assignment_group_editable",e.permissions&&e.permissions.update),c("#class_weighting_policy").trigger("change",!0),(c("#groups .assignment_group").length>1&&!e.permissions||!e.permissions["delete"])&&c("#groups .assignment_group .delete_group_link").show(),b.triggerHandler("group_update"),m()}}),c(".assignment_group").bind("group_update",function(){var a=c(this),b=a.getTemplateData({textValues:["rules"]}).rules;a.find(".more_info_link").showIf(b)}).each(function(){c(this).triggerHandler("group_update")}),c(".group_rule_type").change(function(a){var b=c(this).parents(".rule"),d=c(this).val();d=="never_drop"?b.find(".drop_scores").hide().end().find(".never_drop_assignment").show():b.find(".drop_scores").show().end().find(".never_drop_assignment").hide()}).val("drop_lowest").change();var s=0;c(".add_rule_link").click(function(a){a.preventDefault();var b=c("#assignment_group_rule_blank").clone(!0);b.attr("id",""),c("#add_group_form .form_rules").append(b.show())}),c(".delete_rule_link").click(function(a){a.preventDefault(),c(this).parents(".rule").remove()}),c(".add_assignment_link").click(function(a){a.preventDefault(),j(c(this).parents(".assignment_group"))}),c("#add_assignment_form input[name='assignment[due_date]']").datepicker({gotoCurrent:!0,onClose:function(){c("#add_assignment_form input[name='assignment[due_date]']").focus().select()}}),c("#add_assignment_form :input").formSuggestion(),c("#add_assignment_form").formSubmit({object_name:"assignment",required:["title"],processData:function(a){var b=c(this).getFormData({object_name:"assignment"});return b["assignment[due_at]"]&&(b["assignment[due_at]"]=c.datetime.process(b["assignment[due_at]"])),b},beforeSubmit:function(a){var b=c(this).parents(".group_assignment");b.fillTemplateData({data:a});var d=null;a["assignment[due_at]"]&&(d=Date.parse(a["assignment[due_at]"]));var f=0;d&&(f=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes())/1e3,due_time=d.toString("h:mmtt").toLowerCase(),due_time=="12:00am"&&(due_time=""),b.fillTemplateData({data:{due_date:c.dateString(d),due_time:due_time}})),b.find(".date_text").show();if(isNaN(f)||!isFinite(f)||!f)f=0,b.find(".date_text").hide();b.fillTemplateData({data:{timestamp:f,title:a.title}}),b.find(".points_text").showIf(a.points_possible),l(b.parents(".assignment_group"),b),b.find(".links").hide(),b.loadingImage({image_size:"small",paddingTop:5}),c("html,body").scrollToVisible(b);var g=!1;return b.attr("id")=="assignment_new"&&(g=!0,b.attr("id","assignment_creating")),e(),b},success:function(a,b){c(document).triggerHandler("assignment_update"),k(b,a)},error:function(a,b){}}),c("#add_assignment_form .cancel_button").click(function(){var a=c(this).parents(".group_assignment"),b=a.parents(".assignment_group");e(),c(".no_assignments_message").showIf(c(".group_assignment:visible").length==0)}),c(".delete_assignment_link").click(function(a){a.preventDefault();var d=c(this).parents(".group_assignment"),e=d.parents(".assignment_group");d.confirmDelete({message:b.t("confirm.delete_assignment","Are you sure you want to delete this assignment?"),url:c(this).attr("href"),success:function(){d.slideUp(function(){d.remove(),c(".no_assignments_message").showIf(c(".group_assignment:visible").length==0),e.find(".group_assignment").length===0&&e.find(".padding").show(),f()})}})}),c(".edit_assignment_link").click(function(a){a.preventDefault();var b=c(this).parents(".group_assignment");g(b)}),c(".show_date_link,.hide_date_link").click(function(a){a.preventDefault(),c(this).parents("form").find(".date_options").toggle(),c(".show_date_link").toggle(),o=!o}),c("#groups").sortable(p),c("#groups.groups_editable .assignment_group .assignment_list").sortable(q),c("#groups .assignment_group").length===0&&c("#group_blank .group_assignment").length===0&&j(),c("#add_assignment_form :text").keydown(function(a){a.keyCode==27&&e()}),c("#add_group_form :text").keydown(function(a){a.keyCode==27&&h()}),c("#edit_assignment_form").bind("assignment_updated",function(a,b){var d=c("#assignment_"+b.assignment.id);k(d,b)}),c(".preview_assignment_link").click(function(a){a.preventDefault();var d=c(this).parents(".group_assignment"),e=d.getTemplateData({textValues:["title","id","points_possible","due_date","due_time","due_date_string","due_time_string","submission_types","assignment_group_id","grading_type","min_score","max_score","mastery_score","unlock_at"]});e.description=d.find(".description").val()||b.t("assignment.default_content","No Content"),e.due_at=c.trim(e.due_date+" "+e.due_time),c("#full_assignment").fillTemplateData({data:e,htmlValues:["description"]}).find(".date_text").showIf(e.due_date&&e.due_date.length>0).end().find(".points_text").showIf(e.points_possible&&e.points_possible.length>0),c("#edit_assignment_form").fillFormData({data:e,object_name:"assignment"}).attr("action",d.find(".assignment_url").attr("href"));var f=Math.max(Math.round(c(window).height()*.8),400);c("#full_assignment_holder").dialog("close").dialog({title:b.t("titles.assignment_details","Assignment Details"),autoOpen:!1,width:630,height:f,modal:!0,close:function(){c("#full_assignment_holder #edit_assignment_form .cancel_button").click()},overlay:{backgroundColor:"#000",opacity:.7}}).dialog("open"),c("#full_assignment").show()}),c(document).keycodes("j k",function(a){a.preventDefault(),a.keyString=="j"?n("down"):a.keyString=="k"&&n("up")}),c(".assignment_group").keycodes("a e d m",function(a){a.preventDefault(),a.keyString=="a"?c(this).find(".add_assignment_link:visible:first").click():a.keyString=="e"?c(this).find(".edit_group_link:visible:first").click():a.keyString=="d"&&c(this).find(".delete_group_link:visible:first").click()}),c(".group_assignment").keycodes("f e d m",function(a){a.preventDefault(),a.stopPropagation(),a.keyString=="f"?c(this).find(".preview_assignment_link:visible:first").click():a.keyString=="e"?c(this).find(".edit_assignment_link:visible:first").click():a.keyString=="d"?c(this).find(".delete_assignment_link:visible:first").click():a.keyString!="m"}),c(document).click(function(a){c(a.target).closest(".assignment_group").length===0&&(c(".group_assignment.assignment-hover").removeClass("assignment-hover"),c(".assignment_group.group-hover").removeClass("group-hover"))}),c(".group_assignment .title").focus(function(a){c(this).parents(".group_assignment").triggerHandler("mouseover")}),c("#wizard_box").bind("wizard_opened",function(){c(this).find(".wizard_introduction").click()})})}),function(){require(["assignments"])}.call(this),define("compiled/bundles/assignments",function(){})