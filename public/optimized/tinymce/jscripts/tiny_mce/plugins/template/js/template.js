tinyMCEPopup.requireLangPack();var TemplateDialog={preInit:function(){var a=tinyMCEPopup.getParam("template_external_list_url");a!=null&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(a)+'"></sc'+"ript>")},init:function(){var a=tinyMCEPopup.editor,b,c,d,e;b=a.getParam("template_templates",!1),c=document.getElementById("tpath");if(!b&&typeof tinyMCETemplateList!="undefined")for(d=0,b=[];d<tinyMCETemplateList.length;d++)b.push({title:tinyMCETemplateList[d][0],src:tinyMCETemplateList[d][1],description:tinyMCETemplateList[d][2]});for(d=0;d<b.length;d++)c.options[c.options.length]=new Option(b[d].title,tinyMCEPopup.editor.documentBaseURI.toAbsolute(b[d].src));this.resize(),this.tsrc=b},resize:function(){var a,b,c;self.innerWidth?(a=self.innerWidth-50,b=self.innerHeight-170):(a=document.body.clientWidth-50,b=document.body.clientHeight-160),c=document.getElementById("templatesrc"),c&&(c.style.height=Math.abs(b)+"px",c.style.width=Math.abs(a-5)+"px")},loadCSSFiles:function(a){var b=tinyMCEPopup.editor;tinymce.each(b.getParam("content_css","").split(","),function(c){a.write('<link href="'+b.documentBaseURI.toAbsolute(c)+'" rel="stylesheet" type="text/css" />')})},selectTemplate:function(a,b){var c=window.frames.templatesrc.document,d,e=this.tsrc;if(!a)return;c.body.innerHTML=this.templateHTML=this.getFileContents(a);for(d=0;d<e.length;d++)e[d].title==b&&(document.getElementById("tmpldesc").innerHTML=e[d].description||"")},insert:function(){tinyMCEPopup.execCommand("mceInsertTemplate",!1,{content:this.templateHTML,selection:tinyMCEPopup.editor.selection.getContent()}),tinyMCEPopup.close()},getFileContents:function(a){function b(a){c=0;try{c=new ActiveXObject(a)}catch(a){}return c}var c,d,e="text/plain";return c=window.ActiveXObject?b("Msxml2.XMLHTTP")||b("Microsoft.XMLHTTP"):new XMLHttpRequest,c.overrideMimeType&&c.overrideMimeType(e),c.open("GET",a,!1),c.send(null),c.responseText}};TemplateDialog.preInit(),tinyMCEPopup.onInit.add(TemplateDialog.init,TemplateDialog)