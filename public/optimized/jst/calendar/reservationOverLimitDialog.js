define("jst/calendar/reservationOverLimitDialog",["compiled/handlebars_helpers","i18n!calendar.reservation_over_limit_dialog"],function(a){var b=a.template,c=a.templates=a.templates||{};return c["calendar/reservationOverLimitDialog"]=b(function(a,b,c,d,e){function q(a,b){var d="",e,f,g,h;d+="\n    ",e="Cancel existing reservation and sign up for this one?",f="cancel_existing_reservation",g={},h="calendar.reservationOverLimitDialog",g.scope=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;return d+="\n  ",d}function r(a,b){var d="",e,f,g,h;d+="\n    ",e="Appointment limit reached",f="appointment_limit_reached",g={},h="calendar.reservationOverLimitDialog",g.scope=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;return d+="\n  ",d}function s(a,b){var d="",e,f,g;return d+="\n    <div>\n      ",e=c.end_at||a.end_at,f=c.start_at||a.start_at,g=c.semanticDateRange||a.semanticDateRange,typeof g===m?e=g.call(a,f,e,{hash:{}}):g===o?e=n.call(a,"semanticDateRange",f,e,{hash:{}}):e=g,d+=p(e)+"\n    </div>\n  ",d}function t(a,b){var d="",e,f,g,h;d+="\n    ",e="Would you like to cancel that and sign up for this?",f="would_you_like_to_cancel_that_and_sign_up_for_this",g={},h="calendar.reservationOverLimitDialog",g.scope=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;return d+="\n  ",d}function u(a,b){var d="",e,f,g,h;d+="\n    ",e="Please cancel one of your other reservations and try again.",f="cancel_some_appointments_and_try_again",g={},h="calendar.reservationOverLimitDialog",g.scope=h,h=c.t||a.t,k={},k.hash=g,typeof h===m?e=h.call(a,f,e,k):h===o?e=n.call(a,"t",f,e,k):e=h;if(e||e===0)d+=e;return d+="\n  ",d}c=c||a.helpers;var f="",g,h,i,j,k,l=this,m="function",n=c.helperMissing,o=void 0,p=this.escapeExpression;f+='<div title="\n  ',g=c.reschedulable||b.reschedulable,h=c["if"],k=l.program(1,q,e),k.hash={},k.fn=k,k.inverse=l.program(3,r,e),g=h.call(b,g,k);if(g||g===0)f+=g;f+='">\n\n  ',g="You are already signed up for:",h="you_are_already_signed_up_for",i={},j="calendar.reservationOverLimitDialog",i.scope=j,j=c.t||b.t,k={},k.hash=i,typeof j===m?g=j.call(b,h,g,k):j===o?g=n.call(b,"t",h,g,k):g=j;if(g||g===0)f+=g;f+="<br>\n  ",g=c.reservations||b.reservations,h=c.each,k=l.program(5,s,e),k.hash={},k.fn=k,k.inverse=l.noop,g=h.call(b,g,k);if(g||g===0)f+=g;f+="\n  ",g=c.reschedulable||b.reschedulable,h=c["if"],k=l.program(7,t,e),k.hash={},k.fn=k,k.inverse=l.program(9,u,e),g=h.call(b,g,k);if(g||g===0)f+=g;return f+="\n</div>\n",f}),c["calendar/reservationOverLimitDialog"]})