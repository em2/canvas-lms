define(["jquery","jquery.instructure_forms","jquery.keycodes","jquery.loadingImg"],function(a){var b=null;a(".edit_auth_link").click(function(b){b.preventDefault(),a("#auth_form").addClass("editing").find(":text:first").focus().select()}),a("#add_auth_select").change(function(c){c.preventDefault(),a("#auth_form").find(".cancel_button:first").click(),b=a(this).find(":selected").val(),b==""||b==null?b=null:(a("#"+b+"_div").addClass("active"),a("#"+b+"_form").attr("id","auth_form"),a("#no_auth").css("display","none"),a("#auth_form").addClass("editing").find(":text:first").focus().select())}),a(".auth_type").each(function(c){a(this).find(".cancel_button").click(function(){a("#auth_form").removeClass("editing"),a("#no_auth").length&&b&&(a("#no_auth").css("display","inline"),a("#"+b+"_div").removeClass("active"),a("#auth_form").attr("id",b+"_form"),b=null)}).end().find(":text").keycodes("esc",function(){a(this).parents("#auth_form").find(".cancel_button:first").click()}),a(this).formSubmit({beforeSubmit:function(){a(this).loadingImage()},success:function(a){window.location.reload()}})}),a(".add_secondary_ldap_link").click(function(b){b.preventDefault(),a(".ldap_secondary").show(),a("#secondary_ldap_config_disabled").val("0"),a(this).hide()}),a(".remove_secondary_ldap_link").click(function(b){b.preventDefault(),a(".ldap_secondary").hide(),a("#secondary_ldap_config_disabled").val("1"),a(".add_secondary_ldap_link").show()})})