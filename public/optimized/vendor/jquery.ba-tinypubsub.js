/*!
 * jQuery Tiny Pub/Sub - v0.6 - 1/10/2011
 * http://benalman.com/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
define(["jquery"],function(a){var b=a({}),c,d,e;return a.subscribe=c=function(d,e){function f(){return e.apply(this,Array.prototype.slice.call(arguments,1))}if(a.isPlainObject(d))return a.each(d,function(a,b){c(a,b)});f.guid=e.guid=e.guid||a.guid++,b.bind(d,f)},a.unsubscribe=d=function(){b.unbind.apply(b,arguments)},a.publish=e=function(){b.trigger.apply(b,arguments)},{subscribe:c,unsubscribe:d,publish:e}})