I18n.scoped("wiki_pages",function(e){(function(a){function h(){a("#wiki_page_rename_link").click(function(b){b.preventDefault();a("#wiki_page_rename_section").slideToggle("fast",function(){a(this).find(":text:visible:first").focus().select()})});wikiSidebar.init();wikiSidebar.attachToEditor(a("#wiki_page_body"))}function i(){a("#wiki_show_view_secondary a.edit_link").click(function(b){b.preventDefault();g()});a("#wiki_page_new").find("a.new").click(function(b){b.preventDefault();a("#wiki_page_new").find("form").slideToggle("fast",
function(){a("#wiki_page_new :text:visible:first").focus().select()})}).end().find("form").hide()}function j(){a("#wiki_edit_view_main").show();a("#wiki_page_body").editorBox({fullHeight:true,elementToLeaveInViewport:a("#below_editor")});a("#wiki_edit_view_main").hide();a("#wiki_edit_view_main #cancel_editing").click(function(b){b.preventDefault();g()});a("#wiki_edit_view_main .wiki_switch_views_link").click(function(b){b.preventDefault();a("#wiki_page_body").editorBox("toggle")});if(a("a#page_doesnt_exist_so_start_editing_it_now").length){a("a#page_doesnt_exist_so_start_editing_it_now").click(function(b){b.preventDefault();
g()});a(function(){a("a#page_doesnt_exist_so_start_editing_it_now:not(.dont_click)").triggerHandler("click")})}}function g(){a("#wiki_edit_view_main, #wiki_show_view_main, #wiki_show_view_secondary, #wiki_edit_view_secondary").toggle();a("#wiki_edit_view_page_tools").showIf(a("#wiki_edit_view_page_tools li").length>0);wikiSidebar.toggle();a(window).triggerHandler("resize")}window.wikiPage={init:function(){j();a(function(){h();i()})},updateComment:function(b,d,c){if(!b||b.length==0){b=a("#wiki_page_comment_blank").clone(true).removeAttr("id");
c?a("#add_wiki_page_comment_form").after(b):a("#wiki_page_comments .wiki_page_comment:last").after(b);b.show()}d.created_at_formatted=a.parseFromISO(d.created_at).datetime_formatted;b.fillTemplateData({data:d,id:"wiki_page_commment_"+d.id,hrefValues:["id"],htmlValues:["formatted_body"]});b.toggleClass("current",d.workflow_state=="current");b.toggleClass("deletable_comment",!!(d.permissions&&d.permissions["delete"]))}};a(document).ready(function(){a(document).fragmentChange(function(c,f){f==="#edit"&&
a("#wiki_show_view_secondary a.edit_link:visible").click()});var b=false;a(document).bind("mousemove focus keypress",function(){b=true});var d=function(){if(b){b=false;a.ajaxJSON(a("#latest_page_version").attr("href"),"GET",{},function(c){var f=parseInt(a("#wiki_page_version_number").text(),10);c=c&&c&&c.wiki_page&&c.wiki_page.version_number;if(f&&c&&c>f){a(".someone_else_edited").slideDown();setTimeout(d,24E4)}else setTimeout(d,12E4)},function(){setTimeout(d,6E4)})}else setTimeout(d,12E4)};setTimeout(d,
5E3);a(".more_pages_link").click(function(c){c.preventDefault();a(this).parents("ul").find("li").show();a(this).parent("li").remove()});a(".add_comment_link,.wiki_page_comment .cancel_button").click(function(c){c.preventDefault();a(this).parents(".wiki_page_comment").toggleClass("commenting").find("textarea:visible").val("").focus().select()});a(".delete_comment_link").click(function(c){c.preventDefault();a(this).parents(".wiki_page_comment").confirmDelete({url:a(this).attr("href"),message:e.t("delete_comment_confirmation",
"Are you sure you want to delete this comment?"),success:function(){a(this).slideUp(function(){a(this).remove()})}})});a("#add_wiki_page_comment_form").formSubmit({beforeSubmit:function(){a(this).find("button").attr("disabled",true).filter(".submit_button").text(e.t("notices.adding_comment","Adding Comment..."))},success:function(c){a(this).find("button").attr("disabled",false).filter(".submit_button").text(e.t("buttons.add_comment","Add Comment"));wikiPage.updateComment(null,c.wiki_page_comment,
true);a(this).removeClass("commenting")},error:function(c){a(this).formErrors(c);a(this).find("button").attr("disabled",false).filter(".submit_button").text(e.t("notices.add_comment_failed","Add comment failed, please try again"))}});a("#add_wiki_page_form,#rename_wiki_page_form").formSubmit({success:function(c){location.href=c.success_url},error:function(c){a(this).formErrors(c)}})})})(jQuery)});
$.extend(true,I18n=I18n||{},{translations:{es:{wiki_pages:{buttons:{add_comment:"Agregar Comentario"},delete_comment_confirmation:"\u00bfSeguro que quiere borrar este comentario?",notices:{add_comment_failed:"No se pudo agregar el comentario, intente de nuevo",adding_comment:"Agregando Comentario..."}}}}});
