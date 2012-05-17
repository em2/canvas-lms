(function(){require(["i18n!registration_confirmation","jquery","jquery.instructure_forms","jquery.instructure_misc_plugins","user_sortable_name"],function(a,b){return b(function(){var c,d,e,f,g;return e=b("#registration_confirmation_form"),c=b(".disambiguation_box"),g=function(a){return b.each([c,e,f],function(b,c){return c.showIf(c.is(a))})},b(".button#back").click(function(a){return g(c),a.preventDefault()}),b(".button#register").click(function(a){return g(e),a.preventDefault()}),d=b(".button#merge").click(function(a){if(d.attr("href")==="new_user_account")return g(e),a.preventDefault()}),b('input:radio[name="pseudonym_select"]').change(function(){return d.attr("href",b('input:radio[name="pseudonym_select"]:checked').attr("value"))}),f=b("#where_to_log_in"),f.length&&(b("#merge_if_clicked").click(function(){return window.location=d.attr("href")}),d.click(function(a){return a.preventDefault(),g(f)})),e.find(":text:first").focus().select(),e.submit(function(b){var c,d;return c=$$registration_form.getFormData(),d=!0,c["user[name]"]?c["user[short_name]"]?!c["pseudonym[password]"]||!c["pseudonym[password]"].length?(e.formErrors({"pseudonym[password]":a.t("#pseudonyms.registration_confirmation_form.errors.password_required","Password required")}),d=!1):c["pseudonym[password]"].length<6?(e.formErrors({"pseudonym[password]":a.t("#pseudonyms.registration_confirmation_form.errors.password_too_short","Password too short")}),d=!1):c["pseudonym[password]"]!==c["pseudonym[password_confirmation]"]&&(e.formErrors({"pseudonym[password_confirmation]":a.t("#pseudonyms.registration_confirmation_form.errors.passwords_dont_match","Passwords don't match")}),d=!1):(e.formErrors({unique_id:a.t("#pseudonyms.registration_confirmation_form.errors.short_name_required","Short name is required")}),d=!1):(e.formErrors({"user[name]":a.t("#pseudonyms.registration_confirmation_form.errors.user_name_required","User name is required")}),d=!1),d})})})}).call(this)