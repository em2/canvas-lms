(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define([],function(){var b,c,d;return d=0,c=[],b=function(){function b(b,c){this.content=c,this.position=a(this.position,this),this.outsideClickHandler=a(this.outsideClickHandler,this),this.trigger=$(b.currentTarget),this.el=$(this.content).addClass("carat-bottom").attr("role","dialog").data("popover",this).keyup(a(function(a){if(a.keyCode===$.ui.keyCode.ESCAPE)return this.hide()},this)),this.el.delegate(".popover_close","click",a(function(a){return a.preventDefault(),this.hide()},this)),this.show(b)}return b.prototype.show=function(a){var b,e,f,g,h;while(h=c.pop())h.hide();return c.push(this),g="popover-"+d++,this.trigger.attr({"aria-haspopup":!0,"aria-owns":g}),this.el.attr({id:g,"aria-hidden":!1,"aria-expanded":!0}).appendTo(document.body).show(),this.el.find(":tabbable").not(".popover_close").first().focus(1),this.position(),this.el.find(".ui-menu-carat").remove(),f=this.trigger.offset().left-this.el.offset().left,b=a.pageX-this.trigger.offset().left,e=Math.min(Math.max(20,b),this.trigger.width()-20)+f,$('<span class="ui-menu-carat"><span /></span>').css("left",e).prependTo(this.el),this.positionInterval=setInterval(this.position,200),$(window).click(this.outsideClickHandler)},b.prototype.hide=function(){var a,b,d;for(a=0,d=c.length;a<d;a++)b=c[a],this===b&&c.splice(a,1);return this.el.detach(),clearInterval(this.positionInterval),$(window).unbind("click",this.outsideClickHandler)},b.prototype.ignoreOutsideClickSelector=".ui-dialog",b.prototype.outsideClickHandler=function(a){if(!$(a.target).closest(this.el.add(this.trigger).add(this.ignoreOutsideClickSelector)).length)return this.hide()},b.prototype.position=function(){return this.el.position({my:"center bottom",at:"center top",of:this.trigger,offset:"0 -10px",within:"#main",collision:"flipfit flipfit"})},b}()})}).call(this)