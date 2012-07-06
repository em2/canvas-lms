require(["jquery"],function(a){a(document).ready(function(){a(".delete_misconception_link").click(function(b){b.preventDefault(),a(this).parents(".misconception").confirmDelete({url:a(this).attr("href"),message:"Are you sure you want to delete this misconception?",success:function(){a(this).slideUp(function(){a(this).remove()})}})}),a(".edit_misconception_name_link").click(function(b){b.preventDefault();var c=a(this).parents(".misconception_piece"),d=c.getTemplateData({textValues:["name"]});c.find(".header").hide(),c.find(".header_content").hide(),c.find(".modify_buttons").hide();var e=a("#edit_misconception_name_form");c.prepend(e.show()),e.attr("action",a(this).attr("href")),e.attr("method","PUT"),e.fillFormData(d,{object_name:"assessment_misconception"}),e.find(":text:visible:first").focus().select()}),a("#edit_misconception_name_form .misconception_name_box").keycodes("return esc",function(b){b.keyString=="esc"?(a(this).parents(".misconception_piece").addClass("dont_save"),a(this).blur()):b.keyString=="return"&&a("#edit_misconception_name_form").submit()}),a("#edit_misconception_name_form .misconception_name_box").blur(function(){var b=a(this).parents(".misconception_piece");if(!b.hasClass("dont_save")&&!b.hasClass("save_in_progress")){a("#edit_misconception_name_form").submit();return}b.removeClass("dont_save"),b.find(".header").show(),b.find(".header_content").show(),b.find(".modify_buttons").show(),a("body").append(a("#edit_misconception_name_form").hide())}),a("#edit_misconception_name_form").formSubmit({object_name:"assessment_misconception",beforeSubmit:function(b){var c=a(this).parents(".misconception_piece");c.attr("id","misconception_adding");try{c.addClass("save_in_progress"),c.find(".misconception_name_box").blur()}catch(d){}return c.fillTemplateData({data:b}),c.loadingImage(),c},success:function(b,c){c.loadingImage("remove"),c.removeClass("save_in_progress");var d=b.assessment_misconception;d.last_updated_at=a.parseFromISO(d.updated_at).datetime_formatted,c.fillTemplateData({data:d,hrefValues:["id"]})},error:function(b,c){c.loadingImage("remove"),c.removeClass("save_in_progress"),c.find(".edit_misconception_name_link").click(),a("#edit_misconception_name_form").formErrors(b)}}),a(".delete_misconception_link").click(function(b){b.preventDefault(),a(this).parents(".misconception").confirmDelete({url:a(this).attr("href"),message:"Are you sure you want to delete this misconception?",success:function(){a(this).slideUp(function(){a(this).remove()})}})}),a(".edit_misconception_url_link").click(function(b){b.preventDefault();var c=a(this).parents(".misconception_piece"),d=c.getTemplateData({textValues:["name"]});c.find(".header").hide(),c.find(".header_content").hide(),c.find(".modify_buttons").hide();var e=a("#edit_misconception_url_form");c.prepend(e.show()),e.attr("action",a(this).attr("href")),e.attr("method","PUT"),e.fillFormData(d,{object_name:"assessment_misconception"}),e.find(":text:visible:first").focus().select()}),a("#edit_misconception_url_form .misconception_url_box").keycodes("return esc",function(b){b.keyString=="esc"?(a(this).parents(".misconception_piece").addClass("dont_save"),a(this).blur()):b.keyString=="return"&&a("#edit_misconception_url_form").submit()}),a("#edit_misconception_url_form .misconception_url_box").blur(function(){var b=a(this).parents(".misconception_piece");if(!b.hasClass("dont_save")&&!b.hasClass("save_in_progress")){a("#edit_misconception_url_form").submit();return}b.removeClass("dont_save"),b.find(".header").show(),b.find(".header_content").show(),b.find(".modify_buttons").show(),a("body").append(a("#edit_misconception_url_form").hide())}),a("#edit_misconception_url_form").formSubmit({object_name:"assessment_misconception",beforeSubmit:function(b){var c=a(this).parents(".misconception_piece");c.attr("id","misconception_adding");try{c.addClass("save_in_progress"),c.find(".misconception_url_box").blur()}catch(d){}return c.fillTemplateData({data:b}),c.loadingImage(),c},success:function(b,c){c.loadingImage("remove"),c.removeClass("save_in_progress");var d=b.assessment_misconception;d.last_updated_at=a.parseFromISO(d.updated_at).datetime_formatted,c.fillTemplateData({data:d,hrefValues:["id"]})},error:function(b,c){c.loadingImage("remove"),c.removeClass("save_in_progress"),c.find(".edit_misconception_url_link").click(),a("#edit_misconception_url_form").formErrors(b)}}),a(".delete_misconception_link").click(function(b){b.preventDefault(),a(this).parents(".misconception").confirmDelete({url:a(this).attr("href"),message:"Are you sure you want to delete this misconception?",success:function(){a(this).slideUp(function(){a(this).remove()})}})}),a(".edit_misconception_description_link").click(function(b){b.preventDefault();var c=a(this).parents(".misconception_piece"),d=c.getTemplateData({textValues:["name"]});c.find(".header").hide(),c.find(".header_content").hide(),c.find(".modify_buttons").hide();var e=a("#edit_misconception_description_form");c.prepend(e.show()),e.attr("action",a(this).attr("href")),e.attr("method","PUT"),e.fillFormData(d,{object_name:"assessment_misconception"}),e.find(":text:visible:first").focus().select()}),a("#edit_misconception_description_form .misconception_description_box").keycodes("return esc",function(b){b.keyString=="esc"?(a(this).parents(".misconception_piece").addClass("dont_save"),a(this).blur()):b.keyString=="return"&&a("#edit_misconception_description_form").submit()}),a("#edit_misconception_description_form .misconception_description_box").blur(function(){var b=a(this).parents(".misconception_piece");if(!b.hasClass("dont_save")&&!b.hasClass("save_in_progress")){a("#edit_misconception_description_form").submit();return}b.removeClass("dont_save"),b.find(".header").show(),b.find(".header_content").show(),b.find(".modify_buttons").show(),a("body").append(a("#edit_misconception_description_form").hide())}),a("#edit_misconception_description_form").formSubmit({object_name:"assessment_misconception",beforeSubmit:function(b){var c=a(this).parents(".misconception_piece");c.attr("id","misconception_adding");try{c.addClass("save_in_progress"),c.find(".misconception_description_box").blur()}catch(d){}return c.fillTemplateData({data:b}),c.loadingImage(),c},success:function(b,c){c.loadingImage("remove"),c.removeClass("save_in_progress");var d=b.assessment_misconception;d.last_updated_at=a.parseFromISO(d.updated_at).datetime_formatted,c.fillTemplateData({data:d,hrefValues:["id"]})},error:function(b,c){c.loadingImage("remove"),c.removeClass("save_in_progress"),c.find(".edit_misconception_description_link").click(),a("#edit_misconception_description_form").formErrors(b)}})})}),define("misconceptions",function(){}),function(){require(["misconceptions"])}.call(this),define("compiled/bundles/misconceptions",function(){})