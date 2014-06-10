define("jst/_submission_detail",["compiled/handlebars_helpers","i18n!submission_detail"],function(a){var b=a.template,c=a.templates=a.templates||{};return c._submission_detail=b(function(a,b,c,d,e){function o(a,b){var d="",e,f;d+="\n    ",e=c.url||a.url,f=c["if"],i=j.program(2,p,b),i.hash={},i.fn=i,i.inverse=j.noop,e=f.call(a,e,i);if(e||e===0)d+=e;d+="\n    ",e=c.attachments||a.attachments,f=c["if"],i=j.program(4,q,b),i.hash={},i.fn=i,i.inverse=j.noop,e=f.call(a,e,i);if(e||e===0)d+=e;d+="\n    ",e=c.submission_type_is_online_text_entry||a.submission_type_is_online_text_entry,f=c["if"],i=j.program(8,t,b),i.hash={},i.fn=i,i.inverse=j.noop,e=f.call(a,e,i);if(e||e===0)d+=e;return d+="\n  ",d}function p(a,b){var d="",e,f,g,h;d+='\n      Submission URL: <a href="',e=c.url||a.url,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"url",{hash:{}})),d+=n(e)+'" title="',e="Go to submission URL",f="go_to_submission_url",g={},h="submission_detail",g.scope=h,h=c.t||a.t,i={},i.hash=g,typeof h===k?e=h.call(a,f,e,i):h===m?e=l.call(a,"t",f,e,i):e=h;if(e||e===0)d+=e;return d+='" target="_blank">',e=c.url||a.url,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"url",{hash:{}})),d+=n(e)+"</a>\n    ",d}function q(a,b){var d="",e,f,g,h;d+="\n      <label>",e="Submitted files:",f="submitted_files",g={},h="submission_detail",g.scope=h,h=c.t||a.t,i={},i.hash=g,typeof h===k?e=h.call(a,f,e,i):h===m?e=l.call(a,"t",f,e,i):e=h;if(e||e===0)d+=e;d+="</label>\n      <div>\n        ",e=c.attachments||a.attachments,f=c.each,i=j.program(5,r,b),i.hash={},i.fn=i,i.inverse=j.noop,e=f.call(a,e,i);if(e||e===0)d+=e;return d+="\n      </div>\n    ",d}function r(a,b){var d="",e,f;d+='\n          <div class="submisison-attachment">\n            ',e=c.turnitinUrl||a.turnitinUrl,f=c["if"],i=j.program(6,s,b),i.hash={},i.fn=i,i.inverse=j.noop,e=f.call(a,e,i);if(e||e===0)d+=e;return d+='\n            <a href="',e=c.url||a.url,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"url",{hash:{}})),d+=n(e)+'" class="',e=c["content-type"]||a["content-type"],f=c.mimeClass||a.mimeClass,typeof f===k?e=f.call(a,e,{hash:{}}):f===m?e=l.call(a,"mimeClass",e,{hash:{}}):e=f,d+=n(e)+'" title="',e=c.filename||a.filename,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"filename",{hash:{}})),d+=n(e)+'">',e=c.display_name||a.display_name,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"display_name",{hash:{}})),d+=n(e)+"</a>\n          </div>\n        ",d}function s(a,b){var d="",e,f,g,h;d+='\n              <a class="turnitin_similarity_score" href="',e=c.turnitinUrl||a.turnitinUrl,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"turnitinUrl",{hash:{}})),d+=n(e)+'" target="_blank" title="',e="Turnitin similarity score -- more information",f="titles.turnitin_score",g={},h="submission_detail",g.scope=h,h=c.t||a.t,i={},i.hash=g,typeof h===k?e=h.call(a,f,e,i):h===m?e=l.call(a,"t",f,e,i):e=h;if(e||e===0)d+=e;return d+='"><span class="similarity_score">',e=c.turnitin_data||a.turnitin_data,e=e===null||e===undefined||e===!1?e:e.similarity_score,typeof e===k?e=e.call(a,{hash:{}}):e===m&&(e=l.call(a,"turnitin_data.similarity_score",{hash:{}})),d+=n(e)+"</span>%</a>\n            ",d}function t(a,b){var d="",e,f,g,h;d+="\n      ",e="Online Text Entry, *see details in the SpeedGrader*.",f="online_text_entry_see_details_in_the_speedgrader.",g={},h="submission_detail",g.scope=h,h='<a href="%{speedGraderUrl}">$1</a>',g.w0=h,h=c.t||a.t,i={},i.hash=g,typeof h===k?e=h.call(a,f,e,i):h===m?e=l.call(a,"t",f,e,i):e=h;if(e||e===0)d+=e;return d+="\n    ",d}function u(a,b){var d="",e,f,g,h;d+="\n    ",e="No submission",f="no_submission",g={},h="submission_detail",g.scope=h,h=c.t||a.t,i={},i.hash=g,typeof h===k?e=h.call(a,f,e,i):h===m?e=l.call(a,"t",f,e,i):e=h;if(e||e===0)d+=e;return d+="\n  ",d}c=c||a.helpers;var f="",g,h,i,j=this,k="function",l=c.helperMissing,m=void 0,n=this.escapeExpression;f+='<div class="submission_detail">\n  ',g=c.submission_type||b.submission_type,h=c["if"],i=j.program(1,o,e),i.hash={},i.fn=i,i.inverse=j.program(10,u,e),g=h.call(b,g,i);if(g||g===0)f+=g;return f+="\n</div>\n",f}),a.registerPartial("submission_detail",c._submission_detail),c._submission_detail})