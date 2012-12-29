function prepareCanvasLF(a,b,c,d,e){if(d==1)return;var f=new Image;f.crossOrigin="",f.src=e;var g,h,i,j=!1,k,l=722,m=170,n=25,o=8,p="#cb3594",q="#659b41",r="#0033ff",s="#000000",t=new Image,u=new Image,v=new Image,w=new Array,x=new Array,y=new Array,z=new Array,A=new Array,B=new Array,C=!1,D=r,E="marker",F="normal",G=10,H=10,I=600,J=150,K=55,L=38,M=3,N=0;f.onload=function(){function d(){++N>=M&&R()}function e(){c=!1,R()}function g(){c=!0,R()}function k(){c&&(j=!0,o())}function n(){c&&(j=!1,p())}function o(a){if(!a)var a=event;c&&(h=a.pageX-U.offsetLeft,i=a.pageY-U.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop-U.offsetTop+60,O(),R())}function p(a){if(!a)var a=event;c&&(a.preventDefault(),h=a.targetTouches[0].pageX-U.offsetLeft,i=a.targetTouches[0].pageY-U.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop-U.offsetTop+60,O(),R(),j||(j=!0))}function q(){c&&(j=!1,C=!1)}function s(){c&&(j=!1,C=!1)}function O(){h>G+I+16&&i>K&&!j&&(i<K+L*2?(E="marker",F="normal"):i<K+L*3&&(E="eraser",F="huge")),C=!0,P()}function P(){c&&C&&(w.push(h),x.push(i),z.push(E),y.push(D),A.push(F),B.push(j),$("#explain_canvas_"+b+"_click_x_data").val(w.toString()),$("#explain_canvas_"+b+"_click_y_data").val(x.toString()),$("#explain_canvas_"+b+"_click_color_data").val(y.toString()),$("#explain_canvas_"+b+"_click_tool_data").val(z.toString()),$("#explain_canvas_"+b+"_click_size_data").val(A.toString()),$("#explain_canvas_"+b+"_click_drag_data").val(B.toString()),$("#explain_canvas_"+b+"_click_x_data").change())}function Q(){V.clearRect(0,0,l,m)}function R(){if(N<M)return;Q(),E=="marker"&&c==1?V.drawImage(t,0,0,l,m):E=="eraser"&&c==1?V.drawImage(u,0,0,l,m):c?alert("Error: Current Tool is undefined"):V.drawImage(v,0,0,l-104,m);var a=649,b=37;c==1&&(V.beginPath(),V.moveTo(a,b),V.lineTo(a+10,b+6),V.lineTo(a,b+11),V.lineTo(a,b),V.closePath(),V.fillStyle=r,V.fill()),V.save(),V.beginPath(),V.rect(G,H,I,J),V.clip();var d,e=0;for(;e<w.length;e++)A[e]=="small"?d=2:A[e]=="normal"?d=3:A[e]=="large"?d=10:A[e]=="huge"?d=20:(alert("Error: Radius is zero for click "+e),d=0),V.beginPath(),B[e]?V.moveTo(w[e-1]-15,x[e-1]-70):V.moveTo(w[e]-15,x[e]-70),V.lineTo(w[e]-15,x[e]-70),V.closePath(),z[e]=="eraser"?V.strokeStyle="white":V.strokeStyle=y[e],V.lineJoin="round",V.lineWidth=d,V.stroke();V.restore(),V.globalAlpha=1,V.drawImage(f,G,H,I,J)}if($("#explain_canvas_"+b+"_click_x_data").val().length>0){w=$("#explain_canvas_"+b+"_click_x_data").val(),w=w.split(","),x=$("#explain_canvas_"+b+"_click_y_data").val(),x=x.split(","),y=$("#explain_canvas_"+b+"_click_color_data").val(),y=y.split(","),z=$("#explain_canvas_"+b+"_click_tool_data").val(),z=z.split(","),A=$("#explain_canvas_"+b+"_click_size_data").val(),A=A.split(","),B=$("#explain_canvas_"+b+"_click_drag_data").val(),B=B.split(",");for(var S=0;S<w.length;S++)w[S]=parseInt(w[S]),x[S]=parseInt(x[S]);for(var S=0;S<B.length;S++)B[S]=="true"?B[S]=!0:B[S]=!1}var T=document.getElementById(a),U=document.createElement("canvas");U.setAttribute("width",l),U.setAttribute("height",m),U.setAttribute("id","canvas_"+a),U.setAttribute("name","canvas_"+a),T.appendChild(U),typeof G_vmlCanvasManager!="undefined"&&(U=G_vmlCanvasManager.initElement(U));var V=U.getContext("2d");t.onload=function(){d()},t.src="../../../../images/canvas_drawing/marker-background_LF.png",u.onload=function(){d()},u.src="../../../../images/canvas_drawing/eraser-background_LF.png",v.onload=function(){d()},v.src="../../../../images/canvas_drawing/plain-background_LF.png",$("#canvas_"+a).bind("mousedown",function(a){k()}),$("#canvas_"+a).bind("mousemove",function(a){o(a.originalEvent)}),$(document.body).bind("mouseup",function(a){q()}),$("#canvas_"+a).bind("touchstart",function(a){n()}),$("#canvas_"+a).bind("touchmove",function(a){p(a.originalEvent)}),$("#canvas_"+a).bind("touchend",function(a){s()}),$(document.body).bind("touchcancel",function(a){s()}),$("#canvas_"+a).bind("hideYerStuff",function(a){e()}),$("#canvas_"+a).bind("showYerStuff",function(a){g()})}}