define(["i18n!content_exports","jquery","jquery.ajaxJSON","jquery.instructure_forms","jqueryui/progressbar"],function(a,b){b(document).ready(function(c){function d(){i.html(a.t("messages.processing","Processing")+"<div style='font-size: 0.8em;'>"+a.t("messages.this_may_take_a_bit","this may take a bit...")+"</div>").attr("disabled",!0),b(".instruction").hide(),b(".progress_bar_holder").slideDown(),b(".export_progress").progressbar(),f="nothing";var c=0,d=function(){if(f=="nothing"){c++;var a=(b(".export_progress").progressbar("option","value")||0)+.25;c<10&&b(".export_progress").progressbar("option","value",a),setTimeout(d,2e3)}else f="nothing",c=0,setTimeout(d,1e4)},e=function(){var c=null,d=1500;b.ajaxJSON(location.href+"/"+g,"GET",{},function(g){f="updating";var h=g.content_export,j=0;h&&(j=Math.max(b(".export_progress").progressbar("option","value")||0,h.progress),b(".export_progress").progressbar("option","value",j));if(h.workflow_state=="exported")i.hide(),b(".export_progress").progressbar("option","value",100),b(".progress_message").html("Your content has been exported."),b("#exports").append("<p>"+a.t("labels.new_export","New Export:")+' <a href="'+h.download_url+'">'+a.t("links.download_plain","Click here to download")+"</a> </p>");else if(h.workflow_state=="failed"){code="content_export_"+h.id,b(".progress_bar_holder").hide(),i.hide();var k=a.t("errors.error",'There was an error exporting your content.  Please notify your system administrator and give them the following export identifier: "%{code}"',{code:code});b(".export_messages .error_message").html(k),b(".export_messages").show()}else j==c?d=Math.max(d+500,3e4):d=1500,c=j,setTimeout(e,1500)},function(){setTimeout(e,3e3)})};setTimeout(e,2e3),setTimeout(d,1e3)}function e(){b("#current_export_id").size()&&(g=b("#current_export_id").text(),d())}var f="nothing",g=null,h=b("#quiz_selection"),i=b("#exporter_form");i.formSubmit({success:function(a){a&&a.content_export?(g=a.content_export.id,d()):(b(".export_messages .error_message").text(a.error_message),b(".export_messages").show())},error:function(c){b(this).find(".submit_button").attr("disabled",!1).text(a.t("buttons.process","Process Data"))}}),i.delegate(".copy_all","click",function(){b(".quiz_item").prop("checked",b(this).prop("checked"))}),i.delegate(".quiz_item","click",function(){b(this).prop("checked")||b(".copy_all").prop("checked",!1)}),i.delegate("input[name=export_type]","click",function(){b(this).val()==="qti"?h.show():h.hide()}),e()})})