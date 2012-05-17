(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b=Object.prototype.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};define(["i18n!calendar","compiled/calendar/CommonEvent","jquery.instructure_date_and_time","jquery.instructure_misc_helpers"],function(b,d){var e,f;return f=b.t("prompts.delete_assignment","Are you sure you want to delete this assignment?"),e=function(){function b(c,d){this.saveDates=a(this.saveDates,this),this.copyDataFromObject=a(this.copyDataFromObject,this),b.__super__.constructor.apply(this,arguments),this.eventType="assignment",this.deleteConfirmation=f,this.deleteURL=d.assignment_url,this.addClass("assignment"),this.copyDataFromObject(c)}return c(b,d),b.prototype.copyDataFromObject=function(a){return a.assignment&&(a=a.assignment),this.object=this.assignment=a,this.id="assignment_"+a.id,this.title=a.title||a.name||"Untitled",this.addClass("group_"+this.contextCode()),this.start=a.due_at?$.parseFromISO(a.due_at,"due_date").time:null,this.isDueAtMidnight()&&(this.midnightFudged=!0,this.start.setMinutes(30)),this.description=a.description},b.prototype.fullDetailsURL=function(){return $.replaceTags(this.contextInfo.assignment_url,"id",this.assignment.id)},b.prototype.startDate=function(){return this.assignment.due_at?$.parseFromISO(this.assignment.due_at,"due_date").time:null},b.prototype.displayTimeString=function(){var a,b;return this.assignment.due_at?(a=$.parseFromISO(this.assignment.due_at,"due_date"),b=""+$.dateString(a.date)+" at "+a.time_string,"Due: <time datetime='"+a.time.toISOString()+"'>"+b+"</time>"):"No Date"},b.prototype.saveDates=function(a,b){return this.save({"assignment[due_at]":$.dateToISO8601UTC($.unfudgeDateForProfileTimezone(this.start))},a,b)},b.prototype.methodAndURLForSave=function(){var a,b;return this.isNewEvent()?(a="POST",b=this.contextInfo.create_assignment_url):(a="PUT",b=$.replaceTags(this.contextInfo.assignment_url,"id",this.assignment.id)),[a,b]},b.prototype.isDueAtMidnight=function(){return this.midnightFudged||this.start&&this.start.getHours()===23&&this.start.getMinutes()===59},b}()})}).call(this)