(function(){function a(a,b){return a.getParam(b,c[b])}var b=tinymce.each,c={paste_auto_cleanup_on_paste:!0,paste_enable_default_filters:!0,paste_block_drop:!1,paste_retain_style_properties:"none",paste_strip_class_attributes:"mso",paste_remove_spans:!1,paste_remove_styles:!1,paste_remove_styles_if_webkit:!0,paste_convert_middot_lists:!0,paste_convert_headers_to_strong:!1,paste_dialog_width:"450",paste_dialog_height:"400",paste_text_use_dialog:!1,paste_text_sticky:!1,paste_text_sticky_default:!1,paste_text_notifyalways:!1,paste_text_linebreaktype:"combined",paste_text_replacements:[[/\u2026/g,"..."],[/[\x93\x94\u201c\u201d]/g,'"'],[/[\x60\x91\x92\u2018\u2019]/g,"'"]]};tinymce.create("tinymce.plugins.PastePlugin",{init:function(c,d){function e(b,d){var e=c.dom,f;g.onPreProcess.dispatch(g,b),b.node=e.create("div",0,b.content),tinymce.isGecko&&(f=c.selection.getRng(!0),f.startContainer==f.endContainer&&f.startContainer.nodeType==3&&b.node.childNodes.length===1&&/^(p|h[1-6]|pre)$/i.test(b.node.firstChild.nodeName)&&b.content.indexOf("__MCE_ITEM__")===-1&&e.remove(b.node.firstChild,!0)),g.onPostProcess.dispatch(g,b),b.content=c.serializer.serialize(b.node,{getInner:1,forced_root_block:""}),!d&&c.pasteAsPlainText?(g._insertPlainText(b.content),a(c,"paste_text_sticky")||(c.pasteAsPlainText=!1,c.controlManager.setActive("pastetext",!1))):g._insert(b.content)}function f(a){function n(a){a.preventDefault()}var d,f,g,h,i=c.selection,j=c.dom,k=c.getBody(),l,m;if(a.clipboardData||j.doc.dataTransfer){m=(a.clipboardData||j.doc.dataTransfer).getData("Text");if(c.pasteAsPlainText){a.preventDefault(),e({content:j.encode(m).replace(/\r?\n/g,"<br />")});return}}if(j.get("_mcePaste"))return;d=j.add(k,"div",{id:"_mcePaste","class":"mcePaste","data-mce-bogus":"1"},"﻿﻿"),k!=c.getDoc().body?l=j.getPos(c.selection.getStart(),k).y:l=k.scrollTop+j.getViewPort(c.getWin()).y,j.setStyles(d,{position:"absolute",left:tinymce.isGecko?-40:0,top:l-25,width:1,height:1,overflow:"hidden"});if(tinymce.isIE){h=i.getRng(),g=j.doc.body.createTextRange(),g.moveToElementText(d),g.execCommand("Paste"),j.remove(d);if(d.innerHTML==="﻿﻿"){c.execCommand("mcePasteWord"),a.preventDefault();return}return i.setRng(h),i.setContent(""),setTimeout(function(){e({content:d.innerHTML})},0),tinymce.dom.Event.cancel(a)}j.bind(c.getDoc(),"mousedown",n),j.bind(c.getDoc(),"keydown",n),f=c.selection.getRng(),d=d.firstChild,g=c.getDoc().createRange(),g.setStart(d,0),g.setEnd(d,2),i.setRng(g),window.setTimeout(function(){var a="",d;j.select("div.mcePaste > div.mcePaste").length?a="<p>"+j.encode(m).replace(/\r?\n\r?\n/g,"</p><p>").replace(/\r?\n/g,"<br />")+"</p>":(d=j.select("div.mcePaste"),b(d,function(c){var d=c.firstChild;d&&d.nodeName=="DIV"&&d.style.marginTop&&d.style.backgroundColor&&j.remove(d,1),b(j.select("span.Apple-style-span",c),function(a){j.remove(a,1)}),b(j.select("br[data-mce-bogus]",c),function(a){j.remove(a)}),c.parentNode.className!="mcePaste"&&(a+=c.innerHTML)})),b(j.select("div.mcePaste"),function(a){j.remove(a)}),f&&i.setRng(f),e({content:a}),j.unbind(c.getDoc(),"mousedown",n),j.unbind(c.getDoc(),"keydown",n)},0)}var g=this;g.editor=c,g.url=d,g.onPreProcess=new tinymce.util.Dispatcher(g),g.onPostProcess=new tinymce.util.Dispatcher(g),g.onPreProcess.add(g._preProcess),g.onPostProcess.add(g._postProcess),g.onPreProcess.add(function(a,b){c.execCallback("paste_preprocess",a,b)}),g.onPostProcess.add(function(a,b){c.execCallback("paste_postprocess",a,b)}),c.onKeyDown.addToTop(function(a,b){if((tinymce.isMac?b.metaKey:b.ctrlKey)&&b.keyCode==86||b.shiftKey&&b.keyCode==45)return!1}),c.pasteAsPlainText=a(c,"paste_text_sticky_default"),c.addCommand("mceInsertClipboardContent",function(a,b){e(b,!0)}),a(c,"paste_text_use_dialog")||c.addCommand("mcePasteText",function(b,d){var e=tinymce.util.Cookie;c.pasteAsPlainText=!c.pasteAsPlainText,c.controlManager.setActive("pastetext",c.pasteAsPlainText),c.pasteAsPlainText&&!e.get("tinymcePasteText")&&(a(c,"paste_text_sticky")?c.windowManager.alert(c.translate("paste.plaintext_mode_sticky")):c.windowManager.alert(c.translate("paste.plaintext_mode")),a(c,"paste_text_notifyalways")||e.set("tinymcePasteText","1",new Date((new Date).getFullYear()+1,12,31)))}),c.addButton("pastetext",{title:"paste.paste_text_desc",cmd:"mcePasteText"}),c.addButton("selectall",{title:"paste.selectall_desc",cmd:"selectall"}),a(c,"paste_auto_cleanup_on_paste")&&(tinymce.isOpera||/Firefox\/2/.test(navigator.userAgent)?c.onKeyDown.addToTop(function(a,b){((tinymce.isMac?b.metaKey:b.ctrlKey)&&b.keyCode==86||b.shiftKey&&b.keyCode==45)&&f(b)}):c.onPaste.addToTop(function(a,b){return f(b)})),c.onInit.add(function(){c.controlManager.setActive("pastetext",c.pasteAsPlainText),a(c,"paste_block_drop")&&c.dom.bind(c.getBody(),["dragend","dragover","draggesture","dragdrop","drop","drag"],function(a){return a.preventDefault(),a.stopPropagation(),!1})}),g._legacySupport()},getInfo:function(){return{longname:"Paste text/word",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_preProcess:function(c,d){function e(a){b(a,function(a){a.constructor==RegExp?g=g.replace(a,""):g=g.replace(a[0],a[1])})}var f=this.editor,g=d.content,h=tinymce.grep,i=tinymce.explode,j=tinymce.trim,k,l;if(f.settings.paste_enable_default_filters==0)return;tinymce.isIE&&document.documentMode>=9&&(e([[/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g,"$1"]]),e([[/<br><br>/g,"<BR><BR>"],[/<br>/g," "],[/<BR><BR>/g,"<br>"]]));if(/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(g)||d.wordContent){d.wordContent=!0,e([/^\s*(&nbsp;)+/gi,/(&nbsp;|<br[^>]*>)+\s*$/gi]),a(f,"paste_convert_headers_to_strong")&&(g=g.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,"<p><strong>$1</strong></p>")),a(f,"paste_convert_middot_lists")&&e([[/<!--\[if !supportLists\]-->/gi,"$&__MCE_ITEM__"],[/(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi,"$1__MCE_ITEM__"],[/(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi,"$1__MCE_ITEM__"]]),e([/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi," "]]);do k=g.length,g=g.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi,"$1");while(k!=g.length);a(f,"paste_retain_style_properties").replace(/^none$/i,"").length==0?g=g.replace(/<\/?span[^>]*>/gi,""):e([[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(a,b){return b.length>0?b.replace(/./," ").slice(Math.floor(b.length/2)).split("").join(" "):""}],[/(<[a-z][^>]*)\sstyle="([^"]*)"/gi,function(a,c,d){var e=[],f=0,g=i(j(d).replace(/&quot;/gi,"'"),";");return b(g,function(a){function b(a){return a+(a!=="0"&&/\d$/.test(a))?"px":""}var c,d,g=i(a,":");if(g.length==2){c=g[0].toLowerCase(),d=g[1].toLowerCase();switch(c){case"mso-padding-alt":case"mso-padding-top-alt":case"mso-padding-right-alt":case"mso-padding-bottom-alt":case"mso-padding-left-alt":case"mso-margin-alt":case"mso-margin-top-alt":case"mso-margin-right-alt":case"mso-margin-bottom-alt":case"mso-margin-left-alt":case"mso-table-layout-alt":case"mso-height":case"mso-width":case"mso-vertical-align-alt":e[f++]=c.replace(/^mso-|-alt$/g,"")+":"+b(d);return;case"horiz-align":e[f++]="text-align:"+d;return;case"vert-align":e[f++]="vertical-align:"+d;return;case"font-color":case"mso-foreground":e[f++]="color:"+d;return;case"mso-background":case"mso-highlight":e[f++]="background:"+d;return;case"mso-default-height":e[f++]="min-height:"+b(d);return;case"mso-default-width":e[f++]="min-width:"+b(d);return;case"mso-padding-between-alt":e[f++]="border-collapse:separate;border-spacing:"+b(d);return;case"text-line-through":if(d=="single"||d=="double")e[f++]="text-decoration:line-through";return;case"mso-zero-height":d=="yes"&&(e[f++]="display:none");return}if(/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(c))return;e[f++]=c+":"+g[1]}}),f>0?c+' style="'+e.join(";")+'"':c}]])}a(f,"paste_convert_headers_to_strong")&&e([[/<h[1-6][^>]*>/gi,"<p><strong>"],[/<\/h[1-6][^>]*>/gi,"</strong></p>"]]),e([[/Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi,""]]),l=a(f,"paste_strip_class_attributes");if(l!=="none"){function m(a,b){if(l==="all")return"";var c=h(i(b.replace(/^(["'])(.*)\1$/,"$2")," "),function(a){return/^(?!mso)/i.test(a)});return c.length?' class="'+c.join(" ")+'"':""}g=g.replace(/ class="([^"]+)"/gi,m),g=g.replace(/ class=([\-\w]+)/gi,m)}a(f,"paste_remove_spans")&&(g=g.replace(/<\/?span[^>]*>/gi,"")),d.content=g},_postProcess:function(c,d){var e=this,f=e.editor,g=f.dom,h;if(f.settings.paste_enable_default_filters==0)return;d.wordContent&&(b(g.select("a",d.node),function(a){(!a.href||a.href.indexOf("#_Toc")!=-1)&&g.remove(a,1)}),a(f,"paste_convert_middot_lists")&&e._convertLists(c,d),h=a(f,"paste_retain_style_properties"),tinymce.is(h,"string")&&h!=="all"&&h!=="*"&&(h=tinymce.explode(h.replace(/^none$/i,"")),b(g.select("*",d.node),function(a){var b={},c=0,d,e,f;if(h)for(d=0;d<h.length;d++)e=h[d],f=g.getStyle(a,e),f&&(b[e]=f,c++);g.setAttrib(a,"style",""),h&&c>0?g.setStyles(a,b):a.nodeName=="SPAN"&&!a.className&&g.remove(a,!0)}))),a(f,"paste_remove_styles")||a(f,"paste_remove_styles_if_webkit")&&tinymce.isWebKit?b(g.select("*[style]",d.node),function(a){a.removeAttribute("style"),a.removeAttribute("data-mce-style")}):tinymce.isWebKit&&b(g.select("*",d.node),function(a){a.removeAttribute("data-mce-style")})},_convertLists:function(a,c){var d=a.editor.dom,e,f,g=-1,h,i=[],j,k;b(d.select("p",c.node),function(a){var c,k="",l,m,n,o;for(c=a.firstChild;c&&c.nodeType==3;c=c.nextSibling)k+=c.nodeValue;k=a.innerHTML.replace(/<\/?\w+[^>]*>/gi,"").replace(/&nbsp;/g," "),/^(__MCE_ITEM__)+[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*\u00a0*/.test(k)&&(l="ul"),/^__MCE_ITEM__\s*\w+\.\s*\u00a0+/.test(k)&&(l="ol"),l?(h=parseFloat(a.style.marginLeft||0),h>g&&i.push(h),!e||l!=j?(e=d.create(l),d.insertAfter(e,a)):h>g?e=f.appendChild(d.create(l)):h<g&&(n=tinymce.inArray(i,h),o=d.getParents(e.parentNode,l),e=o[o.length-1-n]||e),b(d.select("span",a),function(a){var b=a.innerHTML.replace(/<\/?\w+[^>]*>/gi,"");l=="ul"&&/^__MCE_ITEM__[\u2022\u00b7\u00a7\u00d8o\u25CF]/.test(b)?d.remove(a):/^__MCE_ITEM__[\s\S]*\w+\.(&nbsp;|\u00a0)*\s*/.test(b)&&d.remove(a)}),m=a.innerHTML,l=="ul"?m=a.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*(&nbsp;|\u00a0)+\s*/,""):m=a.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^\s*\w+\.(&nbsp;|\u00a0)+\s*/,""),f=e.appendChild(d.create("li",0,m)),d.remove(a),g=h,j=l):e=g=0}),k=c.node.innerHTML,k.indexOf("__MCE_ITEM__")!=-1&&(c.node.innerHTML=k.replace(/__MCE_ITEM__/g,""))},_insert:function(a,b){var c=this.editor,d=c.selection.getRng();!c.selection.isCollapsed()&&d.startContainer!=d.endContainer&&c.getDoc().execCommand("Delete",!1,null),c.execCommand("mceInsertContent",!1,a,{skip_undo:b})},_insertPlainText:function(c){function d(a){b(a,function(a){a.constructor==RegExp?c=c.replace(a,""):c=c.replace(a[0],a[1])})}var e=this.editor,f=a(e,"paste_text_linebreaktype"),g=a(e,"paste_text_replacements"),h=tinymce.is;typeof c=="string"&&c.length>0&&(/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(c)?d([/[\n\r]+/g]):d([/\r+/g]),d([[/<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi,"\n\n"],[/<br[^>]*>|<\/tr>/gi,"\n"],[/<\/t[dh]>\s*<t[dh][^>]*>/gi,"\t"],/<[a-z!\/?][^>]*>/gi,[/&nbsp;/gi," "],[/(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi,"$1"],[/\n{3,}/g,"\n\n"]]),c=e.dom.decode(tinymce.html.Entities.encodeRaw(c)),h(g,"array")?d(g):h(g,"string")&&d(new RegExp(g,"gi")),f=="none"?d([[/\n+/g," "]]):f=="br"?d([[/\n/g,"<br />"]]):f=="p"?d([[/\n+/g,"</p><p>"],[/^(.*<\/p>)(<p>)$/,"<p>$1"]]):d([[/\n\n/g,"</p><p>"],[/^(.*<\/p>)(<p>)$/,"<p>$1"],[/\n/g,"<br />"]]),e.execCommand("mceInsertContent",!1,c))},_legacySupport:function(){var b=this,c=b.editor;c.addCommand("mcePasteWord",function(){c.windowManager.open({file:b.url+"/pasteword.htm",width:parseInt(a(c,"paste_dialog_width")),height:parseInt(a(c,"paste_dialog_height")),inline:1})}),a(c,"paste_text_use_dialog")&&c.addCommand("mcePasteText",function(){c.windowManager.open({file:b.url+"/pastetext.htm",width:parseInt(a(c,"paste_dialog_width")),height:parseInt(a(c,"paste_dialog_height")),inline:1})}),c.addButton("pasteword",{title:"paste.paste_word_desc",cmd:"mcePasteWord"})}}),tinymce.PluginManager.add("paste",tinymce.plugins.PastePlugin)})()