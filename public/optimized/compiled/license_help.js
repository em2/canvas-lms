(function(){define(["i18n!license_help","jquery","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","jquery.loadingImg"],function(a,b){var c,d,e,f;return d=["by","nc","nd","sa"],e=function(a,c){return b(a).toggleClass("selected",!!c).attr("aria-checked",!!c)},c=function(a){return e(a,!0)},f=function(a){return e(a,!1)},b(".license_help_link").live("click",function(g){var h,i;return g.preventDefault(),h=b("#license_help_dialog"),i=b(this).prev("select"),h.length===0&&(h=b("<div/>").attr("id","license_help_dialog").hide().loadingImage().appendTo("body").delegate(".option","click",function(a){var d;a.preventDefault(),d=!b(this).is(".selected"),e(this,d),d?(c(h.find(".option.by")),b(this).hasClass("sa")?f(h.find(".option.nd")):b(this).hasClass("nd")&&f(h.find(".option.sa"))):b(this).hasClass("by")&&f(h.find(".option")),h.triggerHandler("option_change")}).delegate(".select_license","click",function(){return h.data("select")&&h.data("select").val(h.data("current_license")||"private"),h.dialog("close")}).bind("license_change",function(a,b){var e,g,i,j;h.find(".license").removeClass("active").filter("."+b).addClass("active"),f(h.find(".option")),h.find(".license.active").length===0&&(b="private",h.find(".license.private").addClass("active")),h.data("current_license",b);if(b.match(/^cc/)){j=[];for(g=0,i=d.length;g<i;g++)e=d[g],(e==="by"||b.match("_"+e))&&j.push(c(h.find(".option."+e)));return j}}).bind("option_change",function(){var a,b,c,e,f;a=["cc"];for(e=0,f=d.length;e<f;e++)c=d[e],h.find(".option."+c).is(".selected")&&a.push(c);return b=a.length===1?"private":a.join("_"),h.triggerHandler("license_change",b)}).dialog({autoOpen:!1,title:a.t("content_license_help","Content Licensing Help"),width:700}),b.get("/partials/_license_help.html",function(a){return h.loadingImage("remove").html(a).triggerHandler("license_change",i.val()||"private")})),h.find(".select_license").showIf(i.length),h.data("select",i),h.triggerHandler("license_change",i.val()||"private"),h.dialog("open")})})}).call(this)