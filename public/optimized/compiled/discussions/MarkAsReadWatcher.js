(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["compiled/backbone-ext/Backbone","i18n!discussions","use!underscore","jquery","jquery.ajaxJSON"],function(b,c,d,e){var f,g,h;return g=2e3,f=100,h=function(){function c(b){this.view=b,this.markAsRead=a(this.markAsRead,this),c.unread.push(this),this.view.model.bind("change:collapsedView",a(function(a,b){this.ignore=b;if(b)return this.clearTimer()},this))}var b;return c.unread=[],c.prototype.createTimer=function(){return this.timer||(this.timer=setTimeout(this.markAsRead,g))},c.prototype.clearTimer=function(){return clearTimeout(this.timer),delete this.timer},c.prototype.markAsRead=function(){return this.view.model.markAsRead(),c.unread=d(c.unread).without(this),c.trigger("markAsRead",this.view.model)},b=e(window),c.init=function(){return b.bind("scroll resize",this.checkForVisibleEntries),this.checkForVisibleEntries()},c.checkForVisibleEntries=d.throttle(a(function(){var a,c,d,e,f,g,h,i;f=b.scrollTop(),a=f+b.height(),i=this.unread;for(g=0,h=i.length;g<h;g++){c=i[g];if(c.ignore)continue;e=c.view.$el.offset().top,d=e<a&&e+c.view.$el.height()>f,c[d?"createTimer":"clearTimer"]()}},c),f),c}.call(this),d.extend(h,b.Events)})}).call(this)