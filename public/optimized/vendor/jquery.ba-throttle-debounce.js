/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
define(["jquery"],function(a){var b;a.throttle=b=function(b,c,d,e){function f(){function a(){h=+(new Date),d.apply(i,k)}function f(){g=undefined}var i=this,j=+(new Date)-h,k=arguments;e&&!g&&a(),g&&clearTimeout(g),e===undefined&&j>b?a():c!==!0&&(g=setTimeout(e?f:a,e===undefined?b-j:b))}var g,h=0;return typeof c!="boolean"&&(e=d,d=c,c=undefined),a.guid&&(f.guid=d.guid=d.guid||a.guid++),f},a.debounce=function(a,c,d){return d===undefined?b(a,c,!1):b(a,d,c!==!1)}})