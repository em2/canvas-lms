(function(){define(["jquery","jquery.ui.menu.inputmenu","vendor/jquery.ui.popup-1.9","vendor/jquery.ui.button-1.9"],function(a,b,c,d){return a.fn.kyleMenu=function(b){return this.each(function(){var c,d,e,f;return f=a.extend(!0,{},a.fn.kyleMenu.defaults,b),d=a(this),f.noButton||(d.button(f.buttonOpts),d.bind("mouseleave.button",function(){if(c.is(".ui-state-open"))return d.addClass("ui-state-active")})),c=d.next().menu(f.menuOpts).popup(f.popupOpts).addClass("ui-kyle-menu use-css-transitions-for-show-hide"),e=f.appendMenuTo,e&&c.appendTo(e),d.data("kyleMenu",c),c.bind("menuselect",function(){return a(this).popup("close").removeClass("ui-state-open")})})},a.fn.kyleMenu.defaults={popupOpts:{position:{my:"center top",at:"center bottom",offset:"0 10px",within:"#main",collision:"fit"},open:function(b){var c,d,e,f,g;return a(this).find(".ui-menu-carat").remove(),c=a(this).popup("option","trigger"),c.addClass("ui-state-active"),g=c.outerWidth(),f=c.offset().left-a(this).offset().left,d=b.pageX-c.offset().left,e=Math.min(Math.max(6,d),g-6)+f,a('<span class="ui-menu-carat"><span /></span>').css("left",e).prependTo(this),a(this).css("-webkit-transform-origin-x",e+"px").addClass("ui-state-open")},close:function(){return a(this).popup("option","trigger").removeClass("ui-state-active"),a(this).removeClass("ui-state-open")}},buttonOpts:{icons:{primary:"ui-icon-home",secondary:"ui-icon-droparrow"}}},a(".al-trigger").live("click",function(b){var c,d,e;c=a(this);if(!c.is(".ui-button"))return b.preventDefault(),d={buttonOpts:{icons:{primary:null,secondary:null}}},e=a.extend(d,c.data("kyleMenuOptions")),c.kyleMenu(e),c.data("kyleMenu").popup("open")})})}).call(this)