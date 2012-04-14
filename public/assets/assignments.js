I18n.scoped("assignments",function(h){function l(){var e=$("#add_assignment_form"),a=e.parents(".group_assignment"),b=a.parents(".assignment_group");e.find("").end().hide().appendTo($("body"));a.removeClass("editing");a.find(".content").show();a.attr("id")=="assignment_new"?a.remove():a.find(":tabbable:first").focus();b.find(".group_assignment").length===0&&b.find(".padding").show()}function n(){var e=$(".group_assignment:visible").length,a=$(".assignment_group:visible").length;$(".assignment_count").text(h.t("assignment_count",
"Assignment",{count:e}));$(".assignment_group_count").text(h.t("assignment_groups_count","Group",{count:a}))}function r(e){l();e.find(".content").hide().before($("#add_assignment_form").show());e.addClass("editing");var a=e.parents(".assignment_group"),b=a.getTemplateData({textValues:["default_assignment_name","assignment_group_id"]}),d=b.default_assignment_name;d+=" "+a.find(".group_assignment").length;a=e.find("#add_assignment_form");var c="Update",f=e.find(".edit_assignment_link").attr("href");
if(e.attr("id")=="assignment_new"){c="Add";f=$(".add_assignment_link.groupless_link:first").attr("href")}e.find(".more_options_link").attr("href",f);a.find("input[type='submit']").val(c);c=e.getTemplateData({textValues:["title","points_possible","due_date_string","due_time_string","assignment_group_id","submission_types"]});c.title=c.title||d;if(c.submission_types!="online_quiz"&&c.submission_types!="discussion_topic"){a.find(".assignment_submission_types .current_submission_types").val(c.submission_types);
a.find(".assignment_submission_types").val(c.submission_types)}c.assignment_group_id=b.assignment_group_id;c.due_time=c.due_time_string;c.due_date=c.due_date_string;b=Date.parse(c.due_date_string+" "+c.due_time_string);c.due_at="";if(b)c.due_at=b.toString($.datetime.defaultFormat);if(e.attr("id")=="assignment_new"){if(p){a.find(".date_options").show();a.find(".show_date_link").hide()}else{a.find(".date_options").hide();a.find(".show_date_link").show()}a.attr("action",$("#add_assignment .assignments_url").attr("href")).attr("method",
"POST")}else{if(c.due_time&&c.due_date){a.find(".date_options").show();a.find(".show_date_link").hide()}else{a.find(".date_options").hide();a.find(".show_date_link").show()}a.attr("action",e.find(".title").attr("href")).attr("method","PUT")}a.fillFormData(c,{object_name:"assignment"});a.find(":text:first").focus().select();$("html,body").scrollToVisible(e)}function m(){var e=$("#add_group_form"),a=e.parents(".assignment_group").find(".header");e.find("input[name='name']").val("").change().end().find(".form_rules").empty().end().hide().appendTo($("body"));
a.find(".hide_info_link").click();a.find(".header_content, .edit_group_link, .delete_group_link").show();a.parents(".assignment_group").attr("id")=="group_new"?a.parents(".assignment_group").remove():a.find(".group_name").focus()}function s(e){m();var a=e.getTemplateData({textValues:["name","assignment_group_id","group_weight","assignment_weighting_scheme","rules"]}),b=$("#add_group_form");b.find(".form_rules").empty();var d=(a.rules||"").split("\n"),c=b.find("#assignment_group_rule_blank .assignment_to_never_drop");
c.empty();if(e.find(".group_assignment").length>0){var f=$(document.createElement("option"));f.val("0").text(h.t("select_assignment","[Select Assignment]"));c.append(f);e.find(".group_assignment").each(function(){f=$(document.createElement("option"));var g=$(this).getTemplateData({textValues:["id","title"]});f.val(g.id).text(g.title);c.append(f)})}else{f=$(document.createElement("option"));f.val("0").text(h.t("no_assignments","[No Assignments]"));c.append(f)}c.val("0");$.each(d,function(g,i){var j=
i.split(":");if(j.length==2){var k=b.find("#assignment_group_rule_blank").clone(true);k.attr("id","");b.find(".form_rules").append(k.show());k.find("select[name='rule_type']").val(j[0]).change();if(j[0]=="never_drop"){k.find("input[name='scores_to_drop']").val("");k.find("select[name='assignment_to_never_drop']").val(j[1])}else{k.find("input[name='scores_to_drop']").val(j[1]);k.find("select[name='assignment_to_never_drop']").val("0")}}});c=b.find(".assignment_to_never_drop");e.find(".header_content").hide().before(b.show());
$("#class_weighting_policy").attr("checked")?e.find("#add_group_form .percent_weighting").show().end().find("#add_group_form .weighting").hide():e.find(".percent_weighting").hide().end().find(".weighting").hide();b.fillFormData(a,{object_name:"assignment_group"});e.attr("id")=="group_new"?b.attr("action",$("#add_group .assignment_groups_url").attr("href")).attr("method","POST"):b.attr("action",e.find(".assignment_group_url").attr("href")).attr("method","PUT");b.find(":text:first").focus().select()}
function t(e){$(document).triggerHandler("add_assignment");if(!e||e.length===0){e=$(".assignment_groups_select").val();e=$("#"+e);if(e.length===0)e=$("#groups .assignment_group:first")}if(e.length!==0){if($("#assignment_new").length>0){if($("#assignment_new").parents(".assignment_group")[0]==e[0]){$("#assignment_new :text:first").focus().select();return}l()}$(".no_assignments_message").hide();var a=$("#assignment_blank").clone(true);a.attr("id","assignment_new");e.find(".assignment_list").prepend(a);
e.find(".padding").hide();e.find(".assignment_list").sortable("refresh");a.slideDown("fast",function(){$(this).find(":text:first").focus().select()});r(a)}}function q(e,a){var b=a.assignment,d=e.attr("id");if(d=="assignment_new"||d=="assignment_creating")n();if(b.due_at){d=$.parseFromISO(b.due_at,"due_date");b.due_date=d.date_formatted;b.due_time=d.time_formatted;b.timestamp=d.timestamp;b.due_date_string=$.datepicker.formatDate("mm/dd/yy",d.date);b.due_time_string=d.time_string;e.find(".date_text").show()}else{e.find(".date_text").hide();
b.timestamp=0}e.find(".assignment_title").find(".title").attr("title",b.title);e.find(".points_text").showIf(b.points_possible);e.loadingImage("remove");if(!b.timestamp)b.timestamp=0;e.attr("id");e.fillTemplateData({id:"assignment_"+b.id,data:b,hrefValues:["id"]});e.find(".description").val(b.description);e.find(".links,.move").css("display","");e.toggleClass("group_assignment_editable",b.permissions&&b.permissions.update);u($("#group_"+b.assignment_group_id),e);$("html,body").scrollToVisible(e)}
function u(e,a){var b=a.getTemplateData({textValues:["timestamp","title","position"]}),d=false;b.position=Number(b.position);e.find(".assignment_list .group_assignment").each(function(){if(!($(this).attr("id")===a.attr("id")||$(this).attr("id")==="assignment_new")){var c=$(this).getTemplateData({textValues:["timestamp","title","position"]});if(b.position<c.position||b.position==c.position&&b.timestamp<c.timestamp||b.position==c.position&&b.timestamp==c.timestamp&&b.title<c.title){d=true;$(this).before(a);
return false}}});d||e.find(".assignment_list").append(a)}function v(){var e=$(".assignment_groups_select"),a=e.val();e.empty();$(".assignment_group:visible").each(function(){var b=$(this).attr("id"),d=$(this).getTemplateData({textValues:["name"]}).name;b=$(document.createElement("option")).val(b).text(d);e.append(b)});e.val(a)}function w(e){var a=$(".group_assignment.assignment-hover:first"),b=$(".assignment_group.group-hover:first");if(b.length===0){b=$(".assignment_group:visible:first");b.addClass("group-hover");
b.find(".group_name").focus()}else{var d=a,c=null;if(a.length===0)if(e=="up"){c=b.prev(".assignment_group:visible");d=c.find(".group_assignment:visible:last")}else d=b.find(".group_assignment:visible:first");else if(e=="up"){d=a.prev(".group_assignment:visible");if(d.length===0){d=null;b.find(".group_name").focus()}}else{d=a.next(".group_assignment:visible");if(d.length===0){c=b.next(".assignment_group:visible");if(c.length===0){c=null;d=a}}}a.removeClass("assignment-hover");if(c){if(c.length===0)c=
b;b.removeClass("group-hover");c.addClass("group-hover");c.find(".group_name").focus();if(d.length>0&&d.parents(".assignment_group")[0]==c[0]){d.addClass("assignment-hover");d.find(":tabbabble:first").focus()}}else if(d){d.addClass("assignment-hover");d.find(":tabbable:first").focus()}}}var p=false,x={handle:".group_move, .group_move_icon",scroll:true,axis:"y",start:function(e,a){var b=a.item.outerWidth();a.helper.width(b)},update:function(e){var a=$(e.target).parents(".assignment_group").css("width",
""),b=[];$("#groups .assignment_group").each(function(){var c=$(this).getTemplateData({textValues:["assignment_group_id"]});$(this)[0]!=a[0]&&b.push(c.assignment_group_id)});e={};e.order=b.join(",");var d=$(".reorder_groups_url").attr("href");$.ajaxJSON(d,"POST",e,function(c){$(document).triggerHandler("group_reorder",c)})}},o={items:".group_assignment",connectWith:".assignment_group .assignment_list",handle:".move_icon, .move",axis:"y",opacity:0.8,scroll:true,containment:"#content",update:function(e,
a){var b=$(a.item).parents(".assignment_group"),d=b.find(".reorder_assignments_url").attr("href"),c=[];b.find(".assignment_list .group_assignment").each(function(g){$(this).find(".position").text(g+1);c.push($(this).getTemplateData({textValues:["id"]}).id)});b=c.join(",");var f=[d,b].join("-");if(o.lastUpdate!==f){o.lastUpdate=f;$.ajaxJSON(d,"POST",{order:b})}}};$(document).ready(function(){function e(a){var b=a.find(".header").getTemplateData({textValues:["assignment_group_id"]}).assignment_group_id;
m();a.slideUp("normal",function(){$(this).remove();v();$("#group_weight_"+b).remove();$("#group_weight .group_weight:visible:first .weight").triggerHandler("change",false);n();$("#groups .assignment_group").length<=1&&$("#groups .assignment_group .delete_group_link").hide()})}$("#add_assignment_form .more_options_link").click(function(a){a.preventDefault();a=$(this).attr("href").split("#");var b=$(this).parents("form").getFormData({object_name:"assignment"}),d={};if(b.title)d.title=b.title;if(b.due_at)d.due_at=
b.due_at;if(b.points_possible)d.points_possible=b.points_possible;if(b.assignment_group_id)d.assignment_group_id=b.assignment_group_id;if(b.submission_types)d.submission_types=b.submission_types;d.model_key=Math.round(Math.random()*999999);if(INST&&INST.gettingStartedPage)d.getting_started="1";d.return_to=location.href;a[0]+="?"+$.param(d);location.href=a.join("#")});$(".datetime_field").datetime_field();$(document).bind("group_reorder",function(a,b){if(b&&b.order)for(var d in b.order){var c=b.order[d];
$("#groups").append($("#group_"+c));$("#group_weight tbody:first").append($("#group_weight_"+c))}});$(document).bind("group_create",function(a,b){if(b&&b.assignment_group){var d=b.assignment_group,c=$("#groups .assignment_group").index($("#group_"+d.id));$("#group_weight .group_weight").eq(c);c=$("#group_weight_blank").clone(true).removeAttr("id");c.fillTemplateData({data:d,id:"group_weight_"+d.id});c.find(".weight").val(d.group_weight).triggerHandler("change");$("#group_weight tbody:first").prepend(c.show());
$("#group_weight tbody").sortable("refresh")}});$("#class_weighting_policy").bind("checked",function(){var a=$(this).attr("checked");$("#groups .assignment_group").find(".more_info_brief,.group_weight_percent").showIf(a)});$("#group_weight .group_weight").hover(function(){$("#group_weight .group_weight_hover").removeClass("group_weight_hover");$(this).addClass("group_weight_hover")},function(){});$(document).bind("mouseover",function(a){$(a.target).closest("#group_weight").length===0&&$("#group_weight .group_weight_hover").removeClass("group_weight_hover");
$(a.target).closest(".assignment_group").length===0&&$(".group_assignment.assignment-hover").removeClass("assignment-hover")});$("#group_weight").bind("weight_change",function(){var a=0;$("#group_weight .weight:visible").each(function(){var b=parseFloat($(this).val(),10);if(isNaN(b))b=0;a+=b});$("#group_weight #group_weight_total").text(a+"%")});$("#group_weight .weight").bind("change",function(a,b){var d=parseFloat($(this).val(),10);if(isNaN(d))d=0;$(this).val(d);$("#group_weight").triggerHandler("weight_change");
if(b!==false){var c=$(this);c.parents(".group_weight").loadingImage({image_size:"small"});var f=c.parents(".group_weight").getTemplateData({textValues:["id"]}).id;d=$("#group_"+f).find(".assignment_group_url").attr("href");var g={"assignment_group[group_weight]":c.val()};$.ajaxJSON(d,"PUT",g,function(i){c.parents(".group_weight").loadingImage("remove");i=i.assignment_group.group_weight||0;c.val(i);c.triggerHandler("change",false);$("#group_"+f).find(".group_weight").text(i)},function(){c.parents(".group_weight").loadingImage("remove")})}}).each(function(){$(this).triggerHandler("change",
false)});$("#group_weight tbody").sortable({handle:".move",scroll:true,axis:"y",update:function(){var a=[];$("#group_weight .group_weight").each(function(){var c=$(this).getTemplateData({textValues:["id"]});a.push(c.id)});var b={};b.order=a.join(",");var d=$(".reorder_groups_url").attr("href");$("#group_weight").loadingImage();$.ajaxJSON(d,"POST",b,function(c){$("#group_weight").loadingImage("remove");$(document).triggerHandler("group_reorder",c)},function(){$("#group_weight").loadingImage("remove")})}});
$("#class_weighting_policy").change(function(a,b){if(b)$(this).triggerHandler("checked");else{var d={},c=$(this).attr("checked");d["course[group_weighting_scheme]"]=c?"percent":"equal";$("#class_weighting_box").loadingImage({image_size:"small"});$.ajaxJSON($("#class_weighting_box .context_url").attr("href"),"PUT",d,function(f){f=f.course;$("#group_weight").showIf(c);var g=false;$("#group_weight .group_weight:visible").each(function(){if(parseInt($(this).find(".weight").val(),10))g=true});if(!g){var i=
$("#group_weight .group_weight:visible").length,j=100/i;$("#group_weight .group_weight:visible").each(function(){$(this).find(".weight").val(j).triggerHandler("change")});$("#group_weight .group_weight:visible:last").find(".weight").val(100-j*(i-1)).triggerHandler("change")}$("#class_weighting_box").loadingImage("remove");c=f.group_weighting_scheme=="percent";$("#class_weighting_policy").attr("checked",c);$("#class_weighting_policy").triggerHandler("checked")})}}).triggerHandler("change",true);$(".more_info_link").click(function(a){a.preventDefault();
$(this).hide();$(this).parents(".assignment_group").find(".hide_info_link").show().end().find(".more_info").show();var b="";a=$(this).parents(".assignment_group").find(".rules").text().split("\n");$.each(a,function(d,c){var f=c.split(":");if(f.length==2){var g=f[0];f=f[1];if(g=="drop_lowest")b+=$.htmlEscape(h.t("drop_lowest_scores","Drop the Lowest %{number} Scores",{number:f}))+"<br/>";else if(g=="drop_highest")b+=$.htmlEscape(h.t("drop_highest_scores","Drop the Highest %{number} Scores",{number:f}))+
"<br/>";else if(g=="never_drop"){g=$("#assignment_"+f).find(".title").text();b+=$.htmlEscape(h.t("never_drop_scores","Never Drop %{assignment_name}",{assignment_name:g}))+"<br/>"}}});$(this).parents(".assignment_group").find(".rule_details").html(b)});$(".hide_info_link").click(function(a){a.preventDefault();$(this).parents(".assignment_group").find(".more_info_link").show().end().find(".hide_info_link").hide().end().find(".more_info").hide()});$(".group_assignment").hover(function(){$(".assignment_group.group-hover").removeClass("group-hover");
$(this).parents(".assignment_group").addClass("group-hover");$("#groups .assignment_group").length>1&&$(this).parents(".assignment_group").find(".edit_group_link:visible").length>0?$(this).parents(".assignment_group").find(".group_move_icon").show():$(this).parents(".assignment_group").find(".group_move_icon").hide();$(".group_assignment.assignment-hover").removeClass("assignment-hover");$(this).addClass("assignment-hover");if($("#groups .assignment_group").length>0&&$(this).find(".edit_assignment_link").css("display")!=
"none"){$(this).find(".submitted_icon").hide();$(this).find(".move_icon").show()}else $(this).find(".move_icon").hide()},function(){});$(".add_group_link").click(function(a){a.preventDefault();if(!($("#group_new").length>0&&$("#add_group_form").css("display")=="block")){$("#group_blank .header .name").text(h.t("other_assignments","Other Assignments"));a=$("#group_blank").clone(true);a.find(".assignment_list").empty();a.attr("id","group_new").find(".header .name").text(h.t("group_name","Group Name"));
$("#groups").prepend(a.show());a.find(".padding").show();$("#class_weighting_policy").attr("checked");a.find(".assignment_list").sortable(o);$(".assignment_group .assignment_list").sortable("option","connectWith",".assignment_group .assignment_list");s(a)}});$(".edit_group_link").click(function(a){a.preventDefault();a=$(this).parents(".assignment_group");s(a)});$("#delete_assignments_dialog").delegate(".delete_button","click",function(){var a=$("#delete_assignments_dialog"),b=a.data("group_id");$old_group=
$("#group_"+b);b={};var d=a.getFormData();if(d.action=="move")if(d.group_id){b.move_assignments_to=d.group_id;$("#group_"+d.group_id)}else return;a.find("button").attr("disabled",true).filter(".delete_button").text(h.t("status.deleting_group","Deleting Group..."));d=$old_group.find(".delete_group_link").attr("href");$.ajaxJSON(d,"DELETE",b,function(c){e($old_group);if(c.new_assignment_group&&c.new_assignment_group.active_assignments)for(var f in c.new_assignment_group.active_assignments){var g=c.new_assignment_group.active_assignments[f];
$assignment=$("#assignment_"+g.id);q($assignment,{assignment:g})}a.find("button").attr("disabled",false).filter(".delete_button").text(h.t("buttons.delete_group","Delete Group"));a.dialog("close")},function(){a.find("button").attr("disabled",false).filter(".delete_button").text(h.t("errors.deleting_group_failed","Delete Failed"))})}).delegate(".cancel_button","click",function(){$("#delete_assignments_dialog").dialog("close")});$(".delete_group_link").click(function(a){a.preventDefault();var b=$(this).parents(".assignment_group");
a=b.find(".group_assignment:visible").length;if(a>0){var d=b.find(".header").getTemplateData({textValues:["assignment_group_id","name"]});d.assignment_count=h.t("number_of_assignments","assignment",{count:a});var c=$("#delete_assignments_dialog");c.fillTemplateData({data:d});c.find("button").attr("disabled",false).filter(".delete_button").text(h.t("buttons.delete_group","Delete Group"));c.find(".group_select option:not(.blank)").remove();$(".assignment_group:visible").each(function(){if($(this)[0]!=
b[0]){var f=$(this).getTemplateData({textValues:["assignment_group_id","name"]});f=$("<option/>").val(f.assignment_group_id||"").text(f.name);c.find(".group_select").append(f)}});c.find(".group_select")[0].selectedIndex=0;c.find("#assignment_group_delete").attr("checked",true);c.dialog("close").dialog({autoOpen:false,width:500}).dialog("open").data("group_id",d.assignment_group_id)}else b.confirmDelete({message:h.t("confirm.delete_group","Are you sure you want to delete this group?"),url:$(this).attr("href"),
success:function(){e(b)}})});$("#add_group_form .cancel_button").click(function(){$(this).parents(".assignment_group");m()});$("#add_group_form").formSubmit({object_name:"assignment_group",processData:function(a){a=$(this).getFormData({object_name:"assignment_group"});var b=$(this).parents(".assignment_group").find(".header").find(".form_rules .rule"),d="";$.each(b,function(c,f){var g=$(f),i=g.find("select[name='rule_type']").val(),j=g.find("input[name='scores_to_drop']").val();g=g.find("select[name='assignment_to_never_drop']").val();
if(i=="never_drop"){if(g!="0")d+=i+":"+g+"\n"}else{g=parseInt(j,10);if(!isNaN(g)&&isFinite(g)&&g>0)d+=i+":"+j+"\n"}});a.rules=d;a["assignment_group[rules]"]=a.rules;return a},beforeSubmit:function(a){var b=$(this).parents(".assignment_group"),d=b.find(".header");d.fillTemplateData({data:a,htmlValues:["rules"]});d.loadingImage({image_size:"small"});b.attr("id")=="group_new"&&b.attr("id","group_creating");m();return b},success:function(a,b){var d=b.find(".header");d.loadingImage("remove");var c=a.assignment_group;
b.attr("id")=="group_creating"&&$(document).triggerHandler("group_create",a);n();c.assignment_group_id=c.id;b.attr("id","group_"+c.id);d.fillTemplateData({data:c,hrefValues:["id"]});$("#group_weight_"+c.id).find(".weight").val(c.group_weight||0).triggerHandler("change",false);b.toggleClass("assignment_group_editable",c.permissions&&c.permissions.update);$("#class_weighting_policy").trigger("change",true);if($("#groups .assignment_group").length>1&&!c.permissions||!c.permissions["delete"])$("#groups .assignment_group .delete_group_link").show();
b.triggerHandler("group_update");v()}});$(".assignment_group").bind("group_update",function(){var a=$(this),b=a.getTemplateData({textValues:["rules"]}).rules;a.find(".more_info_link").showIf(b)}).each(function(){$(this).triggerHandler("group_update")});$(".group_rule_type").change(function(){var a=$(this).parents(".rule");$(this).val()=="never_drop"?a.find(".drop_scores").hide().end().find(".never_drop_assignment").show():a.find(".drop_scores").show().end().find(".never_drop_assignment").hide()}).val("drop_lowest").change();
$(".add_rule_link").click(function(a){a.preventDefault();a=$("#assignment_group_rule_blank").clone(true);a.attr("id","");$("#add_group_form .form_rules").append(a.show())});$(".delete_rule_link").click(function(a){a.preventDefault();$(this).parents(".rule").remove()});$(".add_assignment_link").click(function(a){a.preventDefault();t($(this).parents(".assignment_group"))});$("#add_assignment_form input[name='assignment[due_date]']").datepicker({gotoCurrent:true,onClose:function(){$("#add_assignment_form input[name='assignment[due_date]']").focus().select()}});
$("#add_assignment_form :input").formSuggestion();$("#add_assignment_form").formSubmit({object_name:"assignment",required:["title"],processData:function(){var a=$(this).getFormData({object_name:"assignment"});if(a["assignment[due_at]"])a["assignment[due_at]"]=$.datetime.process(a["assignment[due_at]"]);return a},beforeSubmit:function(a){var b=$(this).parents(".group_assignment");b.fillTemplateData({data:a});var d=null;if(a["assignment[due_at]"])d=Date.parse(a["assignment[due_at]"]);var c=0;if(d){c=
Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes())/1E3;due_time=d.toString("h:mmtt").toLowerCase();if(due_time=="12:00am")due_time="";b.fillTemplateData({data:{due_date:$.dateString(d),due_time:due_time}})}b.find(".date_text").show();if(isNaN(c)||!isFinite(c)||!c){c=0;b.find(".date_text").hide()}b.fillTemplateData({data:{timestamp:c,title:a.title}});b.find(".points_text").showIf(a.points_possible);u(b.parents(".assignment_group"),b);b.find(".links").hide();b.loadingImage({image_size:"small",
paddingTop:5});$("html,body").scrollToVisible(b);b.attr("id")=="assignment_new"&&b.attr("id","assignment_creating");l();return b},success:function(a,b){$(document).triggerHandler("assignment_update");q(b,a)},error:function(){}});$("#add_assignment_form .cancel_button").click(function(){$(this).parents(".group_assignment").parents(".assignment_group");l();$(".no_assignments_message").showIf($(".group_assignment:visible").length==0)});$(".delete_assignment_link").click(function(a){a.preventDefault();
var b=$(this).parents(".group_assignment"),d=b.parents(".assignment_group");b.confirmDelete({message:h.t("confirm.delete_assignment","Are you sure you want to delete this assignment?"),url:$(this).attr("href"),success:function(){b.slideUp(function(){b.remove();$(".no_assignments_message").showIf($(".group_assignment:visible").length==0);d.find(".group_assignment").length===0&&d.find(".padding").show();n()})}})});$(".edit_assignment_link").click(function(a){a.preventDefault();a=$(this).parents(".group_assignment");
r(a)});$(".show_date_link,.hide_date_link").click(function(a){a.preventDefault();$(this).parents("form").find(".date_options").toggle();$(".show_date_link").toggle();p=!p});$("#groups").sortable(x);$("#groups.groups_editable .assignment_group .assignment_list").sortable(o);$("#groups .assignment_group").length===0&&$("#group_blank .group_assignment").length===0&&t();$("#add_assignment_form :text").keydown(function(a){a.keyCode==27&&l()});$("#add_group_form :text").keydown(function(a){a.keyCode==27&&
m()});$("#edit_assignment_form").bind("assignment_updated",function(a,b){var d=$("#assignment_"+b.assignment.id);q(d,b)});$(".preview_assignment_link").click(function(a){a.preventDefault();a=$(this).parents(".group_assignment");var b=a.getTemplateData({textValues:["title","id","points_possible","due_date","due_time","due_date_string","due_time_string","submission_types","assignment_group_id","grading_type","min_score","max_score","mastery_score","unlock_at"]});b.description=a.find(".description").val()||
h.t("assignment.default_content","No Content");b.due_at=$.trim(b.due_date+" "+b.due_time);$("#full_assignment").fillTemplateData({data:b,htmlValues:["description"]}).find(".date_text").showIf(b.due_date&&b.due_date.length>0).end().find(".points_text").showIf(b.points_possible&&b.points_possible.length>0);$("#edit_assignment_form").fillFormData({data:b,object_name:"assignment"}).attr("action",a.find(".assignment_url").attr("href"));a=Math.max(Math.round($(window).height()*0.8),400);$("#full_assignment_holder").dialog("close").dialog({title:h.t("titles.assignment_details",
"Assignment Details"),autoOpen:false,width:630,height:a,modal:true,close:function(){$("#full_assignment_holder #edit_assignment_form .cancel_button").click()},overlay:{backgroundColor:"#000",opacity:0.7}}).dialog("open");$("#full_assignment").show()});$(document).keycodes("j k",function(a){a.preventDefault();if(a.keyString=="j")w("down");else a.keyString=="k"&&w("up")});$(".assignment_group").keycodes("a e d m",function(a){a.preventDefault();if(a.keyString=="a")$(this).find(".add_assignment_link:visible:first").click();
else if(a.keyString=="e")$(this).find(".edit_group_link:visible:first").click();else a.keyString=="d"&&$(this).find(".delete_group_link:visible:first").click()});$(".group_assignment").keycodes("f e d m",function(a){a.preventDefault();a.stopPropagation();if(a.keyString=="f")$(this).find(".preview_assignment_link:visible:first").click();else if(a.keyString=="e")$(this).find(".edit_assignment_link:visible:first").click();else a.keyString=="d"&&$(this).find(".delete_assignment_link:visible:first").click()});
$(document).click(function(a){if($(a.target).closest(".assignment_group").length===0){$(".group_assignment.assignment-hover").removeClass("assignment-hover");$(".assignment_group.group-hover").removeClass("group-hover")}});$(".group_assignment .title").focus(function(){$(this).parents(".group_assignment").triggerHandler("mouseover")});$("#wizard_box").bind("wizard_opened",function(){$(this).find(".wizard_introduction").click()})})});
$.extend(true,I18n=I18n||{},{translations:{es:{assignments:{group_name:"Nombre del Grupo",drop_lowest_scores:"Elimine las %{number} Calificaciones Menores",buttons:{delete_group:"Borrar el Grupo"},assignment:{default_content:"Sin Contenido"},assignment_groups_count:{one:"1 Grupo",other:"%{count} Grupos"},confirm:{delete_assignment:"\u00bfSeguro que quiere borrar esta tarea?",delete_group:"\u00bfSeguro que quiere borrar este grupo?"},drop_highest_scores:"Elimine las %{number} Calificaciones Mayores",
errors:{deleting_group_failed:"El Borrado Fall\u00f3"},select_assignment:"[Seleccionar Tareas]",titles:{assignment_details:"Detalles de la Tarea"},other_assignments:"Otras Tareas",no_assignments:"[Sin Tareas]",status:{deleting_group:"Borrando el Grupo..."},assignment_count:{one:"1 Tarea",other:"%{count} Tareas"},number_of_assignments:{one:"1 tarea",other:"%{count} tareas"},never_drop_scores:"Nunca Eliminar %{assignment_name}"}}}});
