(function(a){var b={SelectorCellFormatter:function(a,b,c,d,e){return e?a:""},PercentCompleteCellFormatter:function(a,b,c,d,e){return c==null||c===""?"-":c<50?"<span style='color:red;font-weight:bold;'>"+c+"%</span>":"<span style='color:green'>"+c+"%</span>"},GraphicalPercentCompleteCellFormatter:function(a,b,c,d,e){if(c==null||c==="")return"";var f;return c<30?f="red":c<70?f="silver":f="green","<span class='percent-complete-bar' style='background:"+f+";width:"+c+"%'></span>"},YesNoCellFormatter:function(a,b,c,d,e){return c?"Yes":"No"},BoolCellFormatter:function(a,b,c,d,e){return c?"<img src='../images/tick.png'>":""},TaskNameFormatter:function(a,b,c,d,e){var f="<span style='display:inline-block;height:1px;width:"+(2+15*e.indent)+"px'></span>";return f+" <img src='../images/expand.gif'>&nbsp;"+c},ResourcesFormatter:function(a,b,c,d,e){var f=e.resources;return!f||f.length==0?"":d.width<50?(f.length>1?"<center><img src='../images/user_identity_plus.gif' ":"<center><img src='../images/user_identity.gif' ")+" title='"+f.join(", ")+"'></center>":f.join(", ")},StarFormatter:function(a,b,c,d,e){return c?"<img src='../images/bullet_star.png' align='absmiddle'>":""},TextCellEditor:function(b){var c,d,e=this;this.init=function(){c=a("<INPUT type=text class='editor-text' />").appendTo(b.container).bind("keydown.nav",function(b){(b.keyCode===a.ui.keyCode.LEFT||b.keyCode===a.ui.keyCode.RIGHT)&&b.stopImmediatePropagation()}).focus().select()},this.destroy=function(){c.remove()},this.focus=function(){c.focus()},this.getValue=function(){return c.val()},this.setValue=function(a){c.val(a)},this.loadValue=function(a){d=a[b.column.field]||"",c.val(d),c[0].defaultValue=d,c.select()},this.serializeValue=function(){return c.val()},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return(c.val()!=""||d!=null)&&c.val()!=d},this.validate=function(){if(b.column.validator){var a=b.column.validator(c.val());if(!a.valid)return a}return{valid:!0,msg:null}},this.init()},IntegerCellEditor:function(b){var c,d,e=this;this.init=function(){c=a("<INPUT type=text class='editor-text' />"),c.bind("keydown.nav",function(b){(b.keyCode===a.ui.keyCode.LEFT||b.keyCode===a.ui.keyCode.RIGHT)&&b.stopImmediatePropagation()}),c.appendTo(b.container),c.focus().select()},this.destroy=function(){c.remove()},this.focus=function(){c.focus()},this.loadValue=function(a){d=a[b.column.field],c.val(d),c[0].defaultValue=d,c.select()},this.serializeValue=function(){return parseInt(c.val(),10)||0},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return(c.val()!=""||d!=null)&&c.val()!=d},this.validate=function(){return isNaN(c.val())?{valid:!1,msg:"Please enter a valid integer"}:{valid:!0,msg:null}},this.init()},DateCellEditor:function(b){var c,d,e=this,f=!1;this.init=function(){c=a("<INPUT type=text class='editor-text' />"),c.appendTo(b.container),c.focus().select(),c.datepicker({showOn:"button",buttonImageOnly:!0,buttonImage:"../images/calendar.gif",beforeShow:function(){f=!0},onClose:function(){f=!1}}),c.width(c.width()-18)},this.destroy=function(){a.datepicker.dpDiv.stop(!0,!0),c.datepicker("hide"),c.datepicker("destroy"),c.remove()},this.show=function(){f&&a.datepicker.dpDiv.stop(!0,!0).show()},this.hide=function(){f&&a.datepicker.dpDiv.stop(!0,!0).hide()},this.position=function(b){if(!f)return;a.datepicker.dpDiv.css("top",b.top+30).css("left",b.left)},this.focus=function(){c.focus()},this.loadValue=function(a){d=a[b.column.field],c.val(d),c[0].defaultValue=d,c.select()},this.serializeValue=function(){return c.val()},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return(c.val()!=""||d!=null)&&c.val()!=d},this.validate=function(){return{valid:!0,msg:null}},this.init()},YesNoSelectCellEditor:function(b){var c,d,e=this;this.init=function(){c=a("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>"),c.appendTo(b.container),c.focus()},this.destroy=function(){c.remove()},this.focus=function(){c.focus()},this.loadValue=function(a){c.val((d=a[b.column.field])?"yes":"no"),c.select()},this.serializeValue=function(){return c.val()=="yes"},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return c.val()!=d},this.validate=function(){return{valid:!0,msg:null}},this.init()},YesNoCheckboxCellEditor:function(b){var c,d,e=this;this.init=function(){c=a("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>"),c.appendTo(b.container),c.focus()},this.destroy=function(){c.remove()},this.focus=function(){c.focus()},this.loadValue=function(a){d=a[b.column.field],d?c.attr("checked","checked"):c.removeAttr("checked")},this.serializeValue=function(){return c.attr("checked")},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return c.attr("checked")!=d},this.validate=function(){return{valid:!0,msg:null}},this.init()},PercentCompleteCellEditor:function(b){var c,d,e,f=this;this.init=function(){c=a("<INPUT type=text class='editor-percentcomplete' />"),c.width(a(b.container).innerWidth()-25),c.appendTo(b.container),d=a("<div class='editor-percentcomplete-picker' />").appendTo(b.container),d.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>"),d.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>"),c.focus().select(),d.find(".editor-percentcomplete-slider").slider({orientation:"vertical",range:"min",value:e,slide:function(a,b){c.val(b.value)}}),d.find(".editor-percentcomplete-buttons button").bind("click",function(b){c.val(a(this).attr("val")),d.find(".editor-percentcomplete-slider").slider("value",a(this).attr("val"))})},this.destroy=function(){c.remove(),d.remove()},this.focus=function(){c.focus()},this.loadValue=function(a){c.val(e=a[b.column.field]),c.select()},this.serializeValue=function(){return parseInt(c.val(),10)||0},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return(c.val()!=""||e!=null)&&(parseInt(c.val(),10)||0)!=e},this.validate=function(){return isNaN(parseInt(c.val(),10))?{valid:!1,msg:"Please enter a valid positive number"}:{valid:!0,msg:null}},this.init()},StarCellEditor:function(b){function f(a){if(a.type=="keydown"&&a.which!=32)return;return c.css("opacity")=="1"?c.css("opacity",.5):c.css("opacity",1),a.preventDefault(),a.stopPropagation(),!1}var c,d,e=this;this.init=function(){c=a("<IMG src='../images/bullet_star.png' align=absmiddle tabIndex=0 title='Click or press Space to toggle' />").bind("click keydown",f).appendTo(b.container).focus()},this.destroy=function(){c.unbind("click keydown",f),c.remove()},this.focus=function(){c.focus()},this.loadValue=function(a){d=a[b.column.field],c.css("opacity",d?1:.2)},this.serializeValue=function(){return c.css("opacity")=="1"},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return d!=(c.css("opacity")=="1")},this.validate=function(){return{valid:!0,msg:null}},this.init()},LongTextCellEditor:function(b){var c,d,e,f=this;this.init=function(){var e=a("body");d=a("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>").appendTo(e),c=a("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>").appendTo(d),a("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>").appendTo(d),d.find("button:first").bind("click",this.save),d.find("button:last").bind("click",this.cancel),c.bind("keydown",this.handleKeyDown),f.position(b.position),c.focus().select()},this.handleKeyDown=function(b){b.which==a.ui.keyCode.ENTER&&b.ctrlKey?f.save():b.which==a.ui.keyCode.ESCAPE?(b.preventDefault(),f.cancel()):b.which==a.ui.keyCode.TAB&&b.shiftKey?(b.preventDefault(),grid.navigatePrev()):b.which==a.ui.keyCode.TAB&&(b.preventDefault(),grid.navigateNext())},this.save=function(){b.commitChanges()},this.cancel=function(){c.val(e),b.cancelChanges()},this.hide=function(){d.hide()},this.show=function(){d.show()},this.position=function(a){d.css("top",a.top-5).css("left",a.left-5)},this.destroy=function(){d.remove()},this.focus=function(){c.focus()},this.loadValue=function(a){c.val(e=a[b.column.field]),c.select()},this.serializeValue=function(){return c.val()},this.applyValue=function(a,c){a[b.column.field]=c},this.isValueChanged=function(){return(c.val()!=""||e!=null)&&c.val()!=e},this.validate=function(){return{valid:!0,msg:null}},this.init()}};a.extend(window,b)})(jQuery)