define(["i18n!quizzes.rubric","jquery","jquery.instructure_jquery_patches"],function(a,b){b(document).ready(function(){b(".show_rubric_link").click(function(c){function d(){f=b("#rubrics.rubric_dialog"),f.dialog("close").dialog({title:a.t("titles.details","Assignment Rubric Details"),width:600,modal:!1,resizable:!0,autoOpen:!1}).dialog("open")}c.preventDefault();var e=b(this).attr("rel"),f=b("#rubrics.rubric_dialog");if(f.length)d();else{var g=b("<div/>");g.text(a.t("loading","Loading...")),b("body").append(g),g.dialog({width:400,height:200}),b.get(e,function(a){b("body").append(a),g.dialog("close"),g.remove(),d()})}})})})