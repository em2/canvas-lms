function prepareCanvas(a,b,c,d){function e(){++Y>=X&&q()}function f(){c=!1,q()}function g(){c=!0,q()}function h(a){c&&(u=!0,j(a))}function i(a){c&&(u=!1,k(a))}function j(a){c&&(s=a.pageX-r.offsetLeft,t=a.pageY-r.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop-r.offsetTop+60,n(),q())}function k(a){c&&(a.preventDefault(),s=a.targetTouches[0].pageX-r.offsetLeft,t=a.targetTouches[0].pageY-r.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop-r.offsetTop+60,n(),q(),u||(u=!0))}function l(){c&&(u=!1,N=!1)}function m(){c&&(u=!1,N=!1)}function n(){s>R+T+16&&t>V&&!u&&(t<V+W*2?(P="marker",Q="normal"):t<V+W*3&&(P="eraser",Q="huge")),N=!0,o()}function o(){c&&N&&(H.push(s),I.push(t),K.push(P),J.push(O),L.push(Q),M.push(u),$("#explain_canvas_"+b+"_click_x_data").val(H.toString()),$("#explain_canvas_"+b+"_click_y_data").val(I.toString()),$("#explain_canvas_"+b+"_click_color_data").val(J.toString()),$("#explain_canvas_"+b+"_click_tool_data").val(K.toString()),$("#explain_canvas_"+b+"_click_size_data").val(L.toString()),$("#explain_canvas_"+b+"_click_drag_data").val(M.toString()),$("#explain_canvas_"+b+"_click_x_data").change())}function p(){v.clearRect(0,0,w,x)}function q(){if(Y<X)return;p(),P=="marker"&&c==1?v.drawImage(E,0,0,w,x):P=="eraser"&&c==1?v.drawImage(F,0,0,w,x):c?alert("Error: Current Tool is undefined"):v.drawImage(G,0,0,w-104,x);var a=313,b=75;c==1&&(v.beginPath(),v.moveTo(a,b),v.lineTo(a+10,b+6),v.lineTo(a,b+11),v.lineTo(a,b),v.closePath(),v.fillStyle=C,v.fill()),v.save(),v.beginPath(),v.rect(R,S,T,U),v.clip();var d,e=0;for(;e<H.length;e++)L[e]=="small"?d=2:L[e]=="normal"?d=3:L[e]=="large"?d=10:L[e]=="huge"?d=20:(alert("Error: Radius is zero for click "+e),d=0),v.beginPath(),M[e]&&e?v.moveTo(H[e-1]-15,I[e-1]-70):v.moveTo(H[e]-15,I[e]-70),v.lineTo(H[e]-15,I[e]-70),v.closePath(),K[e]=="eraser"?v.strokeStyle="white":v.strokeStyle=J[e],v.lineJoin="round",v.lineWidth=d,v.stroke();v.restore(),v.globalAlpha=1}if(d==1)return;var r,s,t,u=!1,v,w=386,x=220,y=25,z=8,A="#cb3594",B="#659b41",C="#0033ff",D="#000000",E=new Image,F=new Image,G=new Image,H=new Array,I=new Array,J=new Array,K=new Array,L=new Array,M=new Array,N=!1,O=C,P="marker",Q="normal",R=7,S=11,T=267,U=200,V=95,W=38,X=3,Y=0;if($("#explain_canvas_"+b+"_click_x_data").val().length>0){H=$("#explain_canvas_"+b+"_click_x_data").val(),H=H.split(","),I=$("#explain_canvas_"+b+"_click_y_data").val(),I=I.split(","),J=$("#explain_canvas_"+b+"_click_color_data").val(),J=J.split(","),K=$("#explain_canvas_"+b+"_click_tool_data").val(),K=K.split(","),L=$("#explain_canvas_"+b+"_click_size_data").val(),L=L.split(","),M=$("#explain_canvas_"+b+"_click_drag_data").val(),M=M.split(",");for(var Z=0;Z<H.length;Z++)H[Z]=parseInt(H[Z]),I[Z]=parseInt(I[Z]);for(var Z=0;Z<M.length;Z++)M[Z]=="true"?M[Z]=!0:M[Z]=!1}var _=document.getElementById(a),r=document.createElement("canvas");r.setAttribute("width",w),r.setAttribute("height",x),r.setAttribute("id","canvas_"+a),r.setAttribute("name","canvas_"+a),_.appendChild(r),typeof G_vmlCanvasManager!="undefined"&&(r=G_vmlCanvasManager.initElement(r));var v=r.getContext("2d");E.onload=function(){e()},E.src="../../../../images/canvas_drawing/marker-background.png",F.onload=function(){e()},F.src="../../../../images/canvas_drawing/eraser-background.png",G.onload=function(){e()},G.src="../../../../images/canvas_drawing/plain-background.png",$("#canvas_"+a).bind("mousedown",function(a){h(a.originalEvent)}),$("#canvas_"+a).bind("mousemove",function(a){j(a.originalEvent)}),$(document.body).bind("mouseup",function(a){l()}),$("#canvas_"+a).bind("touchstart",function(a){i(a.originalEvent)}),$("#canvas_"+a).bind("touchmove",function(a){k(a.originalEvent)}),$("#canvas_"+a).bind("touchend",function(a){m()}),$(document.body).bind("touchcancel",function(a){m()}),$("#canvas_"+a).bind("hideYerStuff",function(a){f()}),$("#canvas_"+a).bind("showYerStuff",function(a){g()})}