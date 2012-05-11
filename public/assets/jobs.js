(function(){var f=function(e,h){return function(){return e.apply(h,arguments)}},q=Object.prototype.hasOwnProperty,m=function(e,h){function j(){this.constructor=e}for(var k in h)if(q.call(h,k))e[k]=h[k];j.prototype=h.prototype;e.prototype=new j;e.__super__=h.prototype;return e};I18n.scoped("jobs",function(e){var h,j,k,p;h=function(){function b(a,c,d){this.options=a;this.type_name=c;this.grid_name=d;this.change_flavor=f(this.change_flavor,this);this.refresh=f(this.refresh,this);this.setTimer=f(this.setTimer,
this);this.data=this.options.data;this.$element=$(this.grid_name);this.options.refresh_rate&&this.setTimer();this.query=""}b.prototype.setTimer=function(){return setTimeout(f(function(){return this.refresh(this.setTimer)},this),this.options.refresh_rate)};b.prototype.refresh=function(a){return this.$element.queue(f(function(){return $.ajaxJSON(this.options.url,"GET",{flavor:this.options.flavor,q:this.query},f(function(c){var d,g,i,l;this.data.length=0;this.loading={};l=c[this.type_name];g=0;for(i=
l.length;g<i;g++){d=l[g];this.data.push(d)}if(c.total&&c.total>this.data.length){d=g=this.data.length;for(c=c.total;g<=c?d<c:d>c;g<=c?d++:d--)this.data.push({})}this.grid.removeAllRows();this.grid.updateRowCount();this.grid.render();typeof a==="function"&&a();typeof this.updated==="function"&&this.updated();return this.$element.dequeue()},this))},this))};b.prototype.change_flavor=function(a){this.options.flavor=a;this.grid.setSelectedRows([]);return this.refresh()};b.prototype.grid_options=function(){return{rowHeight:20}};
b.prototype.init=function(){this.columns=this.build_columns();this.loading={};this.grid=new Slick.Grid(this.grid_name,this.data,this.columns,this.grid_options());return this};return b}();j=function(){function b(a,c,d){if(c==null)c="jobs";if(d==null)d="#jobs-grid";this.id_formatter=f(this.id_formatter,this);this.load=f(this.load,this);this.attempts_formatter=f(this.attempts_formatter,this);if(a.max_attempts)b.max_attempts=a.max_attempts;b.__super__.constructor.call(this,a,c,d)}m(b,h);b.prototype.search=
function(a){this.query=a;return this.refresh()};b.prototype.attempts_formatter=function(a,c,d){if(!this.data[a].id)return"";c=this.data[a].max_attempts||b.max_attempts;if(d===0)a="";else if(d<c)a="has-failed-attempts";else if(d===this.options.on_hold_attempt_count){a="on-hold";d="hold"}else a="has-failed-max-attempts";return"<span class='"+a+"'>"+d+(d==="hold"?"":"/ "+c)+"</span>"};b.prototype.load=function(a){return this.$element.queue(f(function(){a-=a%this.options.limit;if(this.loading[a])this.$element.dequeue();
else{this.loading[a]=true;return $.ajaxJSON(this.options.url,"GET",{flavor:this.options.flavor,q:this.query,offset:a},f(function(c){[].splice.apply(this.data,[a,a+c.jobs.length-a].concat(c.jobs));this.grid.removeAllRows();this.grid.render();return this.$element.dequeue()},this))}},this))};b.prototype.id_formatter=function(a){if(this.data[a].id)return this.data[a].id;else{this.load(a);return"<span class='unloaded-id'>-</span>"}};b.prototype.build_columns=function(){return[{id:"id",name:e.t("columns.id",
"id"),field:"id",width:75,formatter:this.id_formatter},{id:"tag",name:e.t("columns.tag","tag"),field:"tag",width:200},{id:"attempts",name:e.t("columns.attempt","attempt"),field:"attempts",width:60,formatter:this.attempts_formatter},{id:"priority",name:e.t("columns.priority","priority"),field:"priority",width:70},{id:"strand",name:e.t("columns.strand","strand"),field:"strand",width:100},{id:"run_at",name:e.t("columns.run_at","run at"),field:"run_at",width:165}]};b.prototype.init=function(){b.__super__.init.call(this);
this.grid.onSelectedRowsChanged=f(function(){var a;a=this.data[this.grid.getSelectedRows()[0]]||{};$("#show-job .show-field").each(f(function(c,d){var g;g=d.id.replace("job-","");return $(d).text(a[g]||"")},this));return $("#job-id-link").attr("href","/jobs?id="+a.id+"&flavor="+this.options.flavor)},this);if(this.data.length===1&&this.type_name==="jobs"){this.grid.setSelectedRows([0]);this.grid.onSelectedRowsChanged()}return this};b.prototype.selectAll=function(){var a;this.grid.setSelectedRows(function(){a=
[];for(var c=0,d=this.data.length;0<=d?c<d:c>d;0<=d?c++:c--)a.push(c);return a}.apply(this));return this.grid.onSelectedRowsChanged()};b.prototype.onSelected=function(a){var c,d,g;d={flavor:this.options.flavor,q:this.query,update_action:a};if(this.grid.getSelectedRows().length<1)alert("No jobs are selected");else{if((c=this.grid.getSelectedRows().length===this.data.length)&&a==="destroy")if(!confirm(e.t("confirm.delete_all","Are you sure you want to delete *all* jobs of this type and matching this query?")))return;
if(!c)d.job_ids=function(){var i,l,n,o;n=this.grid.getSelectedRows();o=[];i=0;for(l=n.length;i<l;i++){g=n[i];o.push(this.data[g].id)}return o}.call(this);$.ajaxJSON(this.options.batch_update_url,"POST",d,this.refresh);return this.grid.setSelectedRows([])}};b.prototype.updated=function(){return $("#jobs-total").text(this.data.length)};return b}();p=function(){function b(a){b.__super__.constructor.call(this,a,"running","#running-grid")}m(b,j);b.prototype.build_columns=function(){var a;a=[{id:"worker",
name:e.t("columns.worker","worker"),field:"locked_by",width:175}].concat(b.__super__.build_columns.call(this));a.pop();return a};b.prototype.updated=function(){};return b}();k=function(){function b(a){b.__super__.constructor.call(this,a,"tags","#tags-grid")}m(b,h);b.prototype.build_columns=function(){return[{id:"tag",name:e.t("columns.tag","tag"),field:"tag",width:200},{id:"count",name:e.t("columns.count","count"),field:"count",width:50}]};b.prototype.grid_options=function(){return $.extend(b.__super__.grid_options.call(this),
{enableCellNavigation:false})};return b}();$.extend(window,{Jobs:j,Workers:p,Tags:k});return $(document).ready(function(){var b;$("#tags-flavor").change(function(){return window.tags.change_flavor($(this).val())});$("#jobs-flavor").change(function(){return window.jobs.change_flavor($(this).val())});$("#jobs-refresh").click(function(){return window.jobs.refresh()});b=$("#jobs-search")[0].onsearch===void 0?"change":"search";$("#jobs-search").bind(b,function(){return window.jobs.search($(this).val())});
$("#select-all-jobs").click(function(){return window.jobs.selectAll()});$("#hold-jobs").click(function(){return window.jobs.onSelected("hold")});$("#un-hold-jobs").click(function(){return window.jobs.onSelected("unhold")});$("#delete-jobs").click(function(){return window.jobs.onSelected("destroy")});$("#job-handler-show").click(function(){$("#job-handler-wrapper").clone().dialog({title:e.t("titles.job_handler","Job Handler"),width:900,height:700,modal:true});return false});return $("#job-last_error-show").click(function(){$("#job-last_error-wrapper").clone().dialog({title:e.t("titles.last_error",
"Last Error"),width:900,height:700,modal:true});return false})})})}).call(this);