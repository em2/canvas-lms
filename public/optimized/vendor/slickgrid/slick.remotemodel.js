(function(a){function b(){function k(){}function l(a,b){for(var d=a;d<=b;d++)if(c[d]==undefined||c[d]==null)return!1;return!0}function m(){for(var a in c)delete c[a];c.length=0}function n(j,k){if(h){h.abort();for(var l=h.fromPage;l<=h.toPage;l++)c[l*b]=undefined}j<0&&(j=0);var m=Math.floor(j/b),n=Math.floor(k/b);while(c[m*b]!==undefined&&m<n)m++;while(c[n*b]!==undefined&&m<n)n--;if(m>n||m==n&&c[m*b]!==undefined)return;var q="http://services.digg.com/search/stories?query="+d+"&offset="+m*b+"&count="+((n-m)*b+b)+"&appkey=http://slickgrid.googlecode.com&type=javascript";switch(e){case"diggs":q+="&sort="+(f>0?"digg_count-asc":"digg_count-desc")}g!=null&&clearTimeout(g),g=setTimeout(function(){for(var d=m;d<=n;d++)c[d*b]=null;i.notify({from:j,to:k}),h=a.jsonp({url:q,callbackParameter:"callback",cache:!0,success:p,error:function(){o(m,n)}}),h.fromPage=m,h.toPage=n},50)}function o(a,b){alert("error loading pages "+a+" to "+b)}function p(a){var d=this.fromPage*b,e=d+a.count;c.length=parseInt(a.total);for(var f=0;f<a.stories.length;f++)c[d+f]=a.stories[f],c[d+f].index=d+f;h=null,j.notify({from:d,to:e})}function q(a,b){for(var d=a;d<=b;d++)delete c[d];n(a,b)}function r(a,b){e=a,f=b,m()}function s(a){d=a,m()}var b=50,c={length:0},d="apple",e=null,f=1,g=null,h=null,i=new Slick.Event,j=new Slick.Event;return k(),{data:c,clear:m,isDataLoaded:l,ensureData:n,reloadData:q,setSort:r,setSearch:s,onDataLoading:i,onDataLoaded:j}}a.extend(!0,window,{Slick:{Data:{RemoteModel:b}}})})(jQuery)