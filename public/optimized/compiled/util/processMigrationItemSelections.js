(function(){var a=Object.prototype.hasOwnProperty;define(function(){var b,c,d;return d=/copy\[([^\]]*)\]\[([^\]]*)\]/,c=/copy\[all_([^\]]*)\]/,b=function(b){var e,f,g,h,i,j,k,l,m,n,o,p;l={items_to_copy:{}},f=[],i=b["copy[everything]"]==="1";for(j in b){if(!a.call(b,j))continue;m=b[j];if(k=j.match(d)){h=k[1],g=k[2];if(h==="day_substitutions"){l[j]=m;continue}if(i)continue;m==="1"&&((n=l.items_to_copy)[h]||(n[h]=[]),l.items_to_copy[h].push(g))}else{if(k=j.match(c)){if(i)continue;m==="1"&&f.push(k[1])}l[j]=m}}for(o=0,p=f.length;o<p;o++)e=f[o],delete l.items_to_copy[e];return l}})}).call(this)