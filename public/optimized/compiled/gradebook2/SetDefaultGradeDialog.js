(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["i18n!gradebook2","jquery","jst/SetDefaultGradeDialog","use!underscore","jquery.disableWhileLoading","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","vendor/jquery.ba-tinypubsub","compiled/jquery/fixDialogButtons","jst/_grading_box"],function(b,c,d,e){var f;return f=function(){function f(b,c){this.assignment=b,this.gradebook=c,this.initDialog=a(this.initDialog,this),this.initDialog()}return f.prototype.initDialog=function(){var f;return f={assignment:this.assignment,showPointsPossible:this.assignment.points_possible||this.assignment.points_possible==="0",url:"/courses/"+this.gradebook.options.context_id+"/gradebook/update_submission"},f["assignment_grading_type_is_"+this.assignment.grading_type]=!0,this.$dialog=c(d(f)),this.$dialog.dialog({resizable:!1,width:350,open:a(function(){return this.$dialog.find(".grading_box").focus()},this),close:a(function(){return this.$dialog.remove()},this)}).fixDialogButtons(),this.$dialog.formSubmit({disableWhileLoading:!0,processData:a(function(c){var d,f,g,h,i,j,k,l;j=0,f=a(function(a){return a["assignment_"+this.assignment.id].score==null},this),d=c.overwrite_existing_grades,h=a(function(a){return this.gradebook.sectionToShow?e.include(a.sections,this.gradebook.sectionToShow):!0},this),k=a(function(a,b){return j+=1,c["submissions[submission_"+a+"][assignment_id]"]=this.assignment.id,c["submissions[submission_"+a+"][user_id]"]=b.id,c["submissions[submission_"+a+"][grade]"]=c.default_grade},this),l=this.gradebook.students;for(g in l)i=l[g],(f(i)||d)&&h(i)&&k(g,i);return j===0?(alert(b.t("alerts.none_to_update","None to Update")),!1):c},this),success:a(function(a){var d,e;return e=function(){var b,c,e;e=[];for(b=0,c=a.length;b<c;b++)d=a[b],e.push(d.submission);return e}(),c.publish("submissions_updated",[e]),alert(b.t("alerts.scores_updated",{one:"1 Student score updated",other:"%{count} Student scores updated"},{count:a.length})),this.$dialog.remove()},this)})},f}()})}).call(this)