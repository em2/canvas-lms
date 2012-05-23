(function(a){function b(b){function c(){bb=!0}function d(){bb=!1,T()}function e(a){bf=a}function f(a){bh=a}function g(a){a=a||0;var b;for(var c=a,d=X.length;c<d;c++){b=X[c][W];if(b===undefined)throw"Each data element must implement a unique 'id' property";Z[b]=c}}function h(){var a;for(var b=0,c=X.length;b<c;b++){a=X[b][W];if(a===undefined||Z[a]!==b)throw"Each data element must implement a unique 'id' property"}}function i(){return X}function j(a,b){b!==undefined&&(W=b),X=bi=a,Z={},g(),h(),T()}function k(a){a.pageSize!=undefined&&(bv=a.pageSize),a.pageNum!=undefined&&(bw=Math.min(a.pageNum,Math.ceil(bx/bv))),bA.notify(l(),null,U),T()}function l(){return{pageSize:bv,pageNum:bw,totalRows:bx}}function m(a,b){bc=b,be=a,bd=null,b===!1&&X.reverse(),X.sort(a),b===!1&&X.reverse(),Z={},g(),T()}function n(a,b){bc=b,bd=a,be=null;var c=Object.prototype.toString;Object.prototype.toString=typeof a=="function"?a:function(){return this[a]},b===!1&&X.reverse(),X.sort(),Object.prototype.toString=c,b===!1&&X.reverse(),Z={},g(),T()}function o(){be?m(be,bc):bd&&n(bd,bc)}function p(a){_=a,bj=O(),bk=P(),T()}function q(a,c,d){b.groupItemMetadataProvider||(b.groupItemMetadataProvider=new Slick.Data.GroupItemMetadataProvider),bm=a,bn=typeof bm=="function",bo=c,bp=d,br={},bq=[],T()}function r(a,b){bs=a,bt=b!==undefined?b:bt,bu=[];var c=bs.length;while(c--)bu[c]=N(bs[c]);T()}function s(a){return X[a]}function t(a){return Z[a]}function u(){if(!$){$={};for(var a=0,b=Y.length;a<b;a++)$[Y[a][W]]=a}}function v(a){return u(),$[a]}function w(a){return X[Z[a]]}function x(a,b){if(Z[a]===undefined||a!==b[W])throw"Invalid or non-matching id";X[Z[a]]=b,ba||(ba={}),ba[a]=!0,T()}function y(a,b){X.splice(a,0,b),g(a),T()}function z(a){X.push(a),g(X.length-1),T()}function A(a){var b=Z[a];if(b===undefined)throw"Invalid id";delete Z[a],X.splice(b,1),g(b),T()}function B(){return Y.length}function C(a){return Y[a]}function D(a){var c=Y[a];return c===undefined?null:c.__group?b.groupItemMetadataProvider.getGroupRowMetadata(c):c.__groupTotals?b.groupItemMetadataProvider.getTotalsRowMetadata(c):null}function E(a){br[a]=!0,T()}function F(a){delete br[a],T()}function G(){return bq}function H(a){var b,c,d=[],e=[],f;for(var g=0,h=a.length;g<h;g++)f=a[g],c=bn?bm(f):f[bm],c=c||0,b=e[c],b||(b=new Slick.Group,b.count=0,b.value=c,b.rows=[],d[d.length]=b,e[c]=b),b.rows[b.count++]=f;return d}function I(a){if(a.collapsed&&!bt)return;var b=new Slick.GroupTotals,c,d=bs.length;while(d--)c=bs[d],c.init(),bu[d].call(c,a.rows),c.storeResult(b);b.group=a,a.totals=b}function J(a){var b=a.length;while(b--)I(a[b])}function K(a){var b=a.length,c;while(b--)c=a[b],c.collapsed=c.value in br,c.title=bo?bo(c):c.value}function L(a){var b=[],c=0,d;for(var e=0,f=a.length;e<f;e++){d=a[e],b[c++]=d;if(!d.collapsed)for(var g=0,h=d.rows.length;g<h;g++)b[c++]=d.rows[g];d.totals&&(!d.collapsed||bt)&&(b[c++]=d.totals)}return b}function M(a){var b=/^function[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/,c=a.toString().match(b);return{params:c[1].split(","),body:c[2]}}function N(a){var b=M(a.accumulate),c=new Function("_items","for (var "+b.params[0]+", _i=0, _il=_items.length; _i<_il; _i++) {"+b.params[0]+" = _items[_i]; "+b.body+"}");return c.displayName=c.name="compiledAccumulatorLoop",c}function O(){var a=M(_),b=a.body.replace(/return false;/gi,"{ continue _coreloop; }").replace(/return true;/gi,"{ _retval[_idx++] = $item$; continue _coreloop; }").replace(/return ([^;]+?);/gi,"{ if ($1) { _retval[_idx++] = $item$; }; continue _coreloop; }"),c=["var _retval = [], _idx = 0; ","var $item$, $args$ = _args; ","_coreloop: ","for (var _i = 0, _il = _items.length; _i < _il; _i++) { ","$item$ = _items[_i]; ","$filter$; ","} ","return _retval; "].join("");c=c.replace(/\$filter\$/gi,b),c=c.replace(/\$item\$/gi,a.params[0]),c=c.replace(/\$args\$/gi,a.params[1]);var d=new Function("_items,_args",c);return d.displayName=d.name="compiledFilter",d}function P(){var a=M(_),b=a.body.replace(/return false;/gi,"{ continue _coreloop; }").replace(/return true;/gi,"{ _cache[_i] = true;_retval[_idx++] = $item$; continue _coreloop; }").replace(/return ([^;]+?);/gi,"{ if ((_cache[_i] = $1)) { _retval[_idx++] = $item$; }; continue _coreloop; }"),c=["var _retval = [], _idx = 0; ","var $item$, $args$ = _args; ","_coreloop: ","for (var _i = 0, _il = _items.length; _i < _il; _i++) { ","$item$ = _items[_i]; ","if (_cache[_i]) { ","_retval[_idx++] = $item$; ","continue _coreloop; ","} ","$filter$; ","} ","return _retval; "].join("");c=c.replace(/\$filter\$/gi,b),c=c.replace(/\$item\$/gi,a.params[0]),c=c.replace(/\$args\$/gi,a.params[1]);var d=new Function("_items,_args,_cache",c);return d.displayName=d.name="compiledFilterWithCaching",d}function Q(a){_&&!bf.isFilterUnchanged?bf.isFilterNarrowing?bi=bj(bi,bh):bf.isFilterExpanding?bi=bk(a,bh,bl):bi=bj(a,bh):bi=bv?a:a.concat();var b;return bv?(bi.length<bw*bv&&(bw=Math.floor(bi.length/bv)),b=bi.slice(bv*bw,bv*bw+bv)):b=bi,{totalRows:bi.length,rows:b}}function R(a,b){var c,d,e,f=[],g=0,h=b.length;bf&&bf.ignoreDiffsBefore&&(g=Math.max(0,Math.min(b.length,bf.ignoreDiffsBefore))),bf&&bf.ignoreDiffsAfter&&(h=Math.min(b.length,Math.max(0,bf.ignoreDiffsAfter)));for(var i=g,j=a.length;i<h;i++)if(i<j){c=b[i],d=a[i];if(bm&&(e=c.__nonDataRow||d.__nonDataRow)&&c.__group!==d.__group||c.__updated||c.__group&&!c.equals(d)||bs&&e&&(c.__groupTotals||d.__groupTotals)||c[W]!=d[W]||ba&&ba[c[W]])f[f.length]=i}else f[f.length]=i;return f}function S(a){$=null;if(bf.isFilterNarrowing!=bg.isFilterNarrowing||bf.isFilterExpanding!=bg.isFilterExpanding)bl=[];var b=Q(a);bx=b.totalRows;var c=b.rows;bq=[],bm!=null&&(bq=H(c),bq.length&&(K(bq),bs&&J(bq),bq.sort(bp),c=L(bq)));var d=R(Y,c);return Y=c,d}function T(){if(bb)return;var a=Y.length,b=bx,c=S(X,_);bv&&bx<bw*bv&&(bw=Math.floor(bx/bv),c=S(X,_)),ba=null,bg=bf,bf={},b!=bx&&bA.notify(l(),null,U),a!=Y.length&&by.notify({previous:a,current:Y.length},null,U),c.length>0&&bz.notify({rows:c},null,U)}var U=this,V={groupItemMetadataProvider:null},W="id",X=[],Y=[],Z={},$=null,_=null,ba=null,bb=!1,bc=!0,bd,be,bf={},bg={},bh,bi=[],bj,bk,bl=[],bm,bn,bo,bp,bq=[],br={},bs,bt=!1,bu,bv=0,bw=0,bx=0,by=new Slick.Event,bz=new Slick.Event,bA=new Slick.Event;return b=a.extend(!0,{},V,b),{beginUpdate:c,endUpdate:d,setPagingOptions:k,getPagingInfo:l,getItems:i,setItems:j,setFilter:p,sort:m,fastSort:n,reSort:o,groupBy:q,setAggregators:r,collapseGroup:E,expandGroup:F,getGroups:G,getIdxById:t,getRowById:v,getItemById:w,getItemByIdx:s,setRefreshHints:e,setFilterArgs:f,refresh:T,updateItem:x,insertItem:y,addItem:z,deleteItem:A,getLength:B,getItem:C,getItemMetadata:D,onRowCountChanged:by,onRowsChanged:bz,onPagingInfoChanged:bA}}function c(a){this.field_=a,this.init=function(){this.count_=0,this.nonNullCount_=0,this.sum_=0},this.accumulate=function(a){var b=a[this.field_];this.count_++,b!=null&&b!=NaN&&(this.nonNullCount_++,this.sum_+=1*b)},this.storeResult=function(a){a.avg||(a.avg={}),this.nonNullCount_!=0&&(a.avg[this.field_]=this.sum_/this.nonNullCount_)}}function d(a){this.field_=a,this.init=function(){this.min_=null},this.accumulate=function(a){var b=a[this.field_];b!=null&&b!=NaN&&(this.min_==null||b<this.min_)&&(this.min_=b)},this.storeResult=function(a){a.min||(a.min={}),a.min[this.field_]=this.min_}}function e(a){this.field_=a,this.init=function(){this.max_=null},this.accumulate=function(a){var b=a[this.field_];b!=null&&b!=NaN&&(this.max_==null||b>this.max_)&&(this.max_=b)},this.storeResult=function(a){a.max||(a.max={}),a.max[this.field_]=this.max_}}a.extend(!0,window,{Slick:{Data:{DataView:b,Aggregators:{Avg:c,Min:d,Max:e}}}})})(jQuery)