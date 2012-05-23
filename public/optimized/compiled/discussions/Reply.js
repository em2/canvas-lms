(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["compiled/backbone-ext/Backbone","use!underscore","i18n!discussions.reply","jquery","compiled/discussions/Entry","str/htmlEscape","jst/discussions/_reply_attachment","tinymce.editor_box"],function(b,c,d,e,f,g,h){var i;return i=function(){function b(b,c){this.view=b,this.options=c!=null?c:{},this.onPostReplyError=a(this.onPostReplyError,this),this.onPostReplySuccess=a(this.onPostReplySuccess,this),this.submit=a(this.submit,this),this.hide=a(this.hide,this),this.el=this.view.$(".discussion-reply-label:first"),this.showWhileEditing=this.el.next(),this.textarea=this.showWhileEditing.find(".reply-textarea"),this.form=this.el.closest("form").submit(a(function(a){return a.preventDefault(),this.submit()},this)),this.form.find(".cancel_button").click(this.hide),this.editing=!1}return b.prototype.toggle=function(){return this.editing?this.hide():this.edit()},b.prototype.edit=function(){return this.form.addClass("replying"),this.textarea.editorBox(),this.el.hide(),setTimeout(a(function(){return this.textarea.editorBox("focus")},this)),this.editing=!0,this.trigger("edit",this)},b.prototype.hide=function(){return this.content=this.textarea._justGetCode(),this.textarea._removeEditor(),this.form.removeClass("replying"),this.textarea.val(this.content),this.el.show(),this.editing=!1,this.trigger("hide",this)},b.prototype.submit=function(){var a;return this.hide(),this.textarea._setContentCode(""),this.view.model.set("notification",d.t("saving_reply","Saving reply...")),a=new f(this.getModelAttributes()),a.save(null,{success:this.onPostReplySuccess,error:this.onPostReplyError,multipart:a.get("attachment")}),this.hide(),this.removeAttachments(),this.el.hide()},b.prototype.getModelAttributes=function(){var a;return a=(new Date).getTime(),{summary:e("<div/>").html(this.content).text(),message:this.content,parent_cid:this.options.topLevel?null:this.view.model.cid,parent_id:this.options.topLevel?null:this.view.model.get("id"),user_id:ENV.current_user_id,created_at:a,updated_at:a,collapsedView:!1,attachment:this.form.find("input[type=file]")[0]}},b.prototype.onPostReplySuccess=function(a){var b,c;return(typeof (c=this.options).added=="function"?!c.added():!void 0)&&this.view.collection.add(a),this.view.model.get("allowsSideComments")?b="":b=d.t("reply_saved","Reply saved, *go to your reply*",{wrapper:"<a href='#"+a.cid+"' data-event='goToReply'>$1</a>"}),this.view.model.set("notification",b),this.el.show()},b.prototype.onPostReplyError=function(a){return this.view.model.set("notification",d.t("error_saving_reply","An error occured, please post your reply again later")),this.textarea.val(a.get("message")),this.edit()},b.prototype.addAttachment=function(a){return this.form.find("ul.discussion-reply-attachments").append(h()),this.form.find("a.discussion-reply-add-attachment").hide()},b.prototype.removeAttachment=function(a){return a.closest("ul.discussion-reply-attachments li").remove(),this.form.find("a.discussion-reply-add-attachment").show()},b.prototype.removeAttachments=function(){return this.form.find("ul.discussion-reply-attachments").empty()},b}(),c.extend(i.prototype,b.Events),i})}).call(this)