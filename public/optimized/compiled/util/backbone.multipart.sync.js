(function(){define(["compiled/backbone-ext/Backbone","use!underscore"],function(a,b){return a.syncWithoutMultipart=a.sync,a.syncWithMultipart=function(a,c,d){var e,f,g,h,i,j,k,l;return j="file_upload_iframe_"+(new Date).getTime(),f=$("<iframe id='"+j+"' name='"+j+"' ></iframe>").hide(),i={create:"POST",update:"PUT","delete":"DELETE",read:"GET"}[a],k=function(a,c){var d;return d=b.map(a,function(a,c){var d;if(b.isElement(a))return d=$(a),d.after(d.clone(!0)),a;if(!b.isEmpty(a)&&(b.isArray(a)||typeof a=="object"))return k(a,c);if(!(""+c).match(/^_/)&&a!=null&&typeof a!="object"&&typeof a!="function")return $("<input type='hidden' name='"+c+"' value='"+a+"' />")[0]}),b.flatten(d)},e=$("<form enctype='multipart/form-data' target='"+j+"' action='"+((l=d.url)!=null?l:c.url())+"' method='POST'>\n  <input type='hidden' name='_method' value='"+i+"' />\n  <input type='hidden' name='authenticity_token' value='"+ENV.AUTHENTICITY_TOKEN+"' />\n</form>").hide(),e.prepend(function(){var a,b,d,e;d=k(c),e=[];for(a=0,b=d.length;a<b;a++)h=d[a],h&&e.push(h);return e}()),$(document.body).prepend(f,e),g=function(){var a,b,c;return a=(f[0].contentDocument||f[0].contentWindow.document).body,b=$.parseJSON($(a).text()),b=(c=b.objects)!=null?c:b,a.className==="error"?typeof d.error=="function"&&d.error(b):typeof d.success=="function"&&d.success(b),f.remove(),e.remove()},f[0].onreadystatechange=function(){if(this.readyState==="complete")return g()},f[0].onload=g,e[0].submit()},a.sync=function(b,c,d){return(d!=null?d.multipart:void 0)?a.syncWithMultipart(b,c,d):a.syncWithoutMultipart(b,c,d)}})}).call(this)