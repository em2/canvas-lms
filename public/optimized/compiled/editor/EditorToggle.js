(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["i18n!editor","jquery","tinymce.editor_box"],function(b,c){var d;return d=function(){function d(a,b){this.el=a,this.options=c.extend({},this.options,b),this.textArea=this.createTextArea(),this.done=this.createDone(),this.content=this.getContent(),this.editing=!1}return d.prototype.options={doneText:b.t("done_as_in_finished","Done")},d.prototype.toggle=function(){return this.editing?this.display():this.edit()},d.prototype.edit=function(){return this.textArea.val(this.getContent()),this.textArea.insertBefore(this.el),this.el.detach(),this.done.insertAfter(this.textArea),this.textArea.editorBox(),this.editing=!0},d.prototype.display=function(){return this.content=this.textArea._justGetCode(),this.textArea.val(this.content),this.el.html(this.content),this.el.insertBefore(this.textArea),this.textArea._removeEditor(),this.textArea.detach(),this.done.detach(),this.textArea.attr("id",""),this.editing=!1},d.prototype.getContent=function(){return c.trim(this.el.html())},d.prototype.createTextArea=function(){return c("<textarea/>").css("width","100%").addClass("editor-toggle")},d.prototype.createDone=function(){return c("<a/>").html(this.options.doneText).addClass("button edit-html-done edit_html_done").click(a(function(){return this.display()},this))},d}()})}).call(this)