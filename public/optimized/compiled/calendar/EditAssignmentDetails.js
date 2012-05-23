(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","compiled/calendar/commonEventFactory","jst/calendar/editAssignment","jst/calendar/genericSelect","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_misc_helpers"],function(b,c,d,e){var f;return f=function(){function f(c,e,f,g){this.event=e,this.contextChangeCB=f,this.closeCB=g,this.formSubmit=a(this.formSubmit,this),this.setupTimeAndDatePickers=a(this.setupTimeAndDatePickers,this),this.contextChange=a(this.contextChange,this),this.setContext=a(this.setContext,this),this.moreOptionsClick=a(this.moreOptionsClick,this),this.activate=a(this.activate,this),this.currentContextInfo=null,this.form=b(d({title:this.event.title,contexts:this.event.possibleContexts()})),b(c).append(this.form),this.setupTimeAndDatePickers(),this.form.submit(this.formSubmit),this.form.find(".more_options_link").click(this.moreOptionsClick),this.form.find("select.context_id").change(this.contextChange),this.form.find("select.context_id").triggerHandler("change",!1),this.event.isNewEvent()||(this.form.find(".context_select").hide(),this.form.attr("method","PUT"),this.form.attr("action",b.replaceTags(this.event.contextInfo.assignment_url,"id",this.event.object.id)))}return f.prototype.contextInfoForCode=function(a){var b,c,d,e;e=this.event.possibleContexts();for(c=0,d=e.length;c<d;c++){b=e[c];if(b.asset_string===a)return b}return null},f.prototype.activate=function(){var a;this.form.find("select.context_id").change();if((a=this.event.assignment)!=null?a.assignment_group_id:void 0)return this.form.find(".assignment_group_select .assignment_group").val(this.event.assignment.assignment_group_id)},f.prototype.moreOptionsClick=function(a){var c,d,e;return a.preventDefault(),e=b(a.target).attr("href").split("#"),c=this.form.getFormData({object_name:"assignment"}),d={},c.title&&(d.title=c.title),c.due_at&&(d.due_at=c.due_at),c.assignment_group_id&&(d.assignment_group_id=c.assignment_group_id),d.return_to=window.location.href,e[0]+="?"+b.param(d),window.location.href=e.join("#")},f.prototype.setContext=function(a){return this.form.find("select.context_id").val(a).triggerHandler("change",!1)},f.prototype.contextChange=function(a,c){var d,f,g;if(this.ignoreContextChange)return;f=b(a.target).val(),this.currentContextInfo=this.contextInfoForCode(f),this.event.contextInfo=this.currentContextInfo;if(this.currentContextInfo===null)return;return c!==!1&&this.contextChangeCB(f),d={cssClass:"assignment_group",name:"assignment[assignment_group_id]",collection:this.currentContextInfo.assignment_groups},this.form.find(".assignment_group_select").html(e(d)),this.form.attr("action",this.currentContextInfo.create_assignment_url),g=this.event.assignment?""+this.event.assignment.html_url+"/edit":this.currentContextInfo.new_assignment_url,this.form.find(".more_options_link").attr("href",g)},f.prototype.setupTimeAndDatePickers=function(){var a,b;this.form.find(".datetime_field").datetime_field(),b=this.event.startDate(),a=this.event.endDate();if(this.event.allDay)return this.form.find(".datetime_field").val(b.toString("MMM d, yyyy")).change();if(b)return this.form.find(".datetime_field").val(b.toString("MMM d, yyyy h:mmtt")).change()},f.prototype.formSubmit=function(a){var d,e,f,g,h;return a.preventDefault(),e=this.form.getFormData()["assignment[due_at]"],e===""?d=null:d=this.form.find("#assignment_due_at").data("date"),h={"assignment[name]":this.form.find("#assignment_title").val(),"assignment[due_at]":d?b.dateToISO8601UTC(b.unfudgeDateForProfileTimezone(d)):"","assignment[assignment_group_id]":this.form.find(".assignment_group").val()},this.event.isNewEvent()?(g={assignment:{title:h["assignment[name]"],due_at:d?b.dateToISO8601UTC(d):null,context_code:this.form.find(".context_id").val()}},f=c(g,this.event.possibleContexts()),f.save(h)):(this.event.title=h["assignment[name]"],this.event.start=d,this.event.save(h)),this.closeCB()},f}()})}).call(this)