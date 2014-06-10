(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","compiled/calendar/commonEventFactory","compiled/calendar/TimeBlockList","jst/calendar/editCalendarEvent","jst/calendar/genericSelect","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_misc_helpers","vendor/date"],function(b,c,d,e,f){var g;return g=function(){function d(c,d,f,g){this.event=d,this.contextChangeCB=f,this.closeCB=g,this.formSubmit=a(this.formSubmit,this),this.setupTimeAndDatePickers=a(this.setupTimeAndDatePickers,this),this.contextChange=a(this.contextChange,this),this.setContext=a(this.setContext,this),this.moreOptionsClick=a(this.moreOptionsClick,this),this.activate=a(this.activate,this),this.currentContextInfo=null,this.form=b(e({title:this.event.title,contexts:this.event.possibleContexts(),lockedTitle:this.event.lockedTitle})),b(c).append(this.form),this.setupTimeAndDatePickers(),this.form.submit(this.formSubmit),this.form.find(".more_options_link").click(this.moreOptionsClick),this.form.find("select.context_id").change(this.contextChange),this.form.find("select.context_id").triggerHandler("change",!1),this.event.isNewEvent()||this.form.find(".context_select").hide()}return d.prototype.contextInfoForCode=function(a){var b,c,d,e;e=this.event.possibleContexts();for(c=0,d=e.length;c<d;c++){b=e[c];if(b.asset_string===a)return b}return null},d.prototype.activate=function(){return this.form.find("select.context_id").change()},d.prototype.moreOptionsClick=function(a){var c,d,e;if(this.event.object.parent_event_id)return;return a.preventDefault(),e=b(a.target).attr("href").split("#"),c=b("#edit_calendar_event_form").getFormData({object_name:"calendar_event"}),d={},c.title&&(d.title=c.title),c.date&&(d.start_at=""+c.date+" "+(c.start_time||""),d.end_at=""+c.date+" "+(c.end_time||"")),d.return_to=window.location.href,e[0]+="?"+b.param(d),window.location.href=e.join("#")},d.prototype.setContext=function(a){return this.form.find("select.context_id").val(a).triggerHandler("change",!1)},d.prototype.contextChange=function(a,c){var d,e;d=b(a.target).val(),this.currentContextInfo=this.contextInfoForCode(d),this.event.contextInfo=this.currentContextInfo;if(this.currentContextInfo===null)return;return c!==!1&&this.contextChangeCB(d),e=null,this.event.isNewEvent()?e=this.currentContextInfo.new_calendar_event_url:e=this.event.fullDetailsURL()+"/edit",this.form.find(".more_options_link").attr("href",e)},d.prototype.setupTimeAndDatePickers=function(){var c,d;this.form.find(".date_field").date_field(),this.form.find(".time_field").time_field().blur(a(function(a){var c,d,e,f;f=this.form.find(".time_field.start_time").next(".datetime_suggest").text(),this.form.find(".time_field.start_time").next(".datetime_suggest").hasClass("invalid_datetime")&&(f=null),f==null&&(f=this.form.find(".time_field.start_time").val()),d=this.form.find(".time_field.end_time").next(".datetime_suggest").text(),this.form.find(".time_field.end_time").next(".datetime_suggest").hasClass("invalid_datetime")&&(d=null),d==null&&(d=this.form.find(".time_field.end_time").val()),e=Date.parse(f),c=Date.parse(d),e=e||c,c=c||e,b(a.target).hasClass("end_time")?e>c&&(e=c):c<e&&(c=e),e&&this.form.find(".time_field.start_time").val(e.toString("h:mmtt").toLowerCase());if(c)return this.form.find(".time_field.end_time").val(c.toString("h:mmtt").toLowerCase())},this)),d=this.event.startDate(),c=this.event.endDate(),this.event.allDay||(d&&this.form.find(".time_field.start_time").val(d.toString("h:mmtt")).change().blur(),c&&this.form.find(".time_field.end_time").val(c.toString("h:mmtt")).change().blur());if(d)return this.form.find(".date_field").val(d.toString("MMM d, yyyy")).change()},d.prototype.formSubmit=function(a){var d,e,f,g,h,i,j,k;return a.preventDefault(),d=this.form.getFormData({object_name:"calendar_event"}),d.date?(i=Date.parse(""+d.date+" "+d.start_time),(j=d.end_time)==null&&(d.end_time=d.start_time),e=Date.parse(""+d.date+" "+d.end_time)):(i=null,e=null),h={"calendar_event[title]":(k=d.title)!=null?k:this.event.title,"calendar_event[start_at]":i?b.dateToISO8601UTC(b.unfudgeDateForProfileTimezone(i)):"","calendar_event[end_at]":e?b.dateToISO8601UTC(b.unfudgeDateForProfileTimezone(e)):""},this.event.isNewEvent()?(h["calendar_event[context_code]"]=d.context_code,g={calendar_event:{title:h["calendar_event[title]"],start_at:i?b.dateToISO8601UTC(i):null,end_at:e?b.dateToISO8601UTC(e):null,context_code:this.form.find(".context_id").val()}},f=c(g,this.event.possibleContexts()),f.save(h)):(this.event.title=h["calendar_event[title]"],this.event.start=i,this.event.end=e,this.event.save(h)),this.closeCB()},d}()})}).call(this)