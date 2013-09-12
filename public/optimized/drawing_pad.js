function prepareCanvas(a,b,c,d){function R(a,b){var c,d,e;c=0,d=0;for(e in a)d++;for(e in a)t[e]=new Image,t[e].onload=function(){if(++c>=d)return b()},t[e].src=a[e]}function S(){c=!1,be()}function T(){c=!0,be()}function U(a){c&&(h=!0,W(a))}function V(a){c&&(h=!1,X(a))}function W(a){if(c){var b=Y(a);f=b.x,g=b.y,bb(),bf()}}function X(a){if(c){a.preventDefault();var b=Z(a);f=b.x,g=b.y,bb(),bf(),h||(h=!0)}}function Y(a){var b=e.getBoundingClientRect();return{x:a.clientX-b.left,y:a.clientY-b.top}}function Z(a){var b=e.getBoundingClientRect();return{x:a.targetTouches[0].clientX-b.left,y:a.targetTouches[0].clientY-b.top}}function _(){c&&(h=!1,A=!1)}function ba(){c&&(h=!1,A=!1)}function bb(){f>E+G&&g>I&&!h&&(g<I+J?(C="marker1",D="normal",B=q):g<I+J*2?(C="marker2",D="normal",B=p):g<I+J*3&&(C="eraser",D="huge",B=r)),A=!0,bc()}function bc(){c&&A&&(u.push(f),v.push(g),x.push(C),w.push(B),y.push(D),z.push(h),$("#explain_canvas_"+b+"_click_x_data").val(u.toString()),$("#explain_canvas_"+b+"_click_y_data").val(v.toString()),$("#explain_canvas_"+b+"_click_color_data").val(w.toString()),$("#explain_canvas_"+b+"_click_tool_data").val(x.toString()),$("#explain_canvas_"+b+"_click_size_data").val(y.toString()),$("#explain_canvas_"+b+"_click_drag_data").val(z.toString()),$("#explain_canvas_"+b+"_click_x_data").change())}function bd(){i.clearRect(0,0,j,k)}function be(){bd(),i.drawImage(t.whiteBackgroundImage,0,0,j,k),C==="marker1"&&c===!0?i.drawImage(t.marker1BackgroundImage,0,0,j,k):C!=="marker2"&&C!=="marker"||c!==!0?C==="eraser"&&c===!0?i.drawImage(t.eraserBackgroundImage,0,0,j,k):c?alert("Error: Current Tool is undefined"):i.drawImage(t.plainBackgroungImage,0,0,j-104,k):i.drawImage(t.marker2BackgroundImage,0,0,j,k),c===!0&&(i.beginPath(),i.moveTo(M,N),i.lineTo(M+10,N+6),i.lineTo(M,N+11),i.lineTo(M,N),i.closePath(),i.fillStyle=q,i.fill(),i.beginPath(),i.moveTo(M,O),i.lineTo(M+10,O+6),i.lineTo(M,O+11),i.lineTo(M,O),i.closePath(),i.fillStyle=p,i.fill()),i.save(),i.beginPath(),i.rect(E,F,G,H),i.clip();var a,b=0;for(;b<u.length;b++)y[b]==="small"?a=2:y[b]==="normal"?a=3:y[b]==="large"?a=10:y[b]==="huge"?a=20:(alert("Error: Radius is zero for click "+b),a=0),i.beginPath(),z[b]&&b?i.moveTo(u[b-1],v[b-1]):i.moveTo(u[b],v[b]),i.lineTo(u[b],v[b]),i.closePath(),x[b]==="eraser"?i.strokeStyle=r:i.strokeStyle=w[b],i.lineJoin="round",i.lineWidth=a,i.stroke(),L=b;i.restore(),i.globalAlpha=1}function bf(){var a,b;b=L;for(;b<u.length;b++)y[b]==="small"?a=2:y[b]==="normal"?a=3:y[b]==="large"?a=10:y[b]==="huge"?a=20:(alert("Error: Radius is zero for click "+b),a=0),i.beginPath(),z[b]&&b?i.moveTo(u[b-1],v[b-1]):i.moveTo(u[b],v[b]),i.lineTo(u[b],v[b]),i.closePath(),x[b]==="eraser"?i.strokeStyle=r:i.strokeStyle=w[b],i.lineJoin="round",i.lineWidth=a,i.stroke(),L=b;C==="marker1"&&c===!0?i.drawImage(t.marker1BackgroundImage,0,0,j,k):C!=="marker2"&&C!=="marker"||c!==!0?C==="eraser"&&c===!0?i.drawImage(t.eraserBackgroundImage,0,0,j,k):c?alert("Error: Current Tool is undefined"):i.drawImage(t.plainBackgroungImage,0,0,j-104,k):i.drawImage(t.marker2BackgroundImage,0,0,j,k),c===!0&&(i.beginPath(),i.moveTo(M,N),i.lineTo(M+10,N+6),i.lineTo(M,N+11),i.lineTo(M,N),i.closePath(),i.fillStyle=q,i.fill(),i.beginPath(),i.moveTo(M,O),i.lineTo(M+10,O+6),i.lineTo(M,O+11),i.lineTo(M,O),i.closePath(),i.fillStyle=p,i.fill())}if(d===!0)return;var e,f,g,h=!1,i,j=590,k=332,l=25,m=8,n="#cb3594",o="#659b41",p="#0033ff",q="#000000",r="#FFFFFF",s={},t={},u=new Array,v=new Array,w=new Array,x=new Array,y=new Array,z=new Array,A=!1,B=p,C="marker2",D="normal",E=1,F=1,G=481,H=330,I=30,J=38,K=0,L=0,M=521,N=44,O=83;if($("#explain_canvas_"+b+"_click_x_data").val().length>0){u=$("#explain_canvas_"+b+"_click_x_data").val(),u=u.split(","),v=$("#explain_canvas_"+b+"_click_y_data").val(),v=v.split(","),w=$("#explain_canvas_"+b+"_click_color_data").val(),w=w.split(","),x=$("#explain_canvas_"+b+"_click_tool_data").val(),x=x.split(","),y=$("#explain_canvas_"+b+"_click_size_data").val(),y=y.split(","),z=$("#explain_canvas_"+b+"_click_drag_data").val(),z=z.split(",");for(var P=0;P<u.length;P++)u[P]=parseInt(u[P]),v[P]=parseInt(v[P]);for(var P=0;P<z.length;P++)z[P]==="true"?z[P]=!0:z[P]=!1}var Q=document.getElementById(a),e=document.createElement("canvas");e.setAttribute("width",j),e.setAttribute("height",k),e.setAttribute("id","canvas_"+a),e.setAttribute("name","canvas_"+a),Q.appendChild(e),typeof G_vmlCanvasManager!="undefined"&&(e=G_vmlCanvasManager.initElement(e));var i=e.getContext("2d");return s={marker1BackgroundImage:"../../../../images/canvas_drawing/marker1-background.png",marker2BackgroundImage:"../../../../images/canvas_drawing/marker2-background.png",eraserBackgroundImage:"../../../../images/canvas_drawing/eraser-background.png",plainBackgroungImage:"../../../../images/canvas_drawing/plain-background.png",whiteBackgroundImage:"../../../../images/canvas_drawing/background-white.png"},$("#canvas_"+a).bind("mousedown",function(a){U(a.originalEvent)}),$("#canvas_"+a).bind("mousemove",function(a){W(a.originalEvent)}),$(document.body).bind("mouseup",function(a){_()}),$("#canvas_"+a).bind("touchstart",function(a){V(a.originalEvent)}),$("#canvas_"+a).bind("touchmove",function(a){X(a.originalEvent)}),$("#canvas_"+a).bind("touchend",function(a){ba()}),$(document.body).bind("touchcancel",function(a){ba()}),$("#canvas_"+a).bind("hideYerStuff",function(a){S()}),$("#canvas_"+a).bind("showYerStuff",function(a){T()}),R(s,be)}