define("jst/calendar/schedulerRightSideAdminSection",["compiled/handlebars_helpers","i18n!calendar.scheduler_right_side_admin_section"],function(a){var b=a.template,c=a.templates=a.templates||{};return c["calendar/schedulerRightSideAdminSection"]=b(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i,j,k,l=this,m="function",n=c.helperMissing,o=void 0;f+='<div class="rs-section">\n  <p>The scheduler tool lets you set up time slots that students (or student groups) can sign up for. To get started, click the button below.</p>\n  <button class="create_link button">',g="Create an appointment group",h="create_a_new_set_of_appointments",i={},j="calendar.schedulerRightSideAdminSection",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;return f+="</button>\n</div>\n",f}),c["calendar/schedulerRightSideAdminSection"]})