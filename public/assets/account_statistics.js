I18n.scoped("accounts.statistics",function(b){$(document).ready(function(){function g(f,d){$("#over_time_dialog").dialog("close").dialog({autoOpen:false,width:630,height:330}).dialog("open").dialog("option","title",b.t("title_data_point_over_time","%{data_point} Over Time",{data_point:d}));var a=new google.visualization.DataTable;a.addColumn("date",b.t("heading_date","Date"));a.addColumn("number",d||b.t("heading_value","Value"));a.addColumn("string","title1");a.addColumn("string","text1");var c=[];
$.each(f,function(){var e=new Date;e.setTime(this[0]);c.push([e,this[1],undefined,undefined])});a.addRows(c);(new google.visualization.AnnotatedTimeLine(document.getElementById("over_time"))).draw(a,{displayAnnotations:false})}$(".over_time_link").live("click",function(f){f.preventDefault();var d=$(this).attr("data-name"),a=$.replaceTags($(".over_time_url").attr("href"),"attribute",$(this).attr("data-key")),c=$(this);c.text(b.t("loading_text","loading..."));$.ajaxJSON(a,"GET",{},function(e){c.text(b.t("over_time_link",
"over time"));$("#over_time_dialog .csv_url").attr("href",a+".csv");g(e,d)},function(){c.text(b.t("loading_error","error"))})})});google.load("visualization","1",{packages:["annotatedtimeline"]})});$.extend(true,I18n=I18n||{},{translations:{es:{accounts:{statistics:{heading_value:"Valor",over_time_link:"sobre el tiempo",heading_date:"Fecha",title_data_point_over_time:"%{data_point} en el tiempo",loading_text:"cargando...",loading_error:"error"}}}}});
