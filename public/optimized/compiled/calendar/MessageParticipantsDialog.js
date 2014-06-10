(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['i18n!calendar', 'jst/calendar/messageParticipants', 'jst/calendar/recipientList'], function(I18n, messageParticipantsTemplate, recipientListTemplate) {
    var MessageParticipantsDialog;
    return MessageParticipantsDialog = (function() {
      function MessageParticipantsDialog(group, dataSource) {
        this.group = group;
        this.dataSource = dataSource;
        this.messageFailed = __bind(this.messageFailed, this);
        this.messageSent = __bind(this.messageSent, this);
        this.sendMessage = __bind(this.sendMessage, this);
        this.loadParticipants = __bind(this.loadParticipants, this);
        this.$form = $(messageParticipantsTemplate(this.group)).submit(this.sendMessage);
        this.$select = this.$form.find('select.message_groups').change(this.loadParticipants).val('unregistered');
        this.$participantList = this.$form.find('ul');
      }
      MessageParticipantsDialog.prototype.show = function() {
        this.$form.dialog({
          width: 400,
          resizable: false,
          buttons: [
            {
              text: I18n.t('buttons.send_message', 'Send'),
              'data-text-while-loading': I18n.t('buttons.sending_message', 'Sending...'),
              click: function() {
                return $(this).submit();
              }
            }, {
              text: I18n.t('buttons.cancel', 'Cancel'),
              click: function() {
                return $(this).dialog('close');
              }
            }
          ],
          close: function() {
            return $(this).remove();
          }
        });
        return this.loadParticipants();
      };
      MessageParticipantsDialog.prototype.participantStatus = function(text) {
        var $status;
        if (text == null) {
          text = null;
        }
        $status = $('<li class="status" />');
        this.$participantList.html($status);
        if (text) {
          return $status.text(text);
        } else {
          return $status.spin();
        }
      };
      MessageParticipantsDialog.prototype.loadParticipants = function() {
        var registrationStatus;
        registrationStatus = this.$select.val();
        this.loading = true;
        this.participantStatus();
        return this.dataSource.getParticipants(this.group, registrationStatus, __bind(function(data) {
          var text;
          delete this.loading;
          if (data.length) {
            return this.$participantList.html(recipientListTemplate({
              recipientType: this.group.participant_type,
              recipients: data
            }));
          } else {
            text = this.group.participant_type === "Group" ? I18n.t('no_groups', 'No groups found') : I18n.t('no_users', 'No users found');
            return this.participantStatus(text);
          }
        }, this));
      };
      MessageParticipantsDialog.prototype.sendMessage = function(jsEvent) {
        var data, deferred;
        jsEvent.preventDefault();
        if (this.loading) {
          return;
        }
        data = this.$form.getFormData();
        if (!(data['recipients[]'] && data['body'])) {
          return;
        }
        deferred = $.ajaxJSON('/conversations', 'POST', data, this.messageSent, this.messageFailed);
        return this.$form.disableWhileLoading(deferred, {
          buttons: ['[data-text-while-loading] .ui-button-text']
        });
      };
      MessageParticipantsDialog.prototype.messageSent = function(data) {
        this.$form.dialog('close');
        return $.flashMessage(I18n.t('messages_sent', 'Messages Sent'));
      };
      MessageParticipantsDialog.prototype.messageFailed = function(data) {
        return this.$form.find('.error').text(I18n.t('errors.send_message_failed', 'There was an error sending your message, please try again'));
      };
      return MessageParticipantsDialog;
    })();
  });
}).call(this);
