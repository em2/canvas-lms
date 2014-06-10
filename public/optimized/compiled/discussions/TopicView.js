(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b=Object.prototype.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};define(["i18n!discussions","compiled/backbone-ext/Backbone","compiled/discussions/Topic","compiled/discussions/EntriesView","compiled/discussions/EntryView","jst/discussions/_reply_form","compiled/discussions/Reply","compiled/widget/assignmentRubricDialog","compiled/util/wikiSidebarWithMultipleEditors","jquery.instructure_misc_helpers"],function(b,d,e,f,g,h,i,j){var k;return k=function(){function k(){this.onUnreadChange=a(this.onUnreadChange,this),this.initEntries=a(this.initEntries,this),k.__super__.constructor.apply(this,arguments)}return c(k,d.View),k.prototype.events={"click #discussion_topic .discussion-reply-form [data-event]":"handleEvent","change .view_switcher":"switchView","click .add_root_reply":"addRootReply"},k.prototype.initialize=function(){return this.$el=$("#main"),this.model.set("id",ENV.DISCUSSION.TOPIC.ID),this.model.cid="main",this.model.set("canAttach",ENV.DISCUSSION.PERMISSIONS.CAN_ATTACH),this.render(),ENV.DISCUSSION.INITIAL_POST_REQUIRED||this.initEntries(),this.initViewSwitcher(),$(document.body).is(".with-right-side")&&$.scrollSidebar(),j.initTriggers(),this.disableNextUnread(),this.$el.toggleClass("side_comment_discussion",!ENV.DISCUSSION.THREADED)},k.prototype.cacheElements=function(){return this.$addRootReply=this.$(".add_root_reply")},k.prototype.initEntries=function(){return this.discussion?!1:(this.discussion=new f({model:new e}),this.collection=this.discussion.collection,this.discussion.model.bind("change:unread_entries",this.onUnreadChange),this.discussion.model.bind("fetchSuccess",a(function(){var a;return a=this.discussion.model.get("unread_entries"),this.setNextUnread(a),this.cacheElements()},this)),window.DISCUSSION=this.discussion,!0)},k.prototype.onUnreadChange=function(a,c){return this.model.set("unreadCount",c.length),this.model.set("unreadText",b.t("unread_count_tooltip",{zero:"No unread replies",one:"1 unread reply",other:"%{count} unread replies"},{count:c.length})),this.setNextUnread(c)},k.prototype.setNextUnread=function(a){var b,c,d;if(a.length===0){this.disableNextUnread();return}return d=this.discussion.$(".can_be_marked_as_read.unread:first"),c=d.parent(),b=c.attr("id"),this.$("#jump_to_next_unread").removeClass("disabled").attr("href","#"+b)},k.prototype.disableNextUnread=function(){return this.$("#jump_to_next_unread").addClass("disabled").removeAttr("href")},k.prototype.addReply=function(b){return b.preventDefault(),this.reply==null&&(this.reply=new i(this,{topLevel:!0,added:this.initEntries}),this.reply.on("edit",a(function(){var a;return(a=this.$addRootReply)!=null?a.hide():void 0},this)),this.reply.on("hide",a(function(){var a;return(a=this.$addRootReply)!=null?a.show():void 0},this))),this.model.set("notification",""),this.reply.edit()},k.prototype.addReplyAttachment=g.prototype.addReplyAttachment,k.prototype.removeReplyAttachment=g.prototype.removeReplyAttachment,k.prototype.handleEvent=function(a){var b,c;return b=$(a.currentTarget),c=b.data("event"),typeof this[c]=="function"?this[c](a,b):void 0},k.prototype.render=function(){var a;return ENV.DISCUSSION.PERMISSIONS.CAN_REPLY&&(a=h(this.model.toJSON()),this.$(".entry_content:first").append(a)),k.__super__.render.apply(this,arguments)},k.prototype.initViewSwitcher=function(){return this.$(".view_switcher").show().selectmenu({icons:[{find:".collapsed-view"},{find:".unread-view"},{find:".expanded-view"}]})},k.prototype.switchView=function(a){var b,c;return b=$(a.currentTarget),c=b.val(),this[c+"View"]()},k.prototype.collapsedView=function(){var a,b,c,d;c=g.instances,d=[];for(a in c)b=c[a],d.push(b.model.set("collapsedView",!0));return d},k.prototype.expandedView=function(){var a,b,c,d;c=g.instances,d=[];for(a in c)b=c[a],d.push(b.model.set("collapsedView",!1));return d},k.prototype.unreadView=function(){var a,b,c,d,e;d=g.instances,e=[];for(b in d)c=d[b],a=c.model.get("read_state")==="read",e.push(c.model.set("collapsedView",a));return e},k.prototype.addRootReply=function(a){var b,c;return b=this.$(a.currentTarget),c=$("#discussion_topic .discussion-reply-form"),this.addReply(a),$("html, body").animate({scrollTop:c.offset().top-100})},k}()})}).call(this)