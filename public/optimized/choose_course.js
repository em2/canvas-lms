define(["jquery","i18n!content_imports","use!underscore","compiled/xhr/RemoteSelect","jqueryui/autocomplete"],function(a,b,c,d){var e=a("<iframe id='copy_course_target' name='copy_course_target' src='about:blank'/>"),f=a("#copy_from_course"),g,h=parseInt(window.location.pathname.split("/")[2]);f.length&&(g=new d(a("#copy_from_course"),{formatter:c.bind(function(a){a=a.sort(function(a,b){return(new Date(b.enrollment_start)).getTime()-(new Date(a.enrollment_start)).getTime()});var b,d=c.groupBy(a,function(a){return a.term+" ("+a.account_name+")"}),e=c.chain(d).keys().reduce(function(a,b){var c=b.replace(/\([^\)]+\)$/,"").trim();return a[c]=a[c]||{count:0,termNames:[]},a[c].count=a[c].count+1,a[c].termNames.push(b),a},{}).value();return b=c.reduce(d,function(a,b,d){return a[d]=c.chain(b).reject(function(a){return a.id==h}).map(function(a){return{label:a.label,value:a.id}}).sortBy(function(a){return a.label}).value(),a},{}),c.reduce(b,function(a,b,c){var d=c.replace(/\([^\)]+\)$/,"").trim(),f=e[d].count===1?d:c;return a[f]=b,a},{})},this),url:"/users/"+ENV.current_user_id+"/manageable_courses"}),g.currentRequest.success(function(b){b.length>=500&&a("#select-course-row").hide()})),a("#include_concluded_courses").change(function(b){var c=a(b.currentTarget);c.prop("checked")?g.makeRequest({"include[]":"concluded"}):g.makeRequest()}),a("#copy_from_course").change(function(){var b=a("#copy_from_course")[0],c=b.selectedIndex,d=b.options[c].innerHTML,e=b.options[c].value;e!="none"&&(a("#course_autocomplete_name_holder").show(),a("#course_autocomplete_name").text(d),a("#course_autocomplete_id").val(e),a("#course_autocomplete_id_lookup").val(""))}).change();if(a("#course_autocomplete_id_lookup:visible").length>0){var i={},j;a("#course_autocomplete_id_lookup").autocomplete({source:function(b,c){var d="/users/"+ENV.current_user_id+"/manageable_courses",e={term:b.term},f=a("#include_concluded_courses").prop("checked"),g=b.term;f&&(e["include[]"]="concluded",g+="|concluded");if(g in i){c(i[g]);return}j=a.getJSON(d,e,function(a,b,d){i[g]=a,j===d&&c(a)})},select:function(b,c){a("#course_autocomplete_name_holder").show(),a("#course_autocomplete_name").text(c.item.label),a("#course_autocomplete_id").val(c.item.id),a("#copy_from_course").val("none")}})}})