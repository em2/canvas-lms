define("translations/dashboard",["i18nObj","jquery"],function(a,b){b.extend(!0,a,{translations:{es:{dashboard:{links:{show_notifications:"haga click para mostrar estas notificaciones en el stream"}}}}})}),define("dashboard",["i18n!dashboard","jquery","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins"],function(a,b){b(function c(){function j(){f=b(window).height(),g.length>0?c=g.offset().top:c=f}function k(){var a=b.windowScrollTop();if(c&&f&&a+f>=c){var g=h.find(".topic_message.hidden_until_scroll").not(".part_of_clump").slice(0,10);g.length<10&&d!==0&&!e&&(e=!0),g.removeClass("hidden_until_scroll"),j()}}var c=null,d=null,e=!1,f=null,g=b("#after_topic_list"),h=b("#topic_list"),i=b("#show_all_messages_link");j(),setInterval(j,2e3),b("#assessment_course_selector").change(function(){b("#assessment_course").val(b("#assessment_course_selector option:selected").text()),b("#assessment_course_selector_row").hide()}),b("#assessment_course").change(function(){b("#assessment_course_selector_row").hide()}),b("#show_previous_classes").click(function(){b("#assessment_course_selector_row").toggle()}),b(".group_reference_checkbox").change(function(a,c){var d=b(this);c!==!1&&i.click();var e=d.attr("id").substring(6);b(".message_"+e).showIf(d.attr("checked"))}).each(function(){b(this).triggerHandler("change",!1)}),b(window).bind("scroll",k),setTimeout(k,0),function(){var c={"New Assignments and Events":[],"Grading Notifications":[],"Group Membership Notifications":[],"Date Changes":[],"Scheduling Notifications":[]};b(".dashboard_notification").each(function(){var a=b(this).find(".notification_name").get(0);notificationName=a&&a.innerHTML;if(notificationName)switch(notificationName){case"New Event Created":case"Assignment Created":case"Appointment Reserved For User":c["New Assignments and Events"].push(this);break;case"Assignment Grading Reminder":case"Assignment Graded":case"Grade Weight Changed":case"Assignment Submitted Late":case"Group Assignment Submitted Late":c["Grading Notifications"].push(this);break;case"New Context Group Membership":case"New Context Group Membership Invitation":case"Group Membership Accepted":case"Group Membership Rejected":case"New Student Organized Group":c["Group Membership Notifications"].push(this);break;case"Assignment Due Date Changed":case"Event Date Changed":c["Date Changes"].push(this);break;case"Appointment Group Published":case"Appointment Group Updated":c["Scheduling Notifications"].push(this)}});for(var d in c)if(c[d].length>3){var e=b(c[d][0]).clone();e.find(".content,.under_links,.disable_item_link").remove(),e.find(".context_code").text(a.t("links.show_notifications","click to show these notifications in the stream")),e.find(".subject").attr("href","#").text(c[d].length+" "+d),e.data("items",c[d]),e.click(function(a){a.preventDefault();var c=b(this).data("items");b(c).removeClass("part_of_clump"),b(this).remove()}),b(c[d]).addClass("part_of_clump").eq(0).before(e)}}()})}),function(){require(["dashboard"])}.call(this),define("compiled/bundles/dashboard",function(){})