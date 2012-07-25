define(["i18n!sis_import","jquery","str/htmlEscape","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_misc_plugins","jqueryui/progressbar"],function(a,b,c){b(document).ready(function(d){function e(a){n.showIf(k.attr("checked")),o.showIf(k.attr("checked")),l.disableIf(m.attr("checked")),m.disableIf(l.attr("checked"))}function f(b){var d="";if(b.processing_errors&&b.processing_errors.length>0){d+="<li>"+a.t("headers.import_errors","Errors that prevent importing")+"\n<ul>";for(var e in b.processing_errors){var f=b.processing_errors[e];d+="<li>"+c(f[0])+" - "+c(f[1])+"</li>"}d+="</ul>\n</li>"}if(b.processing_warnings&&b.processing_warnings.length>0){d+="<li>"+a.t("headers.import_warnings","Warnings")+"\n<ul>";for(var e in b.processing_warnings){var f=b.processing_warnings[e];d+="<li>"+c(f[0])+" - "+c(f[1])+"</li>"}d+="</ul>\n</li>"}return d+="</ul>",d}function g(b){return!b.data||!b.data.counts?"":(output="<ul><li>"+a.t("headers.imported_items","Imported Items")+"<ul>",output+="<li>"+a.t("import_counts.accounts","Accounts: %{account_count}",{account_count:b.data.counts.accounts})+"</li>",output+="<li>"+a.t("import_counts.terms","Terms: %{term_count}",{term_count:b.data.counts.terms})+"</li>",output+="<li>"+a.t("import_counts.courses","Courses: %{course_count}",{course_count:b.data.counts.courses})+"</li>",output+="<li>"+a.t("import_counts.sections","Sections: %{section_count}",{section_count:b.data.counts.sections})+"</li>",output+="<li>"+a.t("import_counts.users","Users: %{user_count}",{user_count:b.data.counts.users})+"</li>",output+="<li>"+a.t("import_counts.enrollments","Enrollments: %{enrollment_count}",{enrollment_count:b.data.counts.enrollments})+"</li>",output+="<li>"+a.t("import_counts.crosslists","Crosslists: %{crosslist_count}",{crosslist_count:b.data.counts.xlists})+"</li>",output+="<li>"+a.t("import_counts.groups","Groups: %{group_count}",{group_count:b.data.counts.groups})+"</li>",output+="<li>"+a.t("import_counts.group_enrollments","Group Enrollments: %{group_enrollments_count}",{group_enrollments_count:b.data.counts.group_memberships})+"</li>",output+="</ul></li></ul>",output)}function h(){b("#sis_importer").html(a.t("status.processing","Processing")+" <div style='font-size: 0.6em;'>"+a.t("notices.processing_takes_awhile","this may take a bit...")+"</div>").attr("disabled",!0),b(".instruction").hide(),b(".progress_bar_holder").slideDown(),b(".copy_progress").progressbar(),j="nothing";var c=0,d=function(){if(j=="nothing"){c++;var a=(b(".copy_progress").progressbar("option","value")||0)+.25;c<10&&b(".copy_progress").progressbar("option","value",a),setTimeout(d,2e3)}else j="nothing",c=0,setTimeout(d,1e4)},e=function(){var c=null,d=1500;b.ajaxJSON(location.href,"GET",{},function(h){j="updating";var i=h.sis_batch,k=0;if(i){k=Math.max(b(".copy_progress").progressbar("option","value")||0,i.progress),b(".copy_progress").progressbar("option","value",k),b("#import_log").empty();if(i.sis_batch_log_entries)for(var l in i.sis_batch_log_entries){var m=i.sis_batch_log_entries[l].sis_batch_log_entry,n=m.text.split("\\n");if(b("#import_log #log_"+m.id).length==0){var o=b("<div id='log_"+m.id+"'/>");for(var p in n){var q=b("<div/>");q.text(n[p]),o.append(q)}b("#import_log").append(o)}}}if(!i||i.workflow_state=="imported")b("#sis_importer").hide(),b(".copy_progress").progressbar("option","value",100),b(".progress_message").html(a.t("messages.import_complete_success","The import is complete and all records were successfully imported.")+g(i));else if(i.workflow_state=="failed"){code="sis_batch_"+i.id,b(".progress_bar_holder").hide(),b("#sis_importer").hide();var r=a.t("errors.import_failed_code",'There was an error importing your SIS data. No records were imported.  Please notify your system administrator and give them the following code: "%{code}"',{code:code});b(".sis_messages .error_message").html(r),b(".sis_messages").show()}else if(i.workflow_state=="failed_with_messages"){b(".progress_bar_holder").hide(),b("#sis_importer").hide();var r=a.t("errors.import_failed_messages","No SIS records were imported. The import failed with these messages:");r+=f(i),b(".sis_messages .error_message").html(r),b(".sis_messages").show()}else if(i.workflow_state=="imported_with_messages"){b(".progress_bar_holder").hide(),b("#sis_importer").hide();var r=a.t("messages.import_complete_warnings","The SIS data was imported but with these messages:");r+=f(i),r+=g(i),b(".sis_messages").show().html(r)}else k==c?d=Math.max(d+500,3e4):d=1500,c=k,setTimeout(e,1500)},function(){setTimeout(e,3e3)})};setTimeout(e,2e3),setTimeout(d,1e3)}function i(){j="checking",b.ajaxJSON(location.href,"GET",{},function(a){j="nothing";var b=a.sis_batch,c=0;b&&(b.workflow_state=="importing"||b.workflow_state=="created")&&(j="nothing",h())})}var j="nothing";b("#batch_mode").change(function(a){b("#batch_mode_term_id").showIf(b(this).attr("checked"))}).change();var k=b("#override_sis_stickiness"),l=b("#add_sis_stickiness"),m=b("#clear_sis_stickiness"),n=b("#add_sis_stickiness_container"),o=b("#clear_sis_stickiness_container");k.change(e),l.change(e),m.change(e),e(null),b("#sis_importer").formSubmit({fileUpload:!0,success:function(a){a&&a.sis_batch?h():(b(".sis_messages .error_message").text(a.error_message),b(".sis_messages").show(),a.batch_in_progress&&h())},error:function(c){b(this).find(".submit_button").attr("disabled",!1).text(a.t("buttons.process_data","Process Data")),b(this).formErrors(c)}}),i()})})