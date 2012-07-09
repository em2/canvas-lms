define(["require","compiled/editor/stocktiny","jquery","vendor/scribd.view","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins"],function(a,b,c,d){var e=null;a(["tinymce.editor_box"],function(){b.create("tinymce.plugins.InstructureLinks",{init:function(a,b){function g(b){g.counter=g.counter||0,b==1&&g.counter!=0?g.counter=(g.counter+1)%5:c(a.getBody()).find("a").each(function(){var a=c(this);a.attr("href")&&!a.hasClass("inline_disabled")&&a.attr("href").match(INST.youTubeRegEx)&&a.addClass("youtube_link_to_box")}),c(a.getBody()).find("iframe").each(function(){var b=c(this),d=c("<img/>");d.addClass("iframe_placeholder"),d.attr("rel",b.attr("src")),d.attr("style",b.attr("style")),d.css("display","block"),d.attr("_iframe_style",b.attr("style"));var e=b.attr("width")||b.css("width");e=="auto"&&(e=null);if(!e||e=="100%"||e=="auto"){var f=c(a.contentAreaContainer).width();d.attr("width",f-15),d.css("width",f-15),d.addClass("fullWidth")}else d.attr("width",e),d.css("width",e);d.css("margin",5);var g=[],h=b.attr("src"),i="";for(var j=0;j<h.length;j++)i+=h[j],h[j].match(/[^a-zA-Z0-9\.]/)&&i.length>30&&(g.push(i),i="");g.push(i),b.attr("src"),d.attr("alt","This frame will embed the url:\r\n"+g.join("\r\n")),d.attr("title","This frame will embed the url:\r\n"+g.join("\r\n"));var k=b.attr("height")||b.css("height");k=="auto"&&(k=null),k?(d.attr("height",k),d.css("height",k)):(d.attr("height",300),d.css("height",300)),d.attr("src","/images/blank.png"),d.css("background","transparent url(/images/iframe.png) no-repeat top left"),d.css("border","1px solid #aaa");if(b.parents("p,div").length==0){var l=c("<p/>");l.append(d),d=l}b.after(d),b.remove()}).end().find(".iframe_placeholder").each(function(){var b=c(a.contentAreaContainer).width(),d=c(this);if(c(a.contentAreaContainer).hasScrollbar()||!0)b-=c(a.contentAreaContainer).scrollbarWidth();d.width()>b-40?(d.width(b-15),d.hasClass("fullWidth")||d.addClass("fullWidth")):d.hasClass("fullWidth")&&d.removeClass("fullWidth")})}var d={},e=["instructure_scribd_file"],f=["instructure_scribd_file"];a.addCommand("instructureLinks",function(){var b=c("#"+a.id);if(b.data("enable_bookmarking")){var d=a.selection&&a.selection.getBookmark();b.data("last_bookmark",d)}var h=c("#instructure_link_prompt"),i="";h.removeClass("for_inline_content").find(".disable_enhancement").hide().end().find(".auto_show").hide().end().find(".insert_button").text("Insert Link").end().find(".disable_inline_content").attr("checked",!1).end().find(".auto_show_inline_content").attr("checked",!1);if(h.length==0){var h=c(document.createElement("div"));c.getUserServices("BookmarkService",function(a){var b=h.data("editor"),d=c("<div style='text-align: left; margin-left: 20px;'/>"),e,f;for(var g in a){e=a[g].user_service;if(e){f=c("<a href='#' class='bookmark_service no-hover'/>"),f.addClass(e.service),f.data("service",e),f.attr("title","Find links using "+e.service);var j=c("<img/>");j.attr("src","/images/"+e.service+"_small_icon.png"),f.append(j),f.click(function(a){a.preventDefault(),c("#instructure_link_prompt").dialog("close"),c.findLinkForService(c(this).data("service").service,function(a){c("#instructure_link_prompt").dialog("close"),b.editorBox("create_link",{title:a.title,url:a.url,classes:i})})}),d.append(f),d.append("&nbsp;&nbsp;")}}h.find("#instructure_link_prompt_form").after(d)}),h.append("<div style='font-size: 0.8em; margin-bottom: 5px;'>This will make the selected text a link, or insert a new link if nothing is selected.</div> Paste or type a url or wiki page in in the box below:<form id='instructure_link_prompt_form' style='margin-top: 5px;'><input type='text' class='prompt' style='width: 250px;' value='http://'/><button type='submit' class='insert_button button'>Insert Link</button></form>").append("<div class='actions'></div><div class='clear'></div>").append("<div class='disable_enhancement' style='display: none;'><input type='checkbox' class='disable_inline_content' id='disable_inline_content'/><label for='disable_inline_content'> Disable inline previews for this link</label></div>").append("<div class='auto_show' style='display: none;'><input type='checkbox' class='auto_show_inline_content' id='auto_show_inline_content'/><label for='auto_show_inline_content'> Auto-open the inline preview for this link</label></div>"),h.find(".disable_inline_content").change(function(){c(this).attr("checked")&&h.find(".auto_show_inline_content").attr("checked",!1),h.find(".auto_show").showIf(!c(this).attr("checked")&&h.hasClass("for_inline_content_can_auto_show"))}),h.find("#instructure_link_prompt_form").submit(function(a){var b=h.data("editor");a.preventDefault(),a.stopPropagation();var d=c(this).find(".prompt").val();!d.match(/^[a-zA-Z]+:\/\//)&&!d.match(/^[0-9a-zA-Z]+\.[0-9a-zA-Z]+/)&&d.match(/^[0-9a-zA-Z\s]+$/)&&(wiki_url=c("#wiki_sidebar_wiki_url").attr("href"),wiki_url&&(d=c.replaceTags(wiki_url,"page_url",d.replace(/\s/,"-").toLowerCase())));var e=i.replace(/(auto_open|inline_disabled)/g,"");h.find(".auto_show_inline_content").attr("checked")&&(e+=" auto_open"),h.find(".disable_inline_content").attr("checked")&&(e+=" inline_disabled"),b.editorBox("create_link",{url:d,classes:e}),h.dialog("close"),g(!0)}),h.find(".actions").delegate(".embed_image_link","click",function(a){var b=h.data("editor");a.preventDefault(),b.editorBox("insert_code","<img src='"+c(a.target).closest("img").attr("src")+"'/>"),h.dialog("close")}),h.find(".actions").delegate(".embed_youtube_link","click",function(a){var b=h.data("editor");a.preventDefault(),b.editorBox("create_link",c(a.target).closest("img").attr("alt")),h.dialog("close")}),h.find("#instructure_link_prompt_form .prompt").bind("change keyup",function(){c("#instructure_link_prompt .actions").empty();var a=c(this).val(),b=h.data("original_data");if(!b||a!=b.url){h.removeClass("for_inline_content").removeClass("for_inline_content_can_auto_show");var d=new RegExp("("+e.join("|")+")","g");i=i.replace(d,"")}else h.toggleClass("for_inline_content",b.for_inline_content).toggleClass("for_inline_content_can_auto_show",b.for_inline_content_can_auto_show).find(".disable_enhancement").showIf(b.for_inline_content).end().find(".auto_show").showIf(b.for_inline_content_can_auto_show),i=b.prior_classes;var f=!h.hasClass("for_inline_content"),g=!h.hasClass("for_inline_content_can_auto_show");if(a.match(/\.(gif|png|jpg|jpeg)$/)){var j=c(document.createElement("div"));j.css("textAlign","center");var k=c(document.createElement("img"));k.attr("src",a),k.addClass("embed_image_link"),k.css("cursor","pointer");var l=new Image;l.src=a;function m(){l.complete?(l.height<100||l.height>100&&l.height<200)&&k.height(l.height):setTimeout(m,500)}setTimeout(m,500),k.height(100),k.attr("title","Click to Embed the Image"),j.append(k),c("#instructure_link_prompt .actions").append(j)}else if(a.match(INST.youTubeRegEx)){var n=c.youTubeID(a),j=c(document.createElement("div"));j.css("textAlign","center"),!h.find(".disable_inline_content").attr("checked")&&h.hasClass("for_inline_content_can_auto_show")&&h.find(".auto_show").show(),f=!1,h.find(".disable_enhancement").show();var k=c(document.createElement("img"));k.attr("src","http://img.youtube.com/vi/"+n+"/2.jpg"),k.css({paddingLeft:100,background:"url(/images/youtube_logo.png) no-repeat left center",height:90,display:"inline-block"}),k.attr("alt",a),k.addClass("embed_youtube_link"),k.css("cursor","pointer"),k.attr("title","Click to Embed YouTube Video"),j.append(k),c("#instructure_link_prompt .actions").append(j)}f&&(h.find(".disable_enhancement").hide(),h.find(".disable_inline_content").attr("checked",!1)),g&&(h.find(".auto_show").hide(),h.find(".auto_show_inline_content").attr("checked",!1))}),h.attr("id","instructure_link_prompt"),c("body").append(h)}h.data("editor",b),h.data("original_data",null);var j=a.selection.getNode();while(j.nodeName!="A"&&j.nodeName!="BODY"&&j.parentNode)j=j.parentNode;var k=j.nodeName=="A"?c(j):null;if(k){h.find(".prompt").val(k.attr("href")).change(),i=(k.attr("class")||"").replace(/youtube_link_to_box/,"");var l=new RegExp("("+e.join("|")+")");(k.attr("class")||"").match(l)&&h.addClass("for_inline_content").find(".disable_enhancement").show();var l=new RegExp("("+f.join("|")+")");(k.attr("class")||"").match(l)&&h.addClass("for_inline_content_can_auto_show").find(".auto_show").show(),h.data("original_data",{url:k.attr("href"),for_inline_content:h.hasClass("for_inline_content"),for_inline_content_can_auto_show:h.hasClass("for_inline_content_can_auto_show"),prior_classes:i}),h.find(".disable_inline_content").attr("checked",k.hasClass("inline_disabled")).triggerHandler("change"),h.find(".auto_show_inline_content").attr("checked",k.hasClass("auto_open")).triggerHandler("change"),h.find(".insert_button").text("Update Link")}h.dialog("close").dialog({autoOpen:!1,width:425,height:"auto",title:"Link to Website URL",open:function(){c(this).find(".prompt").focus().select()}}).dialog("open")}),a.addButton("instructure_links",{title:"Link to URL",cmd:"instructureLinks",image:b+"/img/button.gif"}),a.onPreProcess.add(function(a,b){c(b.node).find("a.youtube_link_to_box").removeClass("youtube_link_to_box"),c(b.node).find("img.iframe_placeholder").each(function(){var a=c(this),b=c("<iframe/>");b.attr("src",a.attr("rel")),b.attr("style",a.attr("_iframe_style")),b.height(a.attr("height")||a.css("height")),a.hasClass("fullWidth")&&(a.attr("width","100%"),a.css("width","100%")),b.css("width",a.attr("width")||a.css("width")),c(this).after(b),c(this).remove()})}),a.onChange.add(function(){g()}),a.onSetContent.add(function(){g("contentJustSet")}),a.onNodeChange.add(function(a,b,c){while(c.nodeName!="A"&&c.nodeName!="BODY"&&c.parentNode)c=c.parentNode;b.setActive("instructure_links",c.nodeName=="A")})},getInfo:function(){return{longname:"InstructureLinks",author:"Brian Whitmer",authorurl:"http://www.instructure.com",infourl:"http://www.instructure.com",version:b.majorVersion+"."+b.minorVersion}}}),b.PluginManager.add("instructure_links",b.plugins.InstructureLinks)})})