define(["i18n!content_exports","jquery","jquery.ajaxJSON","jquery.instructure_forms","jqueryui/progressbar"],function(a,b){b(document).ready(function(c){function h(){g.html(a.t("messages.processing","Processing")+"<div style='font-size: 0.8em;'>"+a.t("messages.this_may_take_a_bit","this may take a bit...")+"</div>").attr("disabled",!0),b(".instruction").hide(),b(".progress_bar_holder").slideDown(),b(".export_progress").progressbar(),d="nothing";var c=0,f=function(){if(d=="nothing"){c++;var a=(b(".export_progress").progressbar("option","value")||0)+.25;c<10&&b(".export_progress").progressbar("option","value",a),setTimeout(f,2e3)}else d="nothing",c=0,setTimeout(f,1e4)},h=function(){var c=null,f=1500;b.ajaxJSON(location.href+"/"+e,"GET",{},function(e){d="updating";var i=e.content_export,j=0;i&&(j=Math.max(b(".export_progress").progressbar("option","value")||0,i.progress),b(".export_progress").progressbar("option","value",j));if(i.workflow_state=="exported")g.hide(),b(".export_progress").progressbar("option","value",100),b(".progress_message").html("Your content has been exported."),b("#exports").append("<p>"+a.t("labels.new_export","New Export:")+' <a href="'+i.download_url+'">'+a.t("links.download_plain","Click here to download")+"</a> </p>");else if(i.workflow_state=="failed"){code="content_export_"+i.id,b(".progress_bar_holder").hide(),g.hide();var k=a.t("errors.error",'There was an error exporting your content.  Please notify your system administrator and give them the following export identifier: "%{code}"',{code:code});b(".export_messages .error_message").html(k),b(".export_messages").show()}else j==c?f=Math.max(f+500,3e4):f=1500,c=j,setTimeout(h,1500)},function(){setTimeout(h,3e3)})};setTimeout(h,2e3),setTimeout(f,1e3)}function i(){b("#current_export_id").size()&&(e=b("#current_export_id").text(),h())}var d="nothing",e=null,f=b("#quiz_selection"),g=b("#exporter_form");g.formSubmit({success:function(a){a&&a.content_export?(e=a.content_export.id,h()):(b(".export_messages .error_message").text(a.error_message),b(".export_messages").show())},error:function(c){b(this).find(".submit_button").attr("disabled",!1).text(a.t("buttons.process","Process Data"))}}),g.delegate(".copy_all","click",function(){b(".quiz_item").prop("checked",b(this).prop("checked"))}),g.delegate(".quiz_item","click",function(){b(this).prop("checked")||b(".copy_all").prop("checked",!1)}),g.delegate("input[name=export_type]","click",function(){b(this).val()==="qti"?f.show():f.hide()}),i()})})