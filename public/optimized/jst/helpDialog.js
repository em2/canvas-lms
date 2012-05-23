define("jst/helpDialog",["compiled/handlebars_helpers","i18n!help_dialog"],function(a){var b=a.template,c=a.templates=a.templates||{};return c.helpDialog=b(function(a,b,c,d,e){function q(a,b){var d="",e,f;d+='\n      <li>\n        <a href="',e=c.url||a.url,f=c["if"],k=l.program(2,r,b),k.hash={},k.fn=k,k.inverse=l.program(4,s,b),e=f.call(a,e,k);if(e||e===0)d+=e;return d+='" target="_blank">\n          <span class="text">',e=c.text||a.text,typeof e===m?e=e.call(a,{hash:{}}):e===o&&(e=n.call(a,"text",{hash:{}})),d+=p(e)+'</span>\n          <span class="subtext">',e=c.subtext||a.subtext,typeof e===m?e=e.call(a,{hash:{}}):e===o&&(e=n.call(a,"subtext",{hash:{}})),d+=p(e)+"</span>\n        </a>\n      </li>\n    ",d}function r(a,b){var d;return d=c.url||a.url,typeof d===m?d=d.call(a,{hash:{}}):d===o&&(d=n.call(a,"url",{hash:{}})),p(d)}function s(a,b){return"#"}function t(a,b){var d="",e,f,g,h;d+='\n      <div class="ui-state-error">\n        <span class="ui-icon ui-icon-alert"></span>\n        <strong>',e="Wait! A *better browser* may help solve the problem.",f="wait_a_better_browser_may_help_solve_the_problem",g={},h="helpDialog",g.scope=h,h='<a target="_blank" href="http://guides.instructure.com/s/2204/m/4214/l/41056-Which-browsers-does-Canvas-support-">$1</a>',g.w0=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;d+="</strong>\n        <div>",e="You are using Internet Explorer version %{browserVersion}, Try again using the latest version of *Chrome* or **Firefox**",f="you_are_using_browser_version_version_try_again_using_the_latest_version_of_chrome_or_firefox",g={},h="helpDialog",g.scope=h,h='<a href="http://getfirefox.com">$1</a>',g.w1=h,h='<a href="http://google.com/chrome">$1</a>',g.w0=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;return d+="</div>\n      </div>\n    ",d}function u(a,b){var d="",e,f,g,h;d+='\n      <div class="ui-state-highlight">\n        <span class="ui-icon ui-icon-info"></span>\n        <strong>',e="For an instant answer:",f="for_an_instant_answer",g={},h="helpDialog",g.scope=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;d+="</strong>\n        <div>",e="See if your issue is addressed in the *Canvas Guides*.",f="see_if_your_issue_is_addressed_in_the_canvas_guides",g={},h="helpDialog",g.scope=h,h='<a href="http://guides.instructure.com/">$1</a>',g.w0=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;return d+="</div>\n      </div>\n    ",d}c=c||a.helpers;var f="",g,h,i,j,k,l=this,m="function",n=c.helperMissing,o=void 0,p=this.escapeExpression;f+='<div id="help-dialog">\n  <ul id="help-dialog-options" class="help-dialog-pane">\n    ',g=c.helpLinks||b.helpLinks,h=c.each,k=l.program(1,q,e),k.hash={},k.fn=k,k.inverse=l.noop,g=h.call(b,g,k);if(g||g===0)f+=g;f+='\n  </ul>\n  <form class="help-dialog-pane" id="teacher_feedback" style="display:none" action="/api/v1/conversations" method="POST">\n    <label for="teacher-feedback-recipients">\n      ',g="Which course is this question about?",h="which_course_is_this_question_about",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+="\n      <small>",g="Message will be sent to all the Teachers / TA's in the course.",h="message_will_be_sent_to_all_the_teachers_tas_in_the_course",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</small>\n    </label>\n    <select name="recipients[]" id="teacher-feedback-recipients"></select>\n    <label for="teacher-feedback-body">',g="Message",h="message",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</label>\n    <textarea id="teacher-feedback-body" name="body"></textarea>\n    <div class="button-container">\n      <button type="submit" class="button" data-text-while-loading="',g="Sending...",h="sending",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='">',g="Send Message",h="send_message",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</button>\n    </div>\n  </form>\n  <form class="help-dialog-pane" id="create_ticket" style="display:none" action="/errors" method="POST">\n    <h4>',g="File a ticket for a personal response from our support team",h="file_a_ticket_for_a_personal_response_from_our_support_team",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+="</h4>\n    ",g=c.showBadBrowserMessage||b.showBadBrowserMessage,h=c["if"],k=l.program(6,t,e),k.hash={},k.fn=k,k.inverse=l.program(8,u,e),g=h.call(b,g,k);if(g||g===0)f+=g;f+='\n    <div>\n      <label for="error_subject">',g="Subject",h="subject",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</label>\n      <input id="error_subject" name="error[subject]" />\n    </div>\n    <div>\n      <label for="error-comments">\n        ',g="Description",h="description",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+="\n        <small>",g="Include a link to a screencast/screenshot using something like *Jing*.",h="include_a_link_to_a_screencast_or_screenshot_using_something_like_jing",i={},j="helpDialog",i.scope=j,j='<a href="http://www.techsmith.com/download/jing">$1</a>',i.w0=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</small>\n      </label>\n      <textarea id="error-comments" name="error[comments]"></textarea>\n    </div>\n    <label for="severity">',g="How is this affecting you?",h="how_is_this_affecting_you",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</label>\n    <select name="error[user_perceived_severity]" id="severity">\n      <option value="">',g="Please select one...",h="please_select_one",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</option>\n      <option value="just_a_comment">',g="Just a casual question, comment, idea, suggestion",h="just_a_casual_question_comment_idea_suggestion",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</option>\n      <option value="not_urgent">',g="I need some help but it's not urgent",h="i_need_some_help_but_its_not_urgent",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</option>\n      <option value="workaround_possible">',g="Something's broken but I can work around it for now",h="somethings_broken_but_i_can_work_around_it_for_now",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</option>\n      <option value="blocks_what_i_need_to_do">',g="I can't get things done until I hear back from you",h="i_cant_get_things_done_until_i_hear_back_from_you",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</option>\n      <option value="extreme_critical_emergency">',g="EXTREME CRITICAL EMERGENCY!!",h="extreme_critical_emergency",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</option>\n    </select>\n    <div style="',g=c.showEmail||b.showEmail,h=c.hiddenUnless||b.hiddenUnless,typeof h===m?g=h.call(b,g,{hash:{}}):h===o?g=n.call(b,"hiddenUnless",g,{hash:{}}):g=h,f+=p(g)+'">\n      <label for="error-email">',g="Your email address",h="your_email_address",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</label>\n      <input type="email" name="error[email]" id="error-email">\n    </div>\n    <input type="hidden" name="error[url]" value="',g=c.url||b.url,typeof g===m?g=g.call(b,{hash:{}}):g===o&&(g=n.call(b,"url",{hash:{}})),f+=p(g)+'">\n    <div class="button-container">\n      <button type="submit" data-text-while-loading="',g="Submitting Ticket...",h="Submitting_Ticket",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='" class="button submit_button"><img src="/images/email.png" alt=""/>',g="Submit Ticket",h="submit_this_support_request",i={},j="helpDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;return f+="</button>\n    </div>\n  </form>\n</div>\n",f}),c.helpDialog})