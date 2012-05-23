define(["i18n!dashboard","jquery","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins"],function(a,b){b(function c(){function d(){h=b(window).height(),i.length>0?c=i.offset().top:c=h}function e(){var a=b.windowScrollTop();if(c&&h&&a+h>=c){var e=j.find(".topic_message.hidden_until_scroll").not(".part_of_clump").slice(0,10);e.length<10&&f!==0&&!g&&(g=!0),e.removeClass("hidden_until_scroll"),d()}}var c=null,f=null,g=!1,h=null,i=b("#after_topic_list"),j=b("#topic_list"),k=b("#show_all_messages_link");d(),setInterval(d,2e3),b("#assessment_course_selector").change(function(){b("#assessment_course").val(b("#assessment_course_selector option:selected").text()),b("#assessment_course_selector_row").hide()}),b("#assessment_course").change(function(){b("#assessment_course_selector_row").hide()}),b("#show_previous_classes").click(function(){b("#assessment_course_selector_row").toggle()}),b(".group_reference_checkbox").change(function(a,c){var d=b(this);c!==!1&&k.click();var e=d.attr("id").substring(6);b(".message_"+e).showIf(d.attr("checked"))}).each(function(){b(this).triggerHandler("change",!1)}),b(window).bind("scroll",e),setTimeout(e,0),function(){var c={"New Assignments and Events":[],"Grading Notifications":[],"Group Membership Notifications":[],"Date Changes":[],"Scheduling Notifications":[]};b(".dashboard_notification").each(function(){var a=b(this).find(".notification_name").get(0);notificationName=a&&a.innerHTML;if(notificationName)switch(notificationName){case"New Event Created":case"Assignment Created":case"Appointment Reserved For User":c["New Assignments and Events"].push(this);break;case"Assignment Grading Reminder":case"Assignment Graded":case"Grade Weight Changed":case"Assignment Submitted Late":case"Group Assignment Submitted Late":c["Grading Notifications"].push(this);break;case"New Context Group Membership":case"New Context Group Membership Invitation":case"Group Membership Accepted":case"Group Membership Rejected":case"New Student Organized Group":c["Group Membership Notifications"].push(this);break;case"Assignment Due Date Changed":case"Event Date Changed":c["Date Changes"].push(this);break;case"Appointment Group Published":case"Appointment Group Updated":c["Scheduling Notifications"].push(this)}});for(var d in c)if(c[d].length>3){var e=b(c[d][0]).clone();e.find(".content,.under_links,.disable_item_link").remove(),e.find(".context_code").text(a.t("links.show_notifications","click to show these notifications in the stream")),e.find(".subject").attr("href","#").text(c[d].length+" "+d),e.data("items",c[d]),e.click(function(a){a.preventDefault();var c=b(this).data("items");b(c).removeClass("part_of_clump"),b(this).remove()}),b(c[d]).addClass("part_of_clump").eq(0).before(e)}}()})})