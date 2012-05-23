(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["i18n!assignment_muter","jquery","jst/mute_dialog","jquery.ajaxJSON","jquery.disableWhileLoading","jquery.instructure_jquery_patches","vendor/jquery.ba-tinypubsub"],function(b,c,d){var e;return e=function(){function e(b,d,e){this.$link=b,this.assignment=d,this.url=e,this.confirmUnmute=a(this.confirmUnmute,this),this.afterUpdate=a(this.afterUpdate,this),this.showDialog=a(this.showDialog,this),this.updateLink=a(this.updateLink,this),this.$link=c(this.$link),this.updateLink(),this.$link.click(a(function(a){return a.preventDefault(),this.assignment.muted?this.confirmUnmute():this.showDialog()},this))}return e.prototype.updateLink=function(){return this.$link.text(this.assignment.muted?b.t("unmute_assignment","Unmute Assignment"):b.t("mute_assignment","Mute Assignment"))},e.prototype.showDialog=function(){return this.$dialog=c(d()).dialog({buttons:[{text:b.t("mute_assignment","Mute Assignment"),"data-text-while-loading":b.t("muting_assignment","Muting Assignment..."),click:a(function(){return this.$dialog.disableWhileLoading(c.ajaxJSON(this.url,"put",{status:!0},this.afterUpdate))},this)}],close:a(function(){return this.$dialog.remove()},this),resizable:!1,width:400})},e.prototype.afterUpdate=function(a){return this.assignment.muted=a.assignment.muted,this.updateLink(),this.$dialog.dialog("close"),c.publish("assignment_muting_toggled",[this.assignment])},e.prototype.confirmUnmute=function(){return this.$dialog=c("<div />").text(b.t("unmute_dialog","This assignment is currently muted. That means students can't see their grades and feedback. Would you like to unmute now?")).dialog({buttons:[{text:b.t("unmute_button","Unmute Assignment"),"data-text-while-loading":b.t("unmuting_assignment","Unmuting Assignment..."),click:a(function(){return this.$dialog.disableWhileLoading(c.ajaxJSON(this.url,"put",{status:!1},this.afterUpdate))},this)}],close:a(function(){return this.$dialog.remove()},this),resizable:!1,title:b.t("unmute_assignment","Unmute Assignment"),width:400})},e}()})}).call(this)