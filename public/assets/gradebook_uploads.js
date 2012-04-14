(function(){var l=this,i=l._,e=function(b){this._wrapped=b},j=typeof StopIteration!=="undefined"?StopIteration:"__break__",a=l._=function(b){return new e(b)};if(typeof exports!=="undefined")exports._=a;var q=Array.prototype.slice,r=Array.prototype.unshift,u=Object.prototype.toString,v=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;a.VERSION="0.5.1";a.each=function(b,c,f){try{if(b.forEach)b.forEach(c,f);else if(a.isArray(b)||a.isArguments(b))for(var g=0,m=b.length;g<m;g++)c.call(f,
b[g],g,b);else{var p=a.keys(b);m=p.length;for(g=0;g<m;g++)c.call(f,b[p[g]],p[g],b)}}catch(t){if(t!=j)throw t;}return b};a.map=function(b,c,f){if(b&&a.isFunction(b.map))return b.map(c,f);var g=[];a.each(b,function(m,p,t){g.push(c.call(f,m,p,t))});return g};a.reduce=function(b,c,f,g){if(b&&a.isFunction(b.reduce))return b.reduce(a.bind(f,g),c);a.each(b,function(m,p,t){c=f.call(g,c,m,p,t)});return c};a.reduceRight=function(b,c,f,g){if(b&&a.isFunction(b.reduceRight))return b.reduceRight(a.bind(f,g),c);
var m=a.clone(a.toArray(b)).reverse();a.each(m,function(p,t){c=f.call(g,c,p,t,b)});return c};a.detect=function(b,c,f){var g;a.each(b,function(m,p,t){if(c.call(f,m,p,t)){g=m;a.breakLoop()}});return g};a.select=function(b,c,f){if(b&&a.isFunction(b.filter))return b.filter(c,f);var g=[];a.each(b,function(m,p,t){c.call(f,m,p,t)&&g.push(m)});return g};a.reject=function(b,c,f){var g=[];a.each(b,function(m,p,t){!c.call(f,m,p,t)&&g.push(m)});return g};a.all=function(b,c,f){c=c||a.identity;if(b&&a.isFunction(b.every))return b.every(c,
f);var g=true;a.each(b,function(m,p,t){(g=g&&c.call(f,m,p,t))||a.breakLoop()});return g};a.any=function(b,c,f){c=c||a.identity;if(b&&a.isFunction(b.some))return b.some(c,f);var g=false;a.each(b,function(m,p,t){if(g=c.call(f,m,p,t))a.breakLoop()});return g};a.include=function(b,c){if(a.isArray(b))return a.indexOf(b,c)!=-1;var f=false;a.each(b,function(g){if(f=g===c)a.breakLoop()});return f};a.invoke=function(b,c){var f=a.rest(arguments,2);return a.map(b,function(g){return(c?g[c]:g).apply(g,f)})};a.pluck=
function(b,c){return a.map(b,function(f){return f[c]})};a.max=function(b,c,f){if(!c&&a.isArray(b))return Math.max.apply(Math,b);var g={computed:-Infinity};a.each(b,function(m,p,t){p=c?c.call(f,m,p,t):m;p>=g.computed&&(g={value:m,computed:p})});return g.value};a.min=function(b,c,f){if(!c&&a.isArray(b))return Math.min.apply(Math,b);var g={computed:Infinity};a.each(b,function(m,p,t){p=c?c.call(f,m,p,t):m;p<g.computed&&(g={value:m,computed:p})});return g.value};a.sortBy=function(b,c,f){return a.pluck(a.map(b,
function(g,m,p){return{value:g,criteria:c.call(f,g,m,p)}}).sort(function(g,m){var p=g.criteria,t=m.criteria;return p<t?-1:p>t?1:0}),"value")};a.sortedIndex=function(b,c,f){f=f||a.identity;for(var g=0,m=b.length;g<m;){var p=g+m>>1;f(b[p])<f(c)?g=p+1:m=p}return g};a.toArray=function(b){if(!b)return[];if(b.toArray)return b.toArray();if(a.isArray(b))return b;if(a.isArguments(b))return q.call(b);return a.map(b,function(c){return c})};a.size=function(b){return a.toArray(b).length};a.first=function(b,c,
f){return c&&!f?q.call(b,0,c):b[0]};a.rest=function(b,c,f){return q.call(b,a.isUndefined(c)||f?1:c)};a.last=function(b){return b[b.length-1]};a.compact=function(b){return a.select(b,function(c){return!!c})};a.flatten=function(b){return a.reduce(b,[],function(c,f){if(a.isArray(f))return c.concat(a.flatten(f));c.push(f);return c})};a.without=function(b){var c=a.rest(arguments);return a.select(b,function(f){return!a.include(c,f)})};a.uniq=function(b,c){return a.reduce(b,[],function(f,g,m){if(0==m||(c===
true?a.last(f)!=g:!a.include(f,g)))f.push(g);return f})};a.intersect=function(b){var c=a.rest(arguments);return a.select(a.uniq(b),function(f){return a.all(c,function(g){return a.indexOf(g,f)>=0})})};a.zip=function(){for(var b=a.toArray(arguments),c=a.max(a.pluck(b,"length")),f=Array(c),g=0;g<c;g++)f[g]=a.pluck(b,String(g));return f};a.indexOf=function(b,c){if(b.indexOf)return b.indexOf(c);for(var f=0,g=b.length;f<g;f++)if(b[f]===c)return f;return-1};a.lastIndexOf=function(b,c){if(b.lastIndexOf)return b.lastIndexOf(c);
for(var f=b.length;f--;)if(b[f]===c)return f;return-1};a.range=function(b,c,f){var g=a.toArray(arguments),m=g.length<=1;b=m?0:g[0];c=m?g[0]:g[1];f=g[2]||1;g=Math.ceil((c-b)/f);if(g<=0)return[];g=Array(g);m=b;for(var p=0;;m+=f){if((f>0?m-c:c-m)>=0)return g;g[p++]=m}};a.bind=function(b,c){var f=a.rest(arguments,2);return function(){return b.apply(c||l,f.concat(a.toArray(arguments)))}};a.bindAll=function(b){var c=a.rest(arguments);if(c.length==0)c=a.functions(b);a.each(c,function(f){b[f]=a.bind(b[f],
b)});return b};a.delay=function(b,c){var f=a.rest(arguments,2);return setTimeout(function(){return b.apply(b,f)},c)};a.defer=function(b){return a.delay.apply(a,[b,1].concat(a.rest(arguments)))};a.wrap=function(b,c){return function(){var f=[b].concat(a.toArray(arguments));return c.apply(c,f)}};a.compose=function(){var b=a.toArray(arguments);return function(){for(var c=a.toArray(arguments),f=b.length-1;f>=0;f--)c=[b[f].apply(this,c)];return c[0]}};a.keys=function(b){if(a.isArray(b))return a.range(0,
b.length);var c=[],f;for(f in b)v.call(b,f)&&c.push(f);return c};a.values=function(b){return a.map(b,a.identity)};a.functions=function(b){return a.select(a.keys(b),function(c){return a.isFunction(b[c])}).sort()};a.extend=function(b,c){for(var f in c)b[f]=c[f];return b};a.clone=function(b){if(a.isArray(b))return b.slice(0);return a.extend({},b)};a.isEqual=function(b,c){if(b===c)return true;var f=typeof b;if(f!=typeof c)return false;if(b==c)return true;if(!b&&c||b&&!c)return false;if(b.isEqual)return b.isEqual(c);
if(a.isDate(b)&&a.isDate(c))return b.getTime()===c.getTime();if(a.isNaN(b)&&a.isNaN(c))return true;if(a.isRegExp(b)&&a.isRegExp(c))return b.source===c.source&&b.global===c.global&&b.ignoreCase===c.ignoreCase&&b.multiline===c.multiline;if(f!=="object")return false;if(b.length&&b.length!==c.length)return false;f=a.keys(b);var g=a.keys(c);if(f.length!=g.length)return false;for(var m in b)if(!a.isEqual(b[m],c[m]))return false;return true};a.isEmpty=function(b){return a.keys(b).length==0};a.isElement=
function(b){return!!(b&&b.nodeType==1)};a.isArguments=function(b){return b&&a.isNumber(b.length)&&!a.isArray(b)&&!D.call(b,"length")};a.isNaN=function(b){return a.isNumber(b)&&isNaN(b)};a.isNull=function(b){return b===null};a.isUndefined=function(b){return typeof b=="undefined"};for(var H=["Array","Date","Function","Number","RegExp","String"],O=0,T=H.length;O<T;O++)(function(){var b="[object "+H[O]+"]";a["is"+H[O]]=function(c){return u.call(c)==b}})();a.noConflict=function(){l._=i;return this};a.identity=
function(b){return b};a.breakLoop=function(){throw j;};var M=0;a.uniqueId=function(b){var c=M++;return b?b+c:c};a.template=function(b,c){var f=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+b.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return c?f(c):f};a.forEach=a.each;a.foldl=a.inject=
a.reduce;a.foldr=a.reduceRight;a.filter=a.select;a.every=a.all;a.some=a.any;a.head=a.first;a.tail=a.rest;a.methods=a.functions;var P=function(b,c){return c?a(b).chain():b};a.each(a.functions(a),function(b){var c=a[b];e.prototype[b]=function(){r.call(arguments,this._wrapped);return P(c.apply(a,arguments),this._chain)}});a.each(["pop","push","reverse","shift","sort","splice","unshift"],function(b){var c=Array.prototype[b];e.prototype[b]=function(){c.apply(this._wrapped,arguments);return P(this._wrapped,
this._chain)}});a.each(["concat","join","slice"],function(b){var c=Array.prototype[b];e.prototype[b]=function(){return P(c.apply(this._wrapped,arguments),this._chain)}});e.prototype.chain=function(){this._chain=true;return this};e.prototype.value=function(){return this._wrapped}})();(function(l){l.extend({template:function(i,e){e=e||{};return(i||"").replace(/#\{([^{}]*)}/g,function(j,a){return typeof e[a]==="string"||typeof e[a]==="number"?e[a]:j})}})})(jQuery);
(function(l){var i=0;l.getScrollbarWidth=function(){if(!i)if(l.browser.msie){var e=l('<textarea cols="10" rows="2"></textarea>').css({position:"absolute",top:-1E3,left:-1E3}).appendTo("body"),j=l('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position:"absolute",top:-1E3,left:-1E3}).appendTo("body");i=e.width()-j.width();e.add(j).remove()}else{e=l("<div />").css({width:100,height:100,overflow:"auto",position:"absolute",top:-1E3,left:-1E3}).prependTo("body").append("<div />").find("div").css({width:"100%",
height:200});i=100-e.width();e.parent().remove()}return i}})(jQuery);function requiredFieldValidator(l){return l==null||l==undefined||!$.trim(l+"").length?{valid:false,msg:"This is a required field"}:{valid:true,msg:null}}
var TextCellEditor=function(l,i,e){var j,a=e,q=this;this.init=function(){j=$("<INPUT type=text class='editor-text' />");if(e!=null){j[0].defaultValue=e;j.val(a)}j.appendTo(l);j.focus().select()};this.destroy=function(){j.remove()};this.focus=function(){j.focus()};this.setValue=function(r){j.val(r);a=r};this.getValue=function(){return j.val()};this.isValueChanged=function(){return!(j.val()==""&&a==null)&&j.val()!=a};this.validate=function(){if(i.validator){var r=i.validator(q.getValue());if(!r.valid)return r}return{valid:true,
msg:null}};this.init()},GradeCellEditor=function(l,i,e,j){if(j.active){e=e||{};var a,q=e.grade,r=this;this.init=function(){switch(i._uploaded.grading_type){case "letter_grade":var u="";$.each([{text:"--",value:""},{text:"A",value:"A"},{text:"A-",value:"A-"},{text:"B+",value:"B+"},{text:"B",value:"B"},{text:"B-",value:"B-"},{text:"C+",value:"C+"},{text:"C-",value:"C-"},{text:"D+",value:"D+"},{text:"D",value:"D"},{text:"D-",value:"D-"},{text:"F",value:"F"}],function(){u+='<option value="'+this.value+
'" '+(this.value==e.grade?"selected":"")+">"+this.text+"</option>"});a=$("<select>"+u+"</select>");break;default:a=$("<INPUT type=text class='editor-text' />")}if(typeof e.grade!="undefined"&&e.grade+""!=""){a[0].defaultValue=e.grade;a.val(q)}a.appendTo(l);a.focus().select();$($.template('<div class="grade-helper-wrapper"><span class="ui-icon ui-icon-triangle-1-w"/><div class="grade-helper-inner ui-widget-content ui-corner-all">  <table><tr><th>Original Score</th><th>Uploaded Score</th></tr><tr><td>#{originalScore}</td><td>#{uploadedScore}</td></tr></table></div> </div>',
{originalScore:e._original&&e._original.grade||"--",uploadedScore:e._uploaded&&e._uploaded.grade||"--"})).appendTo(l)};this.destroy=function(){a.remove()};this.focus=function(){a.focus()};this.setValue=function(u){a.val(u.grade);q=u.grade};this.getValue=function(){return a.val()};this.isValueChanged=function(){return!(a.val()==""&&q==null)&&a.val()!=q};this.validate=function(){if(i.validator){var u=i.validator(r.getValue());if(!u.valid)return u}return{valid:true,msg:null}}}else{this.init=function(){var u=
e?e.grade:"";l.removeClass("selected editable").html(u)};this.destroy=function(){};this.focus=function(){};this.setValue=function(){};this.getValue=function(){return e};this.isValueChanged=function(){return false};this.validate=function(){return{valid:true,msg:null}}}this.init()},StudentNameEditor=function(l,i,e){this.init=function(){var j=e?e.name:"";l.removeClass("selected editable").html(j)};this.destroy=function(){};this.focus=function(){};this.setValue=function(){};this.getValue=function(){return e};
this.isValueChanged=function(){return false};this.validate=function(){return{valid:true,msg:null}};this.init()},StudentNameFormatter=function(l,i,e){return e?e.name:""},NullEditor=function(l,i,e){this.init=function(){l.removeClass("selected editable").html(e)};this.destroy=function(){};this.focus=function(){};this.setValue=function(){};this.getValue=function(){return e};this.isValueChanged=function(){return false};this.validate=function(){return{valid:true,msg:null}};this.init()},NullGradeEditor=
function(l,i,e){this.init=function(){var j=e?e.grade:"";l.removeClass("selected editable").html(j)};this.destroy=function(){};this.focus=function(){};this.setValue=function(){};this.getValue=function(){return e};this.isValueChanged=function(){return false};this.validate=function(){return{valid:true,msg:null}};this.init()},simpleGradeCellFormatter=function(l,i,e){return e?e.grade:""},PassFailCellFormatter=function(l,i,e){e=e||{};switch(e.grade){case "pass":return"<span class='pass_fail pass' />";case "fail":return"<span class='pass_fail fail' />";
default:return""}},PassFailSelectCellEditor=function(l,i,e){e=e||{};var j,a=e;this.init=function(){j=$("<SELECT tabIndex='0' class='editor-yesno'><OPTION value=''>---</OPTION><OPTION value='pass'>Pass</OPTION><OPTION value='fail'>Fail</OPTION></SELECT>");j.val(a.grade);j.appendTo(l);j.focus();j.change(function(){e.grade=$(this).val()});$($.template('<div class="grade-helper-wrapper"><span class="ui-icon ui-icon-triangle-1-w"/><div class="grade-helper-inner ui-widget-content ui-corner-all"><table><tr><th>Original Score</th><th>Uploaded Score</th></tr><tr><td>#{originalScore}</td><td>#{uploadedScore}</td></tr></tbody></table></div> </div>',
{originalScore:10,uploadedScore:15})).appendTo(l)};this.destroy=function(){j.remove()};this.focus=function(){j.focus()};this.setValue=function(q){j.val(q.grade);a=q};this.getValue=function(){return e};this.isValueChanged=function(){return j.val()!=a};this.validate=function(){return{valid:true,msg:null}};this.init()};
function SlickGrid(l,i,e,j){function a(){for(var d=0;d<e.length;d++)$("body").append("<style class='slick-style'> ."+da+" .grid-canvas .c"+d+" { width:"+e[d].width+"px } </style>")}function q(){$("body").find("style.slick_style").remove()}function r(d){if(GlobalEditorLock.isEditing()&&!GlobalEditorLock.hasLock(y))throw"Grid : setSelectedRows : cannot set selected rows when somebody else has an edit lock";for(var h={},k=0;k<d.length;k++)h[d[k]]=true;for(k=0;k<ea.length;k++){var n=ea[k];w[n]&&!h[n]&&
$(w[n]).removeClass("selected")}for(k=0;k<d.length;k++){n=d[k];w[n]&&!ia[n]&&$(w[n]).addClass("selected")}ea=d.concat();ia=h}function u(d,h,k){return k==null||k==undefined?"":k}function v(d,h){console.time("cleanupRows");var k=B,n=G[0],o;for(o in w)if((o<d||o>h)&&o!=s){n.removeChild(w[o]);delete w[o];B--;Q++}console.log("removed "+(k-B)+" rows");console.timeEnd("cleanupRows")}function D(){console.log("removeAllRows");G[0].innerHTML="";w={};Q+=B;B=0}function H(){C.innerWidth();U=C.innerHeight();X=
Y=Math.ceil(U/E);fa=Math.max(fa,Y+2*X);for(var d=0,h=0;h<e.length;h++)d+=e[h].width+5;G.width(d);d=G[0];var k=j.enableAddRow?i.length:i.length-1;for(h in w)if(h>=k){d.removeChild(w[h]);delete w[h];B--;Q++}h=Math.max(E*(i.length+Y-2),U-$.getScrollbarWidth());C.scrollTop()>h-C.height()+$.getScrollbarWidth()&&C.scrollTop(h-C.height()+$.getScrollbarWidth());G.height(h)}function O(){return{top:Math.floor(N/E),bottom:Math.floor((N+U)/E)}}function T(d,h){console.time("renderRows");for(var k=G[0],n=B,o=[],
I=[],F=new Date,J=d;J<=h;J++)if(!w[J]){B++;I.push(J);var K=o,R=J,Z=i[R];K.push("<div class='"+("r"+(R<i.length&&!Z?" loading":"")+(ia[R]?" selected":""))+"' row='"+R+"' style='top:"+E*R+"px'>");for(var V=0,oa=e.length;V<oa;V++){var S=e[V];K.push("<div "+(S.unselectable?"":"hideFocus tabIndex=0 ")+"class='c c"+V+(S.cssClass?" "+S.cssClass:"")+(S.active&&Z.active?" active-col-and-row":"")+"' cell="+V+">");Z&&R<i.length&&K.push(S.formatter(R,V,Z[S.field],S,Z));K.push("</div>")}K.push("</div>");la++}K=
document.createElement("div");K.innerHTML=o.join("");J=0;for(o=K.childNodes.length;J<o;J++)w[I[J]]=k.appendChild(K.firstChild);if(B-n>5)ma=(new Date-F)/(B-n);console.log("rendered "+(B-n)+" rows");console.timeEnd("renderRows")}function M(){var d=O(),h=Math.max(0,d.top-(aa>=0?5:X));d=Math.min(j.enableAddRow?i.length:i.length-1,d.bottom+(aa>0?X:5));B>10&&Math.abs(ba-N)>E*fa?D():v(h,d);T(h,d);ba=N;ga=null}function P(){N=C[0].scrollTop;var d=Math.abs(ba-N),h=C[0].scrollLeft;if(h!=na)ha[0].scrollLeft=
na=h;if(!(d<5*E)){aa=ba==N?0:ba<N?1:-1;ga&&window.clearTimeout(ga);if(d<Y*E)M();else ga=window.setTimeout(M,50);if(y.onViewportChanged)y.onViewportChanged()}}function b(d){switch(d.which){case 27:GlobalEditorLock.isEditing()&&GlobalEditorLock.hasLock(y)&&p();x&&x.focus();break;case 9:d.shiftKey?W(0,-1,true):W(0,1,true);break;case 37:W(0,-1);break;case 39:W(0,1);break;case 38:W(-1,0);break;case 40:case 13:W(1,0);break;default:if(y.onKeyDown&&i[s])if(!z)if(y.onKeyDown(d,s,A)){d.stopPropagation();d.preventDefault();
return false}return}d.stopPropagation();d.preventDefault();return false}function c(d){var h=$(d.target).closest(".c");if(h.length!==0)if(!(x==h[0]&&z!=null)){var k=parseInt(h.parent().attr("row")),n=parseInt(h.attr("cell")),o=null;if(i[k]&&y.onClick)if(!z||(o=ja()))if(y.onClick(d,k,n)){d.stopPropagation();d.preventDefault();return false}if(j.enableCellNavigation&&!e[n].unselectable)if(o==true||o==null&&ja())g(h[0])}}function f(d){d=$(d.target).closest(".c");if(d.length!==0)x==d[0]&&z!=null||j.editOnDoubleClick&&
t()}function g(d,h){if(x!=null){p();$(x).removeClass("selected")}x=d;if(x!=null){s=parseInt($(x).parent().attr("row"));A=parseInt($(x).attr("cell"));$(x).addClass("selected");if(x){var k=C[0].scrollTop;if((s+2)*E>k+U){C[0].scrollTop=s*E;P()}else if(s*E<k){C[0].scrollTop=(s+2)*E-U;P()}}if(j.editable&&!j.editOnDoubleClick&&(i[s]||s==i.length)){window.clearTimeout(ka);if(h)ka=window.setTimeout(t,100);else t()}}else A=s=null;d?r([s]):r([]);if(y.onSelectedRowsChanged)y.onSelectedRowsChanged()}function m(d,
h){if(d<i.length&&!i[d])return false;if(e[h].cannotTriggerInsert&&d>=i.length)return false;if(!e[h].editor)return false;return true}function p(){if(z){z.destroy();$(x).removeClass("editable invalid");if(i[s])x.innerHTML=e[A].formatter(s,A,i[s][e[A].field],e[A],i[s]);z=null;if($.browser.msie)if(document.selection&&document.selection.empty)document.selection.empty();else if(window.getSelection){var d=window.getSelection();d&&d.removeAllRanges&&d.removeAllRanges()}GlobalEditorLock.leaveEditMode(y)}}
function t(){if(x){if(!j.editable)throw"Grid : makeSelectedCellEditable : should never get called when options.editable is false";window.clearTimeout(ka);if(m(s,A)){GlobalEditorLock.enterEditMode(y);$(x).addClass("editable");var d=null;if(i[s])d=i[s][e[A].field];x.innerHTML="";z=new e[A].editor($(x),e[A],d,i[s])}}}function W(d,h,k){if(x)if(j.enableCellNavigation)if(GlobalEditorLock.commitCurrentEdit()){var n=w[s+d],o=n?$(n).find(".c[cell="+(A+h)+"][tabIndex=0]"):null;if(k&&d==0&&!(n&&o&&o.length))if(!o||
!o.length)if(h>0)o=(n=w[s+d+1])?$(n).find(".c[cell][tabIndex=0]:first"):null;else o=(n=w[s+d-1])?$(n).find(".c[cell][tabIndex=0]:last"):null;if(n&&o&&o.length){g(o[0],j.asyncEditorLoading);z||x.focus()}else x.focus()}}function ja(){if(z){if(z.isValueChanged()){var d=z.validate();if(d.valid){d=z.getValue();if(s<i.length)if(e[A].setValueHandler)e[A].setValueHandler(d,e[A],i[s]);else i[s][e[A].field]=d;else if(y.onAddNewRow)y.onAddNewRow(e[A],d);p();return true}else{$(x).addClass("invalid");$(x).stop(true,
true).effect("highlight",{color:"red"},300);if(y.onValidationError)y.onValidationError(x,d,s,A,e[A]);z.focus();return false}}p()}return true}var pa={enableAddRow:true,manualScrolling:false,editable:true,editOnDoubleClick:false,enableCellNavigation:true,defaultColumnWidth:80,enableColumnReorder:true,asyncEditorLoading:true},E=24,fa=50,X=5,da="slickgrid_"+Math.round(1E6*Math.random()),y=this,ha,L,C,G,U,s,A,x=null,z=null,w={},B=0,Y,ba=0,N=0,na=0,aa=1,ma=10,ea=[],ia={},ca={},ka=null,ga=null,la=0,Q=0;
document.createDocumentFragment();this.debug=function(){var d="";d+="\ncounter_rows_rendered:  "+la;d+="\ncounter_rows_removed:  "+Q;d+="\nrenderedRows:  "+B;d+="\nnumVisibleRows:  "+Y;d+="\nCAPACITY:  "+fa;d+="\nBUFFER:  "+X;d+="\navgRowRenderTime:  "+ma;alert(d)};this.benchmark_render_200=function(){D();T(0,200);v()};this.stressTest=function(){console.time("benchmark-stress");T(0,500);v();console.timeEnd("benchmark-stress");window.setTimeout(y.stressTest,50)};this.benchmarkFn=function(d){var h=
new Date,k=Array(arguments);k.splice(0,1);y[d].call(this,k);alert("Grid : benchmarkFn : "+d+" : "+(new Date-h)+"ms")};(function(){j=$.extend({},pa,j);l.empty().attr("tabIndex",0).attr("hideFocus",true).css("overflow","hidden").css("outline",0).css("position","relative").addClass(da);ha=$("<div class='grid-header' style='overflow:hidden;position:relative;' />").appendTo(l);L=$("<div style='width:10000px' />").appendTo(ha);C=$("<div tabIndex='0' hideFocus style='width:100%;overflow:scroll;outline:0;position:relative;outline:0px;'>").appendTo(l);
G=$("<div class='grid-canvas' tabIndex='0' hideFocus />").appendTo(C);C.height(l.innerHeight()-ha.outerHeight());for(var d=0;d<e.length;d++){var h=e[d];ca[h.id]=d;if(!h.width)h.width=j.defaultColumnWidth;if(!h.formatter)h.formatter=u;var k=$("<div class='h c"+d+"' cell="+d+" id='"+h.id+"' />").html(h.name).width(h.width).appendTo(L);h.rerenderOnResize&&k.append(" <img src='images/help.png' align='absmiddle' title='This column has an adaptive formatter.  Resize to a smaller size to see alternative data representation.'>")}L.find(".h").each(function(){var n=
parseInt($(this).attr("cell"));n=e[n];if(n.resizable!==false)$(this).resizable({handles:"e",minWidth:n.minWidth?n.minWidth:null,maxWidth:n.maxWidth?n.maxWidth:null,stop:function(){var o=$(this).attr("id");o=ca[o];e[o].width=$(this).width();$("body").append("<style class='slick-style'> ."+da+" .grid-canvas .c"+o+"{width: "+e[o].width+"px;} </style>");H();e[o].rerenderOnResize&&D();M()}})});j.enableColumnReorder&&L.sortable({axis:"x",cancel:".ui-resizable-handle",update:function(n){console.time("column reorder");
for(var o=L.sortable("toArray"),I={},F=0;F<e.length;F++)I[e[F].id]=e[F];for(F=0;F<o.length;F++){ca[o[F]]=F;e[F]=I[o[F]]}D();q();a();M();if(y.onColumnsReordered)y.onColumnsReordered();n.stopPropagation();console.timeEnd("column reorder")}});L.bind("click",function(n){if($(n.target).hasClass(".h")){n=$(n.target).attr("id");if(y.onColumnHeaderClick)y.onColumnHeaderClick(e[ca[n]])}});a();H();M();j.manualScrolling||C.bind("scroll",P);G.bind("keydown",b);G.bind("click",c);G.bind("dblclick",f);if($.browser.msie)C[0].onselectstart=
function(){if(event.srcElement.tagName!="INPUT"&&event.srcElement.tagName!="TEXTAREA")return false}})();$.extend(this,{onColumnHeaderClick:null,onClick:null,onKeyDown:null,onAddNewRow:null,onValidationError:null,onViewportChanged:null,onSelectedRowsChanged:null,onColumnsReordered:null,destroy:function(){z&&p();L.sortable("destroy");L.find(".h").resizable("destroy");q();l.empty().removeClass(da)},getColumnIndex:function(d){return ca[d]},updateCell:function(d,h){if(w[d]){var k=$(w[d]).find(".c[cell="+
h+"]");if(k.length!==0){var n=e[h],o=i[d];if(z&&s==d&&A==h)z.setValue(o[n.field]);else k[0].innerHTML=o?n.formatter(d,h,o[n.field],n,o):""}}},updateRow:function(d){w[d]&&$(w[d]).find(".c").each(function(h){var k=e[h];if(d==s&&h==A&&z)z.setValue(i[s][k.field]);else this.innerHTML=i[d]?k.formatter(d,h,i[d][k.field],k,i[d]):""})},removeRow:function(d){var h=w[d];if(h){if(z&&s==d)throw"Grid : removeRow : Cannot remove a row that is currently in edit mode";aa=0;h.parentNode.removeChild(h);delete w[d];
B--;Q++}},removeRows:function(d){console.time("removeRows");if(d&&d.length){aa=0;for(var h=[],k=0,n=d.length;k<n;k++){if(z&&s==k)throw"Grid : removeRow : Cannot remove a row that is currently in edit mode";var o=w[d[k]];o&&h.push(d[k])}if(B>10&&h.length==B){G[0].innerHTML="";w={};Q+=B;B=0}else{k=0;for(d=h.length;k<d;k++){o=w[h[k]];o.parentNode.removeChild(o);delete w[h[k]];B--;Q++}}console.timeEnd("removeRows")}},removeAllRows:D,render:M,getViewport:O,resizeCanvas:H,scroll:scroll,getCellFromPoint:function(d,
h){for(var k=Math.floor(h/E),n=0,o=0,I=0;I<e.length&&o<h;I++){o+=e[I].width;n++}return{row:k,cell:n-1}},gotoCell:function(d,h){if(!(d>i.length||d<0||h>=e.length||h<0))if(!(!j.enableCellNavigation||e[h].unselectable))if(GlobalEditorLock.commitCurrentEdit()){w[d]||T(d,d);h=$(w[d]).find(".c[cell="+h+"][tabIndex=0]")[0];g(h);z||x.focus()}},editCurrentCell:t,getSelectedRows:function(){return ea.concat()},setSelectedRows:r,setColumnHeaderCssClass:function(d,h,k){L.find(".h[id="+d+"]").removeClass(k).addClass(h)},
commitCurrentEdit:ja,cancelCurrentEdit:function(){p()}})}
var GlobalEditorLock=new function(){var l=null;this.isEditing=function(){return l!=null};this.hasLock=function(i){return l==i};this.enterEditMode=function(i){if(l!=null)throw"GlobalEditorLock : enterEditMode : currentEditor == null";if(!i.commitCurrentEdit)throw"GlobalEditorLock : enterEditMode : editor must implement .commitCurrentEdit()";if(!i.cancelCurrentEdit)throw"GlobalEditorLock : enterEditMode : editor must implement .cancelCurrentEdit()";l=i};this.leaveEditMode=function(i){if(l!=i)throw"GlobalEditorLock : leaveEditMode() : currentEditor != editor";
l=null};this.commitCurrentEdit=function(){if(l)return l.commitCurrentEdit();return true};this.cancelCurrentEdit=function(){l&&l.cancelCurrentEdit()}},GradebookUploader;
I18n.scoped("gradebook",function(l){GradebookUploader={init:function(){var i;i=$.extend(true,{},originalGradebook);var e=$("#gradebook_grid"),j={columns:[{id:"student",name:l.t("student","Student"),field:"student",width:250,cssClass:"cell-title",editor:StudentNameEditor,validator:requiredFieldValidator,formatter:StudentNameFormatter}],options:{enableAddRow:false,enableColumnReorder:false,asyncEditorLoading:true},data:[]};$.each(i.assignments,function(){j.columns.push({id:this.id,name:$.htmlEscape(this.title),
field:this.id,width:200,editor:NullGradeEditor,formatter:simpleGradeCellFormatter,_original:this})});$.each(i.students,function(){var a={student:this,id:this.id,_original:this};$.each(this.submissions,function(){a[this.assignment_id]=this;a[this.assignment_id]._original=$.extend({},this)});j.data.push(a)});$.each(uploadedGradebook.assignments,function(){var a,q=this;if(this.original_id){a=_.detect(j.columns,function(r){return r._original&&r._original.id==q.original_id});a.cssClass="active changed"}else{a=
{id:q.id,name:$.htmlEscape(q.title),field:q.id,formatter:simpleGradeCellFormatter,cssClass:"active new"};j.columns.push(a)}a.editor=GradeCellEditor;a.active=true;a._uploaded=q;a.setValueHandler=function(r,u,v){if(v[u.id])v[u.id].grade=v[u.id]._uploaded.grade=r;else{r={grade:r,assignment_id:u.id};r._uploaded=r;r=v._uploaded.submissions.push(r);v[u.id]=v._uploaded.submissions[r-1]}}});$.each(uploadedGradebook.students,function(){var a,q=this;if(q.original_id)a=_.detect(j.data,function(r){return r._original&&
r._original.id==q.original_id});else{a={id:q.id,student:q};j.data.push(a)}$.each(q.submissions,function(){a[this.assignment_id]=a[this.assignment_id]?$.extend(a[this.assignment_id],this):this;if(!a[this.assignment_id]._original&&this.grade)a[this.assignment_id]._original={score:null};a[this.assignment_id]._uploaded=this});a.active=true;a._uploaded=q});i=j.columns.length;j.columns=_.select(j.columns,function(a){return a.id==="student"||_.detect(j.data,function(q){return q[a.id]&&q[a.id]._original&&
q[a.id]._uploaded&&q[a.id]._original.score!=q[a.id]._uploaded.grade})});if(j.columns.length>1){j.columns.length<i&&$("#assignments_without_changes_alert").show();$("#gradebook_grid_form").submit(function(){var a=function(q,r){$.each(["_original","_uploaded"],function(u,v){if(r[v]){var D=$.extend({},r[v]);delete r[v];delete D[v];r[v]=D}})};$.each(uploadedGradebook.students,function(){$.each(this.submissions,a)});$(this).find("input[name='json_data_to_submit']").val(JSON.stringify(uploadedGradebook))}).show();
$(window).resize(function(){e.height($(window).height()-e.offset().top-50)}).triggerHandler("resize");i=new SlickGrid(e,j.data,j.columns,j.options);i.onColumnHeaderClick=function(){}}else $("#no_changes_detected").show()},handleThingsNeedingToBeResolved:function(){var i={},e={};originalGradebook.assignments=originalGradebook.active_assignments;$.each(["student","assignment"],function(j,a){var q=$("#"+a+"_resolution_template").remove(),r=q.find("select");i[a]=[];$.each(uploadedGradebook[a+"s"],function(){this.original_id||
i[a].push(this)});if(i[a].length){r.change(function(){$(this).next(".points_possible_section").css({opacity:0});if($(this).val()>0){$("#"+a+"_resolution_template select option").removeAttr("disabled");$("#"+a+"_resolution_template select").each(function(){$("#"+a+"_resolution_template select").not(this).find("option[value='"+$(this).val()+"']").attr("disabled",true)})}else $(this).val()==="new"&&$(this).next(".points_possible_section").css({opacity:1})});e[a]=_.reject(originalGradebook[a+"s"],function(u){return _.detect(uploadedGradebook[a+
"s"],function(v){return v.original_id==u.id})});$.each(e[a],function(){$('<option value="'+this.id+'" >'+$.htmlEscape(this.name||this.title)+"</option>").appendTo(r)});$.each(i[a],function(u,v){q.clone(true).fillTemplateData({iterator:v.id,data:{name:v.name,title:v.title,points_possible:v.points_possible}}).appendTo("#gradebook_importer_resolution_section ."+a+"_section table tbody").show().find("input.points_possible").change(function(){v.points_possible=$(this).val()})});$("#gradebook_importer_resolution_section, #gradebook_importer_resolution_section ."+
a+"_section").show()}});i.student.length||i.assignment.length?$("#gradebook_importer_resolution_section").submit(function(j){var a=false;j.preventDefault();$(this).find("select").each(function(){if(!$(this).val()){a=true;$(this).errorBox(l.t("errors.select_an_option","Please select an option"));return false}});if(a)return false;$(this).find("select").each(function(){var q=$(this),r=q.attr("name").split("_"),u=r[0],v=r[1];q=q.val();switch(q){case "new":break;case "ignore":for(var D in uploadedGradebook[u+
"s"])if(v==uploadedGradebook[u+"s"][D].id){uploadedGradebook[u+"s"].splice(D,1);break}break;default:_.detect(uploadedGradebook[u+"s"],function(H){return v==H.id}).original_id=q}});$(this).hide();GradebookUploader.init()}):GradebookUploader.init()}}});$.extend(true,I18n=I18n||{},{translations:{es:{gradebook:{errors:{select_an_option:"Por favor seleccione una opci\u00f3n"},student:"Estudiante"}}}});
