(function() {
  define(['i18n!rubrics', 'jquery', 'jquery.instructure_jquery_patches', 'vendor/jquery.ba-tinypubsub'], function(I18n, $) {
    var assignmentRubricDialog;
    return assignmentRubricDialog = {
      initTriggers: function() {
        var $trigger;
        if ($trigger = $('.rubric_dialog_trigger')) {
          this.noRubricExists = $trigger.data('noRubricExists');
          this.url = $trigger.data('url');
          return $trigger.click(function(event) {
            event.preventDefault();
            return assignmentRubricDialog.openDialog();
          });
        }
      },
      initDialog: function() {
        this.dialogInited = true;
        this.$dialog = $("<div><h4>" + (I18n.t('loading', 'Loading...')) + "</h4></div>").dialog({
          title: I18n.t("titles.assignment_rubric_details", "Assignment Rubric Details"),
          width: 600,
          modal: false,
          resizable: true,
          autoOpen: false
        });
        return $.get(this.url, function(html) {
          assignmentRubricDialog.$dialog.html($(html).show());
          if (assignmentRubricDialog.noRubricExists) {
            return $.subscribe('edit_rubric/initted', function() {
              return assignmentRubricDialog.$dialog.find('.button.add_rubric_link').click();
            });
          }
        });
      },
      openDialog: function() {
        if (!this.dialogInited) {
          this.initDialog();
        }
        return this.$dialog.dialog('open');
      }
    };
  });
}).call(this);
