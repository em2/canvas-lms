define(["jquery"],function(a){jQuery.cookie=function(a,b,c){if(typeof b=="undefined"){var d=null;if(document.cookie&&document.cookie!=""){var e=document.cookie.split(";");for(var f=0;f<e.length;f++){var g=jQuery.trim(e[f]);if(g.substring(0,a.length+1)==a+"="){d=decodeURIComponent(g.substring(a.length+1));break}}}return d}c=c||{},b===null&&(b="",c.expires=-1);var h="";if(c.expires&&(typeof c.expires=="number"||c.expires.toUTCString)){var i;typeof c.expires=="number"?(i=new Date,i.setTime(i.getTime()+c.expires*24*60*60*1e3)):i=c.expires,h="; expires="+i.toUTCString()}var j=c.path?"; path="+c.path:"",k=c.domain?"; domain="+c.domain:"",l=c.secure?"; secure":"";document.cookie=[a,"=",encodeURIComponent(b),h,j,k,l].join("")}})