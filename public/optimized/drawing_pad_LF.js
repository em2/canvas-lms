function prepareCanvasLF(a,b,c,d,e){function P(){++N>=M&&bb()}function R(){c=!1,bb()}function S(){c=!0,bb()}function T(){c&&(j=!0,V())}function U(){c&&(j=!1,W())}function V(a){if(!a)var a=event;c&&(h=a.pageX-g.offsetLeft,i=a.pageY-g.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop-g.offsetTop+60,Z(),bb())}function W(a){if(!a)var a=event;c&&(a.preventDefault(),h=a.targetTouches[0].pageX-g.offsetLeft,i=a.targetTouches[0].pageY-g.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop-g.offsetTop+60,Z(),bb(),j||(j=!0))}function X(){c&&(j=!1,C=!1)}function Y(){c&&(j=!1,C=!1)}function Z(){h>G+I+16&&i>K&&!j&&(i<K+L*2?(E="marker",F="normal"):i<K+L*3&&(E="eraser",F="huge")),C=!0,_()}function _(){c&&C&&(w.push(h),x.push(i),z.push(E),y.push(D),A.push(F),B.push(j),$("#explain_canvas_"+b+"_click_x_data").val(w.toString()),$("#explain_canvas_"+b+"_click_y_data").val(x.toString()),$("#explain_canvas_"+b+"_click_color_data").val(y.toString()),$("#explain_canvas_"+b+"_click_tool_data").val(z.toString()),$("#explain_canvas_"+b+"_click_size_data").val(A.toString()),$("#explain_canvas_"+b+"_click_drag_data").val(B.toString()),$("#explain_canvas_"+b+"_click_x_data").change())}function ba(){k.clearRect(0,0,l,m)}function bb(){if(N<M)return;ba(),E=="marker"&&c==1?k.drawImage(t,0,0,l,m):E=="eraser"&&c==1?k.drawImage(u,0,0,l,m):c?alert("Error: Current Tool is undefined"):k.drawImage(v,0,0,l-104,m);var a=649,b=37;c==1&&(k.beginPath(),k.moveTo(a,b),k.lineTo(a+10,b+6),k.lineTo(a,b+11),k.lineTo(a,b),k.closePath(),k.fillStyle=r,k.fill()),k.save(),k.beginPath(),k.rect(G,H,I,J),k.clip();var d,e=0;for(;e<w.length;e++)A[e]=="small"?d=2:A[e]=="normal"?d=3:A[e]=="large"?d=10:A[e]=="huge"?d=20:(alert("Error: Radius is zero for click "+e),d=0),k.beginPath(),B[e]?k.moveTo(w[e-1]-15,x[e-1]-70):k.moveTo(w[e]-15,x[e]-70),k.lineTo(w[e]-15,x[e]-70),k.closePath(),z[e]=="eraser"?k.strokeStyle="white":k.strokeStyle=y[e],k.lineJoin="round",k.lineWidth=d,k.stroke();k.restore(),k.globalAlpha=1,k.drawImage(f,G,H,I,J)}if(d==1)return;var f=new Image;f.src=e;var g,h,i,j=!1,k,l=722,m=170,n=25,o=8,p="#cb3594",q="#659b41",r="#0033ff",s="#000000",t=new Image,u=new Image,v=new Image,w=new Array,x=new Array,y=new Array,z=new Array,A=new Array,B=new Array,C=!1,D=r,E="marker",F="normal",G=10,H=10,I=600,J=150,K=55,L=38,M=3,N=0;if($("#explain_canvas_"+b+"_click_x_data").val().length>0){w=$("#explain_canvas_"+b+"_click_x_data").val(),w=w.split(","),x=$("#explain_canvas_"+b+"_click_y_data").val(),x=x.split(","),y=$("#explain_canvas_"+b+"_click_color_data").val(),y=y.split(","),z=$("#explain_canvas_"+b+"_click_tool_data").val(),z=z.split(","),A=$("#explain_canvas_"+b+"_click_size_data").val(),A=A.split(","),B=$("#explain_canvas_"+b+"_click_drag_data").val(),B=B.split(",");for(var O=0;O<w.length;O++)w[O]=parseInt(w[O]),x[O]=parseInt(x[O]);for(var O=0;O<B.length;O++)B[O]=="true"?B[O]=!0:B[O]=!1}var Q=document.getElementById(a),g=document.createElement("canvas");g.setAttribute("width",l),g.setAttribute("height",m),g.setAttribute("id","canvas_"+a),g.setAttribute("name","canvas_"+a),Q.appendChild(g),typeof G_vmlCanvasManager!="undefined"&&(g=G_vmlCanvasManager.initElement(g));var k=g.getContext("2d");t.onload=function(){P()},t.src="../../../../images/canvas_drawing/marker-background_LF.png",u.onload=function(){P()},u.src="../../../../images/canvas_drawing/eraser-background_LF.png",v.onload=function(){P()},v.src="../../../../images/canvas_drawing/plain-background_LF.png",$("#canvas_"+a).bind("mousedown",function(a){T()}),$("#canvas_"+a).bind("mousemove",function(a){V(a.originalEvent)}),$(document.body).bind("mouseup",function(a){X()}),$("#canvas_"+a).bind("touchstart",function(a){U()}),$("#canvas_"+a).bind("touchmove",function(a){W(a.originalEvent)}),$("#canvas_"+a).bind("touchend",function(a){Y()}),$(document.body).bind("touchcancel",function(a){Y()}),$("#canvas_"+a).bind("hideYerStuff",function(a){R()}),$("#canvas_"+a).bind("showYerStuff",function(a){S()})}