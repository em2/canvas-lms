define("jst/discussions/entry_with_replies",["compiled/handlebars_helpers"],function(a){var b=a.template,c=a.templates=a.templates||{};return c["discussions/entry_with_replies"]=b(function(a,b,c,d,e){function o(a,b){var e="",f;e+="\n      ",f=a,f=j.invokePartial(d["discussions/deleted_entry"],"discussions/deleted_entry",f,c,d);if(f||f===0)e+=f;return e+="\n    ",e}function p(a,b){var e="",f;e+="\n      ",f=a,f=j.invokePartial(d["discussions/entry_content"],"discussions/entry_content",f,c,d);if(f||f===0)e+=f;return e+="\n    ",e}function q(a,b){var e="",f;e+='\n  <div class="add-side-comment-wrap">\n    ',f=a,f=j.invokePartial(d["discussions/reply_form"],"discussions/reply_form",f,c,d);if(f||f===0)e+=f;return e+="\n  </div>\n",e}c=c||a.helpers,d=d||a.partials;var f="",g,h,i,j=this,k="function",l=c.helperMissing,m=void 0,n=this.escapeExpression;f+='<article class="discussion_entry can_be_marked_as_read ',g=c.read_state||b.read_state,typeof g===k?g=g.call(b,{hash:{}}):g===m&&(g=l.call(b,"read_state",{hash:{}})),f+=n(g)+'" data-mark-read-url="',g=c.mark_read_url||b.mark_read_url,typeof g===k?g=g.call(b,{hash:{}}):g===m&&(g=l.call(b,"mark_read_url",{hash:{}})),f+=n(g)+'">\n  <div class="entry_content">\n    ',g=c.deleted||b.deleted,h=c["if"],i=j.program(1,o,e),i.hash={},i.fn=i,i.inverse=j.program(3,p,e),g=h.call(b,g,i);if(g||g===0)f+=g;f+='\n  </div>\n</article>\n<div class="replies"></div>\n',g=c.allowsSideComments||b.allowsSideComments,h=c["if"],i=j.program(5,q,e),i.hash={},i.fn=i,i.inverse=j.noop,g=h.call(b,g,i);if(g||g===0)f+=g;return f+="\n\n\n",f}),c["discussions/entry_with_replies"]})