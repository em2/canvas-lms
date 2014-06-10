(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'i18n!calendar', 'compiled/calendar/EditAppointmentGroupDetails', 'jst/calendar/editAppointmentGroup', 'jquery.instructure_jquery_patches'], function($, I18n, EditAppointmentGroupDetails, editAppointmentGroupTemplate) {
    var EditAppointmentGroupDialog, dialog;
    dialog = $('<div id="edit_event"><div class="wrapper"></div>').appendTo('body').dialog({
      autoOpen: false,
      width: 'auto',
      resizable: false,
      title: I18n.t('titles.edit_appointment_group', "Edit Appointment Group")
    });
    return EditAppointmentGroupDialog = (function() {
      function EditAppointmentGroupDialog(apptGroup, parentCloseCB) {
        this.apptGroup = apptGroup;
        this.parentCloseCB = parentCloseCB;
        this.show = __bind(this.show, this);
        this.closeCB = __bind(this.closeCB, this);
        this.contextChange = __bind(this.contextChange, this);
        this.currentContextInfo = null;
      }
      EditAppointmentGroupDialog.prototype.contextChange = function(newContext) {};
      EditAppointmentGroupDialog.prototype.closeCB = function(saved) {
        dialog.dialog('close');
        return this.parentCloseCB(saved);
      };
      EditAppointmentGroupDialog.prototype.show = function() {
        var buttons;
        this.appointmentGroupsForm = new EditAppointmentGroupDetails(dialog.find(".wrapper"), this.apptGroup, this.contextChange, this.closeCB);
        buttons = this.apptGroup.workflow_state === 'active' ? [
          {
            text: I18n.t('save_changes', 'Save Changes'),
            click: this.appointmentGroupsForm.saveClick
          }
        ] : [
          {
            text: I18n.t('save_and_publish', 'Save & Publish'),
            'class': 'ui-button-primary',
            click: this.appointmentGroupsForm.saveClick
          }, {
            text: I18n.t('save', 'Save'),
            click: this.appointmentGroupsForm.saveWithoutPublishingClick
          }
        ];
        return dialog.dialog('option', 'buttons', buttons).dialog('open');
      };
      return EditAppointmentGroupDialog;
    })();
  });
}).call(this);
