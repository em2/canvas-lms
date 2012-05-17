define("jst/calendar/editCalendarEvent",["compiled/handlebars_helpers","i18n!calendar.edit_calendar_event"],function(a){var b=a.template,c=a.templates=a.templates||{};return c["calendar/editCalendarEvent"]=b(function(a,b,c,d,e){function q(a,b){var d="",e;return d+="\n          ",e=c.title||a.title,typeof e===m?e=e.call(a,{hash:{}}):e===o&&(e=n.call(a,"title",{hash:{}})),d+=p(e)+"\n        ",d}function r(a,b){var d="",e;return d+='\n          <input id="calendar_event_title" name="calendar_event[title]" size="30" style="width: 150px;" type="text" value="',e=c.title||a.title,typeof e===m?e=e.call(a,{hash:{}}):e===o&&(e=n.call(a,"title",{hash:{}})),d+=p(e)+'"/>\n        ',d}function s(a,b){var d="",e,f;d+="\n            ",e=c.can_create_calendar_events||a.can_create_calendar_events,f=c["if"],k=l.program(6,t,b),k.hash={},k.fn=k,k.inverse=l.noop,e=f.call(a,e,k);if(e||e===0)d+=e;return d+="\n          ",d}function t(a,b){var d="",e;return d+='\n              <option value="',e=c.asset_string||a.asset_string,typeof e===m?e=e.call(a,{hash:{}}):e===o&&(e=n.call(a,"asset_string",{hash:{}})),d+=p(e)+'">',e=c.name||a.name,typeof e===m?e=e.call(a,{hash:{}}):e===o&&(e=n.call(a,"name",{hash:{}})),d+=p(e)+"</option>\n            ",d}c=c||a.helpers;var f="",g,h,i,j,k,l=this,m="function",n=c.helperMissing,o=void 0,p=this.escapeExpression;f+="<form action='#' id='edit_calendar_event_form' style='padding: 5px; width: 400px'>\n  <table class=\"formtable\" style=\"width: 100%;\">\n    <tr>\n      <td style=\"vertical-align: top;\">",g="Title:",h="title",i={},j="calendar.editCalendarEvent",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+="</td>\n      <td>\n        ",g=c.lockedTitle||b.lockedTitle,h=c["if"],k=l.program(1,q,e),k.hash={},k.fn=k,k.inverse=l.program(3,r,e),g=h.call(b,g,k);if(g||g===0)f+=g;f+='\n      </td>\n    </tr>\n    <tr>\n      <td style="vertical-align: top;">',g="Date:",h="date",i={},j="calendar.editCalendarEvent",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</td>\n      <td><input type="text" name="date" style="width: 100px;" class="date_field"/></td>\n    </tr>\n    <tr>\n      <td style="vertical-align: top;">',g="From:",h="from",i={},j="calendar.editCalendarEvent",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</td>\n      <td>\n        <div style="float: left;"><input type="text" name="start_time" style="width: 60px;" class="time_field start_time"/></div>\n        ',g="* to *",h="timespan_separator",i={},j="calendar.editCalendarEvent",i.scope=j,j='<div style="float: left; margin: 5px">$1</div>',i.w0=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='\n        <div style="float: left;"><input type="text" name="end_time" style="width: 60px;" class="time_field end_time"/></div>\n        <div class="clear"></div>\n      </td>\n    </tr>\n    <tr class="context_select">\n      <td>',g="Calendar:",h="calendar",i={},j="calendar.editCalendarEvent",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</td>\n      <td>\n        <select class="context_id" name="calendar_event[context_code]">\n          ',g=c.contexts||b.contexts,h=c.each,k=l.program(5,s,e),k.hash={},k.fn=k,k.inverse=l.noop,g=h.call(b,g,k);if(g||g===0)f+=g;f+='\n        </select>\n      </td>\n    </tr><tr>\n      <td></td>\n      <td><a href="#" class="more_options_link">',g="more options",h="links.more_options",i={},j="calendar.editCalendarEvent",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+='</a></td>\n    </tr><tr>\n      <td colspan="2" class="button-container" style="text-align: right">\n        <button type="submit" class="button">',g="Submit",h="buttons.submit",i={},j="calendar.editCalendarEvent",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;return f+="</button>\n      </td>\n    </tr>\n  </table>\n</form>\n",f}),c["calendar/editCalendarEvent"]})