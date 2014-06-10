(function() {
  require(["i18n!registration_confirmation", "jquery", "jquery.instructure_forms", 'jquery.instructure_misc_plugins', 'user_sortable_name'], function(I18n, $) {
    return $(function() {
      var $disambiguation_box, $merge_link, $registration_form, $where_to_log_in, showPane;
      $registration_form = $("#registration_confirmation_form");
      $disambiguation_box = $(".disambiguation_box");
      showPane = function(paneToShow) {
        return $.each([$disambiguation_box, $registration_form, $where_to_log_in], function(i, $pane) {
          return $pane.showIf($pane.is(paneToShow));
        });
      };
      $(".button#back").click(function(event) {
        showPane($disambiguation_box);
        return event.preventDefault();
      });
      $(".button#register").click(function(event) {
        showPane($registration_form);
        return event.preventDefault();
      });
      $merge_link = $(".button#merge").click(function(event) {
        if ($merge_link.attr('href') === 'new_user_account') {
          showPane($registration_form);
          return event.preventDefault();
        }
      });
      $("input:radio[name=\"pseudonym_select\"]").change(function() {
        return $merge_link.attr("href", $("input:radio[name=\"pseudonym_select\"]:checked").attr("value"));
      });
      $where_to_log_in = $('#where_to_log_in');
      if ($where_to_log_in.length) {
        $('#merge_if_clicked').click(function() {
          return window.location = $merge_link.attr("href");
        });
        $merge_link.click(function(event) {
          event.preventDefault();
          return showPane($where_to_log_in);
        });
      }
      $registration_form.find(":text:first").focus().select();
      return $registration_form.submit(function(event) {
        var data, success;
        data = $$registration_form.getFormData();
        success = true;
        if (!data["user[name]"]) {
          $registration_form.formErrors({
            "user[name]": I18n.t("#pseudonyms.registration_confirmation_form.errors.user_name_required", "User name is required")
          });
          success = false;
        } else if (!data["user[short_name]"]) {
          $registration_form.formErrors({
            "unique_id": I18n.t("#pseudonyms.registration_confirmation_form.errors.short_name_required", "Short name is required")
          });
          success = false;
        } else if (!data["pseudonym[password]"] || !data["pseudonym[password]"].length) {
          $registration_form.formErrors({
            "pseudonym[password]": I18n.t("#pseudonyms.registration_confirmation_form.errors.password_required", "Password required")
          });
          success = false;
        } else if (data["pseudonym[password]"].length < 6) {
          $registration_form.formErrors({
            "pseudonym[password]": I18n.t("#pseudonyms.registration_confirmation_form.errors.password_too_short", "Password too short")
          });
          success = false;
        } else if (data["pseudonym[password]"] !== data["pseudonym[password_confirmation]"]) {
          $registration_form.formErrors({
            "pseudonym[password_confirmation]": I18n.t("#pseudonyms.registration_confirmation_form.errors.passwords_dont_match", "Passwords don't match")
          });
          success = false;
        }
        return success;
      });
    });
  });
}).call(this);
