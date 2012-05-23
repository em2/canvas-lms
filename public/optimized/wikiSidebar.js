define(["i18n!wiki.sidebar","jquery","str/htmlEscape","jquery.ajaxJSON","jquery.inst_tree","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.rails_flash_notifications","jquery.templateData","tinymce.editor_box","vendor/jquery.pageless","jqueryui/accordion","jqueryui/tabs","vendor/scribd.view"],function(a,b,c){var d,e,f,g,h,i,j;b(function(){d=b("#editor_tabs"),e=d.find("ul#tree1"),f=d.find("#editor_tabs_3 .image_list"),g=b("#course_show_secondary"),h=b("form#sidebar_upload_image_form"),i=b("form#sidebar_upload_file_form"),j=b("#wiki_sidebar_select_folder_dialog")});var k={fileSelected:function(a){var b=a.find("span.text"),c=b.attr("rel"),d=b.text();k.editor.editorBox("create_link",{title:d,url:c,file:!0,image:a.hasClass("image"),scribdable:a.hasClass("scribdable"),kaltura_entry_id:a.attr("data-media-entry-id"),kaltura_media_type:a.hasClass("video_playback")?"video":"audio"})},imageSelected:function(a){var b=a.data("url")||a.attr("src"),c=a.attr("alt");k.editor.editorBox("insert_code",'<img alt="'+c+'" src="'+b+'"/>')},fileAdded:function(a,c,g){var h,i,j,k;b.isFunction(c)?(i=!0,j=c):typeof c=="object"?h=c:i=c,h==null&&(h=e.find(".initialized.folder_"+a.folder_id+">ul"));if(h.length||g){var l=a;k=e.find(".file_blank").clone(!0),k.attr("class","file").addClass(l.mime_class).toggleClass("scribdable",l["scribdable?"]),l.media_entry_id&&k.addClass("kalturable").attr("data-media-entry-id",l.media_entry_id).addClass(l.content_type&&l.content_type.match(/video/)?"video_playback":"audio_playback"),l.name=l.display_name,k.fillTemplateData({data:l,hrefValues:["id"]}),h&&(h.append(k),k.show(),e.instTree.InitInstTree(e)),g&&g(k)}if(i&&(a.mime_class=="image"||a.content_type.match(/^image/))&&f.hasClass("initialized")){var m=b.replaceTags(b("#editor_tabs_3 .file_url").attr("href"),"id",a.id),n=d.find("#wiki_sidebar_image_uploads .img_link").clone();n.find(".img").attr({src:a.thumbnail_url||m,alt:a.display_name}).data("url",m).end().fillTemplateData({data:a}).prependTo(f),j?n.slideDown(j):n.slideDown()}},show:function(){d.addClass("showing"),d.show(),g.hide()},hide:function(){d.removeClass("showing").hide(),g.show()},toggle:function(){d.hasClass("showing")?k.hide():k.show()},loadFolder:function(a){a.data("includes_files",!0);var c=b.replaceTags(b("#editor_tabs_2 #folder_url").attr("href"),"id",a.data("id"));$loading=e.find(">.loading").clone(),$loading.show(),a.append($loading),b.ajaxJSON(c,"GET",{},function(b){$loading.remove();var c=a.find("ul");for(var d in b.sub_folders){var f=b.sub_folders[d].folder,g=e.find(".folder_blank").clone(!0);g.attr("class","folder").data("id",f.id).addClass("folder_"+f.id),g.find(".name").text(f.name),c.append(g),g.show()}for(var d in b.files)k.fileAdded(b.files[d].attachment,c);a.addClass("initialized"),e.instTree.InitInstTree(e)},function(){$loading.remove()})},addFolder:function(a,d,e){var f=a[d];if(e!=0){var g=c(f.name);g="- "+g,g.length+e+1>38&&(g=g.substring(0,35)+"...");for(var l=0;l<e;l++)g="&nbsp;&nbsp;"+g;var m=b("<option />");m.val(f.id),m.html(g),i.find("#attachment_folder_id").append(m.clone()),h.find("#image_folder_id").append(m.clone()),j.find(".folder_id").append(m.clone())}for(var l in f.sub_folders)k.addFolder(a,f.sub_folders[l],e+1)},loadFolders:function(){if(!i.hasClass("initialized")){i.addClass("initialized");var a=i.find(".json_upload_url").attr("href");b.ajaxJSON(a,"GET",{},function(a){var b={},c;for(var d in a.folders){var e=a.folders[d].folder;b[e.id]=e;if(!e.parent_folder_id){c=e.id;continue}b[e.parent_folder_id]||(b[e.parent_folder_id]={}),b[e.parent_folder_id].sub_folders||(b[e.parent_folder_id].sub_folders=[]),b[e.parent_folder_id].sub_folders.push(e.id)}k.addFolder(b,c,0)})}},init:function(){k.inited=!0,d.find("#pages_accordion a.add").click(function(a){a.preventDefault(),d.find("#new_page_drop_down").slideToggle("fast",function(){b(this).find(":text:visible:first").focus().select()})}),d.find(".upload_new_image_link").click(function(a){a.preventDefault(),k.loadFolders(),h.slideToggle("fast")}),d.find(".find_new_image_link").click(function(a){a.preventDefault(),k.editor.editorBox("execute","instructureEmbed","flickr")}),d.find(".upload_new_file_link").click(function(a){a.preventDefault(),k.loadFolders(),i.slideToggle("fast")}),d.bind("tabsshow tagselect",function(b,c){c.index===1&&!e.hasClass("initialized")&&(e.addClass("initialized unstyled_list"),e.instTree({multi:!1,dragdrop:!1,onExpand:function(a){a.hasClass("folder")&&!a.data("includes_files")&&k.loadFolder(a)},onClick:function(a,b){b.hasClass("leaf")||b.hasClass("file")?k.fileSelected(b):b.hasClass("node")&&b.children(".sign").click()}})),c.index===2&&!f.hasClass("initialized")&&(f.addClass("initialized"),f.pageless({container:f,currentPage:0,totalPages:1,distance:500,url:f.data("url"),loaderMsg:a.t("loading_more_results","Loading more results"),scrape:function(a,b){return this.totalPages=parseInt(b.getResponseHeader("X-Total-Pages")),a}}))}),d.tabs(),b(".wiki_pages li a").live("click",function(a){a.preventDefault(),k.editor.editorBox("create_link",{title:b(this).text(),url:b(this).attr("href")})}),d.find("#pages_accordion").accordion({header:".header",autoHeight:!1}),b("#new_page_drop_down").submit(function(a){a.preventDefault();var c=b.trim(b("#new_page_name").val()).replace(/\s/g,"-").toLowerCase();k.editor.editorBox("create_link",{title:b("#new_page_name").val(),url:b("#new_page_url_prefix").val()+"/"+c}),b("#new_page_drop_down").slideUp("fast"),b("#new_page_name").val("")}),f.delegate(".img_link","click",function(a){a.preventDefault(),k.imageSelected(b(this).find(".img"))}),b.handlesHTML5Files&&(b("#editor_tabs_2 .file_list_holder").bind("dragenter dragover",function(a){if(!b(this).hasClass("file_drop"))return;a.preventDefault(),a.stopPropagation(),b(this).addClass("file_drag")},!1).bind("dragleave dragout",function(a){if(!b(this).hasClass("file_drop"))return;b(this).closest(".file_list_holder")||b(this).removeClass("file_drag")},!1).bind("drop",function(c){if(!b(this).hasClass("file_drop"))return;c.preventDefault(),c.stopPropagation(),b(this).removeClass("file_drag");var d=[],e=c.originalEvent.dataTransfer,f=e.files;for(var g=0;g<f.length;g++)f[g]&&d.push(f[g]);if(d.length===0){alert(a.t("errors.no_valid_files_selected","No valid files were selected"));return}var h=function(a){b("#wiki_sidebar_file_uploads").triggerHandler("files_added",{files:d,folder_id:a})};return j.data("folder_select",h),j.find(".file_count").text(d.length),j.find(".folder_id").empty(),k.loadFolders(),j.dialog("close").dialog({autoOpen:!1,title:a.t("titles.select_folder_for_uploads","Select folder for file uploads")}).dialog("open"),!1},!1),j.find(".select_button").click(function(a){var b=j.find(".folder_id").val();if(b){var c=j.data("folder_select");c&&c(b),j.dialog("close")}}),j.find(".cancel_button").click(function(a){j.data("folder_select",null),j.dialog("close")}),b("#editor_tabs_3 .image_list_holder").bind("dragenter dragover",function(a){if(!b(this).hasClass("file_drop"))return;a.preventDefault(),a.stopPropagation(),b(this).addClass("file_drag")},!1).bind("dragleave dragout",function(a){if(!b(this).hasClass("file_drop"))return;b(this).parents(".image_list_holder").length||b(this).removeClass("file_drag")},!1).bind("drop",function(c){if(!b(this).hasClass("file_drop"))return;c.preventDefault(),c.stopPropagation(),b(this).removeClass("file_drag");var d=[],e=c.originalEvent.dataTransfer,f=e.files;for(var g=0;g<f.length;g++)f[g]&&(!f[g].type||f[g].type.match(/^image/))&&d.push(f[g]);if(d.length===0){alert(a.t("errors.no_valid_image_files_selected","No valid image files were selected"));return}var h=function(a){b("#wiki_sidebar_image_uploads").triggerHandler("files_added",{files:d,folder_id:a})};return j.data("folder_select",h),j.find(".file_count").text(d.length),j.find(".folder_id").empty(),k.loadFolders(),j.dialog("close").dialog({autoOpen:!1,title:a.t("titles.select_folder_for_uploads","Select folder for file uploads")}).dialog("open"),!1},!1));var c=[],g=!0;b("#wiki_sidebar_file_uploads").bind("files_added",function(a,d){for(var e in d.files)c.push({file:d.files[e],folder_id:d.folder_id});b(this).triggerHandler("file_list_update")}).bind("file_list_update",function(a){c.length===0?b(this).slideUp():(b(this).triggerHandler("file_upload_check"),b(this).slideDown())}).bind("file_upload_check",function(d){var e=b(this);if(g){var f=c.shift(),h=b.fileData(f.file);e.fillTemplateData({data:{filename:h.name,files_remaining:c.length}}),g=!1,b.ajaxFileUpload({url:i.attr("action"),data:{"attachment[uploaded_data]":f.file,"attachment[display_name]":h.name,"attachment[folder_id]":f.folder_id},method:"POST",success:function(a){k.fileAdded(a.attachment,!0),g=!0,e.triggerHandler("file_list_update")},progress:function(a){console.log("progress!")},error:function(c){b.flashError(a.t("errors.unexpected_upload_problem","Unexpected problem uploading %{filename}.  Please try again.",{filename:h.name})),e.triggerHandler("file_list_update"),g=!0}}),c.length===0&&e.find(".remaining").slideUp()}else e.fillTemplateData({data:{files_remaining:c.length}})});var l=[],m=!0;b("#wiki_sidebar_image_uploads").bind("files_added",function(a,c){for(var d in c.files)l.push({file:c.files[d],folder_id:c.folder_id});b(this).triggerHandler("file_list_update")}).bind("file_list_update",function(a){l.length?(b(this).triggerHandler("file_upload_check"),b(this).slideDown()):b(this).slideUp()}).bind("file_upload_check",function(c){var d=b(this);if(m){var e=l.shift(),f=b.fileData(e.file);d.fillTemplateData({data:{filename:f.name,files_remaining:l.length}}),m=!1,b.ajaxFileUpload({url:h.attr("action"),data:{"attachment[uploaded_data]":e.file,"attachment[display_name]":f.name,"attachment[folder_id]":e.folder_id},method:"POST",success:function(a){k.fileAdded(a.attachment,!0),m=!0,d.triggerHandler("file_list_update")},progress:function(a){console.log("progress!")},error:function(c){b.flashError(a.t("errors.unexpected_upload_problem","Unexpected problem uploading %{filename}.  Please try again.",{filename:f.name})),d.triggerHandler("file_list_update"),m=!0}}),l.length===0&&d.find(".remaining").slideUp()}else d.fillTemplateData({data:{files_remaining:l.length}})}),h.formSubmit({fileUpload:!0,preparedFileUpload:!0,singleFile:!0,context_code:b("#editor_tabs .context_code").text(),folder_id:function(){return b(this).find("[name='attachment[folder_id]']").val()},upload_only:!0,object_name:"attachment",processData:function(a){return a["attachment[display_name]"]=b(this).find(".file_name").val(),a},beforeSubmit:function(a){h.find(".uploading").slideDown(),h.attr("action",h.find(".json_upload_url").attr("href"))},success:function(a){h.slideUp(function(){h.find(".uploading").hide()}),k.fileAdded(a.attachment,function(){k.imageSelected(b(this).find(".img"))})},error:function(a){h.find(".uploading").slideUp()}}),i.formSubmit({fileUpload:!0,preparedFileUpload:!0,singleFile:!0,object_name:"attachment",context_code:b("#editor_tabs .context_code").text(),folder_id:function(){return b(this).find("[name='attachment[folder_id]']").val()},upload_only:!0,processData:function(a){return a["attachment[display_name]"]=i.find(".file_name").val(),a},beforeSubmit:function(c){i.find(".uploading").slideDown(),i.attr("action",i.find(".json_upload_url").attr("href")),b(this).find("button").attr("disabled",!0).text(a.t("buttons.uploading","Uploading..."))},success:function(a){b(this).find("button").attr("disabled",!1).text("Upload"),i.slideUp(function(){i.find(".uploading").hide()}),k.fileAdded(a.attachment,!0,function(a){k.fileSelected(a)})},error:function(c){b(this).find("button").attr("disabled",!1).text(a.t("errors.upload_failed","Upload Failed, please try again")),i.find(".uploading").slideUp()}})},attachToEditor:function(a){return k.editor=b(a),k}};return k})