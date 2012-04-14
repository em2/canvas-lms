var datagrid={};
(function(){datagrid={columns:[],rows:[],dataRows:[],dataFragment:document.createDocumentFragment(),cells:{},divs:{},init:function(b,c){var a=c.onReady,e=c.tick,d=c.maxWidth||150;datagrid.borderSize=c.borderSize||1;if(c.scroll&&$.isFunction(c.scroll))datagrid.scrollCallback=c.scroll;datagrid.table=b;datagrid.toggleCallback=c.toggle;var j=b.find("tr:first td"),h=b.find("tr"),k=0;j.each(function(i){i=datagrid.columns[i]=$(this);i.metrics={width:Math.min(i.width(),d),outerWidth:Math.min(i.outerWidth(),d+
1)};k+=i.metrics.outerWidth});var g=0;h.each(function(i){i=datagrid.rows[i]=$(this);i.metrics={outerHeight:i.find("td:first").outerHeight(),height:i.find("td:first").height()};g+=i.metrics.height});e&&$.isFunction(e)&&e();datagrid.divs.all=$(".datagrid");datagrid.divs.topleft=$("#datagrid_topleft");datagrid.divs.left=$("#datagrid_left");datagrid.divs.top=$("#datagrid_top");datagrid.divs.data=$("#datagrid_data");datagrid.divs.filler=$("#datagrid_filler");datagrid.divs.topleft.width(datagrid.columns[0].metrics.width+
datagrid.borderSize);datagrid.divs.left.width(datagrid.columns[0].metrics.width+datagrid.borderSize);datagrid.divs.filler.width(k-datagrid.columns[0].metrics.width);datagrid.divs.top.height(datagrid.rows[0].metrics.height+datagrid.borderSize);datagrid.divs.topleft.height(datagrid.rows[0].metrics.height+datagrid.borderSize);datagrid.divs.filler.height(g-datagrid.rows[0].metrics.height);datagrid._initializeListeners();datagrid._templateCellHTML=c.templateCellHTML;datagrid.sizeToWindow();$(window).resize(datagrid.sizeToWindow);
var f=datagrid._createRow(0,true);f.append(datagrid._createCell(0,0,b.find("tr:first td:first")));datagrid.divs.topleft.children(".content:first").append(f);f=datagrid._createRow(0);f.width(k-datagrid.columns[0].metrics.outerWidth);b.find("tr:first").children("td:not(:first)").each(function(i){f.append(datagrid._createCell(0,i+1,$(this)))});datagrid.divs.top.children(".content:first").append(f);e&&$.isFunction(e)&&e();var l=false,m=function(i){if(!l){f=datagrid._createRow(i+1,true);f.append(datagrid._createCell(i+
1,0,$(this).find("td:first")));datagrid.divs.left.children(".content:first").append(f)}f=datagrid._createRow(i+1);$(this).children("td:not(:first)").each(function(q){datagrid._createCell(i+1,q+1,$(this));datagrid._placeDataCell(i+1,q+1)});datagrid._placeDataRow(i+1)},n=[],o=0;b.find("tr:not(:first)").each(function(i){var q=0;f=datagrid._createRow(i+1,true);f.append(datagrid._createCell(i+1,0,$(this).find("td:first")));datagrid.divs.left.children(".content:first").append(f);f=datagrid._createRow(i+
1);f.width(k-datagrid.columns[0].metrics.outerWidth);$(this).children("td:not(:first)").each(function(s){q+=datagrid.columns[s+1].metrics.width});datagrid._placeDataRow(i+1);o+=datagrid.rows[i+1].metrics.height;n.push($(this))});l=true;datagrid._placeDataFragment();c&&c.onViewable&&$.isFunction(c.onViewable)&&c.onViewable.call(this);var p=0,r=function(i){try{e&&$.isFunction(e)&&i&&e();if(p<n.length){i=p;p++;m.call(n[i],i);setTimeout(function(){r(true)},1)}else if(i&&!r.finished){r.finished=true;datagrid.initialized=
true;b.hide();datagrid.ready&&$.isFunction(datagrid.ready)&&datagrid.ready();a&&$.isFunction(a)&&a();if(INST.browser.ff){var q=$("#datagrid_top"),s=q.find(".row"),y=s.add("#datagrid_data .row"),w=function(){var z=q.width();q.width(99999999);s.css({position:"relative",width:""});var A=s.width()+1;q.width(z);s.css("position","");y.width(A)};w();var x;$(window).resize(function(){clearTimeout(x);x=setTimeout(w,100)})}}}catch(B){INST.log_error({message:B.toString()})}};setTimeout(function(){r(true)},5);
setTimeout(function(){r(false)},5);setTimeout(function(){r(false)},5);setTimeout(function(){r(false)},5);var t=datagrid.divs.top.children(".content:first"),u=datagrid.divs.left.children(".content:first"),v=false;setInterval(function(){if(v){if(t.length===0)t=datagrid.divs.top.children(".content:first");if(u.length===0)u=datagrid.divs.left.children(".content:first");t.css("left",0-datagrid.divs.data.scrollLeft());u.css("top",0-datagrid.divs.data.scrollTop());datagrid.scrollCallback&&datagrid.scrollCallback();
v=false}},100);datagrid.divs.data.bind("scroll",function(){v=true});datagrid.mouseHasMoved=true;$(document).mousemove(function(){datagrid.mouseHasMoved=true});$(document).keycodes("up down left right tab shift+tab",function(i){if(!($(i.target).closest(".ui-dialog").length>0)){i.preventDefault();i.stopPropagation();if(i.keyString=="right"||i.keyString=="tab")datagrid.moveRight();else if(i.keyString=="down")datagrid.moveDown();else if(i.keyString=="up")datagrid.moveUp();else if(i.keyString=="left"||
i.keyString=="shift+tab")datagrid.moveLeft()}})},_initializeListeners:function(){datagrid.divs.all.delegate(".cell","mousemove",datagrid._cellMove).delegate(".cell","mouseover",datagrid._cellOver).delegate(".cell","mouseout",datagrid._cellOut).delegate(".cell","click",datagrid._cellClick)},titles:function(b){var c=[],a;for(a in b)c.push(datagrid.cells["0,"+b[a]].find(".assignment_title").text()||"--")},reorderColumns:function(b){for(var c={},a=[],e=[],d=0;d<b.length;d++)e[d]=d;for(var j=0;j<b.length;j++){var h=
b[j];for(d=0;d<datagrid.rows.length;d++){var k=datagrid.cells[d+","+h];if(e[j]!=h)e[j]<h?datagrid.cells[d+","+e[j]].before(k):datagrid.cells[d+","+e[j]].after(k);c[d+","+j]=datagrid.cells[d+","+h];c[d+","+j].column=j;c[d+","+j].data("datagrid_position",{row:d,column:j});c[d+","+j].data("column",j);a[j]=datagrid.columns[h]}k=-1;for(d=0;d<e.length;d++)if(e[d]==h)k=d;if(j!=k)if(j<k){e.splice(j,0,h);e.splice(k+1,1)}else{e.splice(j,0,h);e.splice(k,1)}}datagrid.cells=c;datagrid.columns=a},reorderRows:function(b){for(var c=
{},a=[],e=[],d=0;d<b.length;d++)e[d]=d;for(var j=0,h=0;h<b.length;h++){var k=b[h];d=datagrid.cells[k+",0"].parents(".row");var g=datagrid.cells[k+",1"].parents(".row");g.css("top",j);d.css("top",j);if(h>0)j=j+datagrid.rows[k].metrics.height+1;if(e[h]!=k)if(e[h]<k){datagrid.cells[e[h]+",0"].parents(".row").before(d);datagrid.cells[e[h]+",1"].parents(".row").before(g)}else{datagrid.cells[e[h]+",0"].parents(".row").after(d);datagrid.cells[e[h]+",1"].parents(".row").after(g)}a[h]=datagrid.rows[k];for(d=
0;d<datagrid.columns.length;d++){c[h+","+d]=datagrid.cells[k+","+d];c[h+","+d].row=h;c[h+","+d].data("datagrid_position",{row:h,column:d});c[h+","+d].data("row",h);a[h]=datagrid.rows[k]}g=-1;for(d=0;d<e.length;d++)if(e[d]==k)g=d;if(h!=g)if(h<g){e.splice(h,0,k);e.splice(g+1,1)}else{e.splice(h,0,k);e.splice(g,1)}}datagrid.cells=c;datagrid.rows=a},moveColumn:function(b,c){new_order=[];if(!(b==0||c==0||b==c)){for(var a=0;a<datagrid.columns.length;a++)if(a==c)new_order.push(b);else if(a>=c&&a<=b||a<=c&&
a>=b)c<b?new_order.push(a-1):new_order.push(a+1);else new_order.push(a);datagrid.reorderColumns(new_order)}},_placeDataCell:function(b,c){if(!(b<1||c<1)){var a=datagrid.cells[b+","+c];if(!(a&&a.placed)){var e=datagrid.dataRows[b];if(e){e.append(a);a.placed=true}}}},_initializeCell:function(b,c){if(!datagrid.cells[b+","+c]){var a=["cell"];b===0&&a.push("column_header");c===0&&a.push("row_header");c!==0&&b!==0&&a.push("data_cell");a=$(["<div class='",a.join(" "),"' style='visibility: hidden; height:",
datagrid.rows[b].metrics.height,"px; width:",datagrid.columns[c].metrics.width,"px;' data-row='",b,"' data-column='",c,"'/>"].join("")).data({row:b,column:c});a.row=b;a.column=c;datagrid.cells[b+","+c]=a}return datagrid.cells[b+","+c]},_createCell:function(b,c,a){var e=datagrid._initializeCell(b,c);if(e.transferred)return e;b!=0&&c!=0&&datagrid._templateCellHTML?e.append(datagrid._templateCellHTML(b,c)):e.append(a.children());e.attr("id",a.attr("id"));a.attr("id","original_"+e.attr("id"));e.originalTD=
a;e.addClass(a.attr("class"));e.css("visibility","");e.transferred=true;return e},_trigger:function(b,c,a){b=$.Event(b);b.originalEvent=c;b.originalTarget=a;datagrid.table.trigger(b,{cell:a,trueEvent:c&&c.originalEvent})},_cellClick:function(b){var c=datagrid.position($(this));c=datagrid.cells[c.row+","+c.column];datagrid.columns[c.column].hidden?datagrid.toggleColumn(c.column):datagrid._trigger("entry_click",b,c)},_cellMove:function(){if(!datagrid.disableHighlights){var b=datagrid.position($(this));
b=datagrid.cells[b.row+","+b.column];datagrid.table.trigger("entry_move",b);$(this).index(datagrid.currentHover)==-1&&b.trigger("mouseover")}},_cellOver:function(b){if(!datagrid.disableHighlights)if(!(b.originalEvent&&!datagrid.mouseHasMoved)){datagrid.mouseHasMoved=false;var c=datagrid.position($(this));c=datagrid.cells[c.row+","+c.column];c.addClass("selected");datagrid.currentHover&&c.index(datagrid.currentHover)==-1&&$(datagrid.currentHover).trigger("mouseout");datagrid.currentHover=c;if(c.row==
0)for(var a=1;a<datagrid.rows.length;a++)datagrid.cells[a+","+c.column].addClass("related");else if(c.column==0)for(a=1;a<datagrid.columns.length;a++)datagrid.cells[c.row+","+a].addClass("related");else{datagrid.cells[c.row+",0"].addClass("related");datagrid.cells["0,"+c.column].addClass("related")}datagrid._trigger("entry_over",b,c)}},_cellOut:function(b){if(!datagrid.disableHighlights)if($(b.target).parents("div").index(this)==-1){var c=datagrid.position($(this));c=datagrid.cells[c.row+","+c.column];
c.removeClass("selected");if(c.row==0)for(var a=1;a<datagrid.rows.length;a++)datagrid.cells[a+","+c.column].removeClass("related");else if(c.column==0)for(a=1;a<datagrid.columns.length;a++)datagrid.cells[c.row+","+a].removeClass("related");else{datagrid.cells[c.row+",0"].removeClass("related");datagrid.cells["0,"+c.column].removeClass("related")}datagrid._trigger("entry_out",b,c)}},_placeDataFragment:function(){if(datagrid.dataFragment){datagrid.divs.data.find(".content:first")[0].appendChild(datagrid.dataFragment);
datagrid.dataFragment=null}},_placeDataRow:function(b){if(!(b<1)){b=datagrid.dataRows[b]||datagrid._createRow(b);if(!b.placed){datagrid.dataFragment?datagrid.dataFragment.appendChild(b[0]):datagrid.divs.data.find(".content:first").append(b);b.placed=true}}},_createRow:function(b,c){if(datagrid.dataRows[b])return datagrid.dataRows[b];var a=document.createDocumentFragment(),e=$(document.createElement("div")).addClass("row");a.appendChild(e[0]);e.height(datagrid.rows[b].metrics.height);a=0;for(var d=
1;d<b;d++)a+=datagrid.rows[d].metrics.height+1;e.css({top:a,left:0});if(b>0&&!c)datagrid.dataRows[b]=e;return e},toggleColumn:function(b,c,a){var e=!datagrid.columns[b].hidden,d=!!datagrid.columns[b].hidden;if(c)d=true;else if(c===false)d=false;if((!a||a.callback!==false)&&$.isFunction(datagrid.toggleCallback))datagrid.toggleCallback(b,!!d);if(e!=d){for(c=0;c<datagrid.rows.length;c++)datagrid.cells[c+","+b].width(d?datagrid.columns[b].metrics.width:10).children().showIf(d).toggleClass("hidden_column",
!d);datagrid.columns[b].hidden=!d;if(!a||!a.skipSizeGrid)datagrid.sizeGrid();return d}},sizeGrid:function(){for(var b=0,c=1;c<datagrid.columns.length;c++)b+=datagrid.columns[c].hidden?10:datagrid.columns[c].metrics.width;datagrid.divs.filler.width(b-datagrid.columns[0].metrics.width);for(c=0;c<datagrid.rows.length;c++)datagrid.cells[c+",1"].parent(".row").width(b+datagrid.columns.length+3)},focus:function(b,c){var a=datagrid.cells[b+","+c];if(!(datagrid.currentFocus&&a.index(datagrid.currentFocus||
[])!=-1)){datagrid.currentFocus&&datagrid.blur();a.addClass("focus");datagrid.currentFocus=a;datagrid._trigger("entry_focus",null,a)}},blur:function(){if(datagrid.currentFocus){datagrid.currentFocus.removeClass("focus");datagrid._trigger("entry_blur",null,datagrid.currentFocus);datagrid.currentFocus=null}},scrollTo:function(b,c){datagrid.disableHighlights=true;if(b==0)b=1;if(c==0)c=1;var a=datagrid.cells[b+","+c];datagrid.divs.data.scrollToVisible(a).triggerHandler("scroll");datagrid.disableHighlights=
false;if(a&&a.filter(":visible").length>0){a.attr("tabindex",0);return true}},sizeToWindow:function(){$("html,body").css("overflow","hidden");var b=$("#content,#wide_content");if(!b.length||b.width()<100)b=$(window);var c=INST.browser.ff?1:0,a=$(window).height()-c-datagrid.divs.top.offset().top;b=b.width()-c;b=Math.floor(b-datagrid.columns[0].metrics.outerWidth);a=Math.floor(a-datagrid.rows[0].metrics.height-datagrid.borderSize);datagrid.divs.top.width(b);datagrid.divs.data.width(b);datagrid.divs.left.height(a);
datagrid.divs.data.height(a);datagrid.divs.data.metrics={width:b,height:a}},_selectFirstCell:function(){var b=datagrid.cells["1,1"];b.trigger("mouseover");datagrid.currentHover=b;datagrid.scrollTo(1,1)},position:function(b){b.hasClass("cell")||(b=b.closest(".cell"));if(b.data("datagrid_position"))return b.data("datagrid_position");if(b.length==0)return{};var c={row:parseInt(b.attr("data-row"),10),column:parseInt(b.attr("data-column"),10)};b.data("datagrid_position",c);return c},moveLeft:function(){var b=
datagrid.currentHover;if(datagrid.currentHover){for(var c=b.column-1,a=datagrid.cells[b.row+","+c];a&&a.hidden;){c--;a=datagrid.cells[b.row+","+c]}if(!a||a.length===0)a=b;a.trigger("mouseover").focus();datagrid.currentHover=a;datagrid.scrollTo(a.row,a.column)}else datagrid._selectFirstCell()},moveRight:function(){var b=datagrid.currentHover;if(datagrid.currentHover){for(var c=b.column+1,a=datagrid.cells[b.row+","+c];a&&a.hidden;){c++;a=datagrid.cells[b.row+","+c]}if(!a||a.length===0)a=b;a.trigger("mouseover").focus();
datagrid.currentHover=a;datagrid.scrollTo(a.row,a.column)}else datagrid._selectFirstCell()},moveUp:function(){var b=datagrid.currentHover;if(datagrid.currentHover){for(var c=b.row-1,a=datagrid.cells[c+","+b.column];a&&a.hidden;){c--;a=datagrid.cells[c+","+b.column]}if(!a||a.length===0)a=b;a.trigger("mouseover").focus();datagrid.currentHover=a;datagrid.scrollTo(a.row,a.column)}else datagrid._selectFirstCell()},moveDown:function(){var b=datagrid.currentHover;if(datagrid.currentHover){for(var c=b.row+
1,a=datagrid.cells[c+","+b.column];a&&a.hidden;){c++;a=datagrid.cells[c+","+b.column]}if(!a||a.length===0)a=b;a.trigger("mouseover").focus();datagrid.currentHover=a;datagrid.scrollTo(a.row,a.column)}else datagrid._selectFirstCell()}}})();
I18n.scoped("attendance",function(b){var c={saveKeyIndex:0,toggleState:function(a,e,d){if(!a.hasClass("false_submission")){var j=a.attr("id").split("_"),h=j[1],k=j[2];a.addClass("saving");var g="";if(e)if(e=="fail"){a.removeClass("pass").addClass("fail");g="fail"}else if(e=="pass"){a.removeClass("fail").addClass("pass");g="pass"}else{a.removeClass("fail").removeClass("pass");g=""}else if(a.hasClass("pass")){a.removeClass("pass").addClass("fail");g="fail"}else if(a.hasClass("fail")){a.removeClass("fail").removeClass("pass");
g=""}else{a.removeClass("fail").addClass("pass");g="pass"}var f=c.saveKeyIndex++;d||setTimeout(function(){if(a.data("save_key")==f){var l=$.replaceTags($.replaceTags($(".grade_submission_url").attr("href"),"user_id",h),"assignment_id",k);$.ajaxJSON(l,"POST",{"submission[assignment_id]":k,"submission[user_id]":h,"submission[grade]":g},function(m){a.removeClass("saving");for(var n in m){var o=m[n].submission,p=$("#submission_"+o.user_id+"_"+o.assignment_id);o=c.toggleState(p,o.grade||"clear",true);
c.clearSavingState(p,o)}},function(){a.removeClass("saving")})}},1E3);a.data("save_key",f);return f}},clearSavingState:function(a,e){if(a.data("save_key")==e){a.removeClass("saving");a.data("save_key",null)}},toggleColumnState:function(a,e){for(var d=datagrid.cells["0,"+a].attr("id").split("_")[1],j={},h=1;h<datagrid.rows.length;h++){var k=c.toggleState(datagrid.cells[h+","+a],e,true);j[h]=k}var g=function(){for(var f=1;f<datagrid.rows.length;f++)c.clearSavingState(datagrid.cells[f+","+a],j[f])};
d=$.replaceTags($(".set_default_grade_url").attr("href"),"assignment_id",d);h=e;if(h!="pass"&&h!="fail")h="";$.ajaxJSON(d,"PUT",{"assignment[default_grade]":h,"assignment[overwrite_existing_grades]":"1"},function(){g()},function(){g()})}};$(document).ready(function(){function a(){var g=$("#new_assignment_dialog .datetime_field").data("date");return g?b.t("default_attendance_title","Attendance %{date}",{date:b.l("#date.formats.default",g)}):""}$(".blank_attendance:first");$(".pass_attendance:first");
$(".fail_attendance:first");var e=0;$(".add_assignment_link").click(function(g){g.preventDefault();$("#new_assignment_dialog :text:not(.points_possible)").each(function(){$(this).val("")});$("#new_assignment_dialog").dialog("close").dialog({autoOpen:false,title:b.t("titles.new_attendance_column","New Attendance Column")}).dialog("open")});$("#new_assignment_dialog .cancel_button").click(function(){$("#new_assignment_dialog").dialog("close")});$("#add_assignment_form").formSubmit({beforeSubmit:function(){$(this).find(".submit_button").text(b.t("status.adding_assignment",
"Adding Assignment..."));$(this).find("button").attr("disabled",true)},success:function(g){$(this).find(".submit_button").text(b.t("status.added_assignment","Added Assignment"));$(this).find("button").attr("disabled",false);location.href="#assignment_"+g.assignment.id;location.reload()},error:function(g){$(this).formErrors(g);$(this).find(".submit_button").text(b.t("errors.could_not_add_assignment","Add Assignment Failed"));$(this).find("button").attr("disabled",false)}});$("#new_assignment_dialog .title").change(function(){var g=
$(this).val();g&&g!=a()?$(this).attr("edited",true):$(this).removeAttr("edited")});$("#new_assignment_dialog .datetime_field").change(function(){var g=$("#new_assignment_dialog .title").val(),f=$("#new_assignment_dialog .title").attr("edited");if(!g||!f)$(this).data("date")&&$("#new_assignment_dialog .title").val(a())});$(".datetime_field").datetime_field();$(".help_link").click(function(g){g.preventDefault();$("#attendance_how_to_dialog").dialog("close").dialog({autoOpen:false,width:400,title:b.t("titles.attendance_help",
"Attendance Help")}).dialog("open")});$(".submission").addClass("loading");var d=function(g,f,l){$.ajaxJSON(g,"GET",{},function(m){for(var n in f)for(var o in l)$("#submission_"+l[o]+"_"+f[n]).removeClass("loading");for(n in m)if(m[n]&&m[n].submission){var p=m[n].submission.grade;o=$("#submission_"+m[n].submission.user_id+"_"+m[n].submission.assignment_id);o.removeClass("loading");if(p!="pass"&&p!="fail")p="clear";p=c.toggleState(o,p,true);c.clearSavingState(o,p)}},function(){if(e<5){e++;d(g)}})},
j=Math.round(200/($("#attendance .student").length||1)),h=[],k=$(".gradebook_url").attr("href");setTimeout(function(){var g=[];$("#attendance .assignment").each(function(){var f=($(this).attr("id")||"").split("_").pop();g.push(f)});$("#attendance .student").each(function(){var f=($(this).attr("id")||"").split("_").pop();f&&h.push(f);if(h.length>j){d(k+"?init=1&submissions=1&user_ids="+h.join(",")+"&assignment_ids="+g.join(","),g,h);h=[]}});h.length>0&&d(k+"?init=1&submissions=1&user_ids="+h.join(",")+
"&assignment_ids="+g.join(","),g,h)},500);$("#comment_link").click(function(g){g.preventDefault();g.stopPropagation()});$(".options_dropdown").click(function(g){g.preventDefault()});$("#attendance").bind("entry_over",function(g,f){f.cell.attr("id").split("_")}).bind("entry_out",function(){}).bind("entry_click",function(g,f){f.trueEvent.preventDefault();datagrid.focus(f.cell.row,f.cell.column)}).bind("entry_focus",function(g,f){if(f.cell.row==0){var l={};l['<span class="ui-icon ui-icon-pencil">&nbsp;</span> '+
$.htmlEscape(b.t("options.edit_assignment","Edit Assignment"))]=function(){location.href="/"};l['<span class="ui-icon ui-icon-check">&nbsp;</span> '+$.htmlEscape(b.t("options.mark_all_as_present","Mark Everyone Present"))]=function(){c.toggleColumnState(f.cell.column,"pass")};l['<span class="ui-icon ui-icon-close">&nbsp;</span> '+$.htmlEscape(b.t("options.mark_all_as_absent","Mark Everyone Absent"))]=function(){c.toggleColumnState(f.cell.column,"fail")};l['<span class="ui-icon ui-icon-minus">&nbsp;</span> '+
$.htmlEscape(b.t("options.clear_attendance_marks","Clear Attendance Marks"))]=function(){c.toggleColumnState(f.cell.column,"clear")};f.cell.find(".options_dropdown").dropdownList({options:l})}else c.toggleState(f.cell);datagrid.blur()}).bind("entry_blur",function(){});$(document).keycodes("return p f del",function(g){if(!(datagrid.currentFocus||!datagrid.currentHover))if(!($(g.target).closest(".ui-dialog").length>0)){var f=datagrid.currentHover;g.keyString=="return"&&f.hasClass("submission")&&datagrid.focus(f.row,
f.column)}});datagrid.init($("#attendance"),{borderSize:2,onViewable:function(){$("#attendance_loading_message").hide();$(document).fragmentChange(function(g,f){if(f.length>1)f=f.substring(1);f=f.replace(/\/|%2F/g,"_");if(f.indexOf("student")==0||f.indexOf("assignment")==0||f.indexOf("submission")==0){var l=$("#"+f),m=datagrid.position(l);datagrid.scrollTo(m.row,m.column);l.trigger("mouseover")}})},onReady:function(){}})})});
$.extend(true,I18n=I18n||{},{translations:{es:{attendance:{default_attendance_title:"Asistencia %{date}",errors:{could_not_add_assignment:"No se pudo agregar la Tarea"},titles:{attendance_help:"Ayuda de Asistencia",new_attendance_column:"Columna Nueva de Asistencia"},status:{added_assignment:"Se agreg\u00f3 la Tarea",adding_assignment:"Agregando la Tarea..."},options:{mark_all_as_absent:"Marcar a todos como Ausentes",edit_assignment:"Editar la Tarea",clear_attendance_marks:"Despejar las Marcas de Asistencia",
mark_all_as_present:"Marcar a todos como Presentes"}}}}});
