Raphael.fn.g.linechart=function(a,b,c,d,e,f,g){function h(a,b){var c=a.length/b,d=0,e=c,f=0,g=[];while(d<a.length)e--,e<0?(f+=a[d]*(1+e),g.push(f/c),f=a[d++]*-e,e+=c):f+=a[d++];return g}function i(g){var h=[];for(var i=0,j=e.length;i<j;i++)h=h.concat(e[i]);h.sort();var k=[],l=[];for(var i=0,j=h.length;i<j;i++)h[i]!=h[i-1]&&k.push(h[i])&&l.push(a+p+(h[i]-n)*q);h=k,j=h.length;var m=g||y.set();for(var i=0;i<j;i++){var o=l[i]-(l[i]-(l[i-1]||a))/2,r=((l[i+1]||a+c)-l[i])/2+(l[i]-(l[i-1]||a))/2,t;g?t={}:m.push(t=y.rect(o-1,b,Math.max(r+1,1),d).attr({stroke:"none",fill:"#000",opacity:0})),t.values=[],t.symbols=y.set(),t.y=[],t.x=l[i],t.axis=h[i];for(var v=0,w=f.length;v<w;v++){k=e[v]||e[0];for(var x=0,A=k.length;x<A;x++)k[x]==h[i]&&(t.values.push(f[v][x]),t.y.push(b+d-p-(f[v][x]-s)*u),t.symbols.push(B.symbols[v][x]))}g&&g.call(t)}!g&&(z=m)}function j(c){var g=c||y.set(),h;for(var i=0,j=f.length;i<j;i++)for(var k=0,l=f[i].length;k<l;k++){var m=a+p+((e[i]||e[0])[k]-n)*q,o=a+p+((e[i]||e[0])[k?k-1:1]-n)*q,r=b+d-p-(f[i][k]-s)*u;c?h={}:g.push(h=y.circle(m,r,Math.abs(o-m)/2).attr({stroke:"none",fill:"#000",opacity:0})),h.x=m,h.y=r,h.value=f[i][k],h.line=B.lines[i],h.shade=B.shades[i],h.symbol=B.symbols[i][k],h.symbols=B.symbols[i],h.axis=(e[i]||e[0])[k],c&&c.call(h)}!c&&(A=g)}g=g||{},this.raphael.is(e[0],"array")||(e=[e]),this.raphael.is(f[0],"array")||(f=[f]);var k=Array.prototype.concat.apply([],e),l=Array.prototype.concat.apply([],f),m=this.g.snapEnds(Math.min.apply(Math,k),Math.max.apply(Math,k),e[0].length-1),n=m.from,o=m.to,p=g.gutter||10,q=(c-p*2)/(o-n),r=this.g.snapEnds(Math.min.apply(Math,l),Math.max.apply(Math,l),f[0].length-1),s=r.from,t=r.to,u=(d-p*2)/(t-s),v=Math.max(e[0].length,f[0].length),w=g.symbol||"",x=g.colors||Raphael.fn.g.colors,y=this,z=null,A=null,B=this.set(),C=[];for(var D=0,E=f.length;D<E;D++)v=Math.max(v,f[D].length);var F=this.set();for(var D=0,E=f.length;D<E;D++)g.shade&&F.push(this.path().attr({stroke:"none",fill:x[D],opacity:g.nostroke?1:.3})),f[D].length>c-2*p&&(f[D]=h(f[D],c-2*p),v=c-2*p),e[D]&&e[D].length>c-2*p&&(e[D]=h(e[D],c-2*p));var G=this.set();if(g.axis){var H=(g.axis+"").split(/[,\s]+/);+H[0]&&G.push(this.g.axis(a+p,b+p,c-2*p,n,o,g.axisxstep||Math.floor((c-2*p)/20),2)),+H[1]&&G.push(this.g.axis(a+c-p,b+d-p,d-2*p,s,t,g.axisystep||Math.floor((d-2*p)/20),3)),+H[2]&&G.push(this.g.axis(a+p,b+d-p,c-2*p,n,o,g.axisxstep||Math.floor((c-2*p)/20),0)),+H[3]&&G.push(this.g.axis(a+p,b+d-p,d-2*p,s,t,g.axisystep||Math.floor((d-2*p)/20),1))}var I=this.set(),J=this.set(),K;for(var D=0,E=f.length;D<E;D++){g.nostroke||I.push(K=this.path().attr({stroke:x[D],"stroke-width":g.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":g.dash||""}));var L=this.raphael.is(w,"array")?w[D]:w,M=this.set();C=[];for(var N=0,O=f[D].length;N<O;N++){var P=a+p+((e[D]||e[0])[N]-n)*q,Q=b+d-p-(f[D][N]-s)*u;(Raphael.is(L,"array")?L[N]:L)&&M.push(this.g[Raphael.fn.g.markers[this.raphael.is(L,"array")?L[N]:L]](P,Q,(g.width||2)*3).attr({fill:x[D],stroke:"none"})),C=C.concat([N?"L":"M",P,Q])}J.push(M),g.shade&&F[D].attr({path:C.concat(["L",P,b+d-p,"L",a+p+((e[D]||e[0])[0]-n)*q,b+d-p,"z"]).join(",")}),!g.nostroke&&K.attr({path:C.join(",")})}return B.push(I,F,J,G,z,A),B.lines=I,B.shades=F,B.symbols=J,B.axis=G,B.hoverColumn=function(a,b){return!z&&i(),z.mouseover(a).mouseout(b),this},B.clickColumn=function(a){return!z&&i(),z.click(a),this},B.hrefColumn=function(a){var b=y.raphael.is(arguments[0],"array")?arguments[0]:arguments;if(!(arguments.length-1)&&typeof a=="object")for(var c in a)for(var d=0,e=z.length;d<e;d++)z[d].axis==c&&z[d].attr("href",a[c]);!z&&i();for(var d=0,e=b.length;d<e;d++)z[d]&&z[d].attr("href",b[d]);return this},B.hover=function(a,b){return!A&&j(),A.mouseover(a).mouseout(b),this},B.click=function(a){return!A&&j(),A.click(a),this},B.each=function(a){return j(a),this},B.eachColumn=function(a){return i(a),this},B}