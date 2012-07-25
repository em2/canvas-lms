/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
define(["jquery"],function(a){function b(a){return a=a||location.href,"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}"$:nomunge";var c="hashchange",d=document,e,f=a.event.special,g=d.documentMode,h="on"+c in window&&(g===undefined||g>7);a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.fn[c].delay=50,f[c]=a.extend(f[c],{setup:function(){if(h)return!1;a(e.start)},teardown:function(){if(h)return!1;a(e.stop)}}),e=function(){function e(){var d=b(),f=l(i);d!==i?(k(i=d,f),a(window).trigger(c)):f!==i&&(location.href=location.href.replace(/#.*/,"")+f),g=setTimeout(e,a.fn[c].delay)}var f={},g,i=b(),j=function(a){return a},k=j,l=j;return f.start=function(){g||e()},f.stop=function(){g&&clearTimeout(g),g=undefined},a.browser.msie&&!h&&function(){var g,h;f.start=function(){g||(h=a.fn[c].src,h=h&&h+b(),g=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){h||k(b()),e()}).attr("src",h||"javascript:0").insertAfter("body")[0].contentWindow,d.onpropertychange=function(){try{event.propertyName==="title"&&(g.document.title=d.title)}catch(a){}})},f.stop=j,l=function(){return b(g.location.href)},k=function(b,e){var f=g.document,h=a.fn[c].domain;b!==e&&(f.title=d.title,f.open(),h&&f.write('<script>document.domain="'+h+'"</script>'),f.close(),g.location.hash=b)}}(),f}()})