define(["jquery","instructure-jquery.ui.draggable-patch","jquery.instructure_misc_plugins"],function(a){a(document).ready(function(){a("#floating_reminders").draggable(),a(".show_reminders_link").click(function(b){b.preventDefault(),a(this).blur();var c=a("#floating_reminders"),d=c.clone();d.children().css("visibility","hidden");var e=a("#reminders_icon").offset(),f=a("#floating_reminders").offset().top;c.after(d),d.css({width:20,height:20,left:e.left,top:e.top-f,opacity:0}),c.css("visibility","hidden").css("left",""),d.animate({top:c.css("top"),left:c.css("left"),width:c.width(),height:c.height(),opacity:1},"slow",function(){a(this).remove(),c.css("visibility","visible"),c.find("a:not(.hide_reminders_link):visible:first").focus(),a("#reminders_icon").hide()});var g=c.find(".update_session_url").attr("href")}),a(".hide_reminders_link").click(function(b){b.preventDefault();var c=a(this).parents("#floating_reminders"),d=c.clone();c.after(d).css("left",-2e3),d.children().css("visibility","hidden");var e=a("#reminders_icon").show().offset(),f=d.offset().top;d.animate({width:20,height:20,left:e.left,top:e.top-f,opacity:0},"slow",function(){a(this).remove()});var g=c.find(".update_session_url").attr("href")}),a(".drop_held_context_link").click(function(b){b.preventDefault();var c=a(this).parents(".reminder");c.confirmDelete({url:a(this).attr("href"),message:"Are you sure you want to drop this "+c.find(".item_type").text()+"?",success:function(b){a(this).fadeOut("fast",function(){a(this).remove(),a("#floating_reminders .reminder").length===0&&a("#floating_reminders").fadeOut("fast",function(){a(this).remove(),a("#reminders_icon").remove()})})}})})})})