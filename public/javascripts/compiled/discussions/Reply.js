(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['compiled/backbone-ext/Backbone', 'use!underscore', 'i18n!discussions.reply', 'jquery', 'compiled/discussions/Entry', 'str/htmlEscape', 'jst/discussions/_reply_attachment', 'tinymce.editor_box'], function(Backbone, _, I18n, $, Entry, htmlEscape, replyAttachmentTemplate) {
    var Reply;
    Reply = (function() {
      function Reply(view, options) {
        this.view = view;
        this.options = options != null ? options : {};
        this.onPostReplyError = __bind(this.onPostReplyError, this);
        this.onPostReplySuccess = __bind(this.onPostReplySuccess, this);
        this.submit = __bind(this.submit, this);
        this.hide = __bind(this.hide, this);
        this.el = this.view.$('.discussion-reply-label:first');
        this.showWhileEditing = this.el.next();
        this.textarea = this.showWhileEditing.find('.reply-textarea');
        this.form = this.el.closest('form').submit(__bind(function(event) {
          event.preventDefault();
          return this.submit();
        }, this));
        this.form.find('.cancel_button').click(this.hide);
        this.editing = false;
      }
      Reply.prototype.toggle = function() {
        if (!this.editing) {
          return this.edit();
        } else {
          return this.hide();
        }
      };
      Reply.prototype.edit = function() {
        this.form.addClass('replying');
        this.textarea.editorBox();
        this.el.hide();
        setTimeout(__bind(function() {
          return this.textarea.editorBox('focus');
        }, this));
        this.editing = true;
        return this.trigger('edit', this);
      };
      Reply.prototype.hide = function() {
        this.content = this.textarea._justGetCode();
        this.textarea._removeEditor();
        this.form.removeClass('replying');
        this.textarea.val(this.content);
        this.el.show();
        this.editing = false;
        return this.trigger('hide', this);
      };
      Reply.prototype.submit = function() {
        var entry;
        this.hide();
        this.textarea._setContentCode('');
        this.view.model.set('notification', I18n.t('saving_reply', 'Saving reply...'));
        entry = new Entry(this.getModelAttributes());
        entry.save(null, {
          success: this.onPostReplySuccess,
          error: this.onPostReplyError,
          multipart: entry.get('attachment')
        });
        this.hide();
        this.removeAttachments();
        return this.el.hide();
      };
      Reply.prototype.getModelAttributes = function() {
        var now;
        now = new Date().getTime();
        return {
          summary: $('<div/>').html(this.content).text(),
          message: this.content,
          parent_cid: this.options.topLevel ? null : this.view.model.cid,
          parent_id: this.options.topLevel ? null : this.view.model.get('id'),
          user_id: ENV.current_user_id,
          created_at: now,
          updated_at: now,
          collapsedView: false,
          attachment: this.form.find('input[type=file]')[0]
        };
      };
      Reply.prototype.onPostReplySuccess = function(entry) {
        var text, _base;
        if (!(typeof (_base = this.options).added === "function" ? _base.added() : void 0)) {
          this.view.collection.add(entry);
        }
        if (this.view.model.get('allowsSideComments')) {
          text = '';
        } else {
          text = I18n.t('reply_saved', "Reply saved, *go to your reply*", {
            wrapper: "<a href='#" + entry.cid + "' data-event='goToReply'>$1</a>"
          });
        }
        this.view.model.set('notification', text);
        return this.el.show();
      };
      Reply.prototype.onPostReplyError = function(entry) {
        this.view.model.set('notification', I18n.t('error_saving_reply', "An error occured, please post your reply again later"));
        this.textarea.val(entry.get('message'));
        return this.edit();
      };
      Reply.prototype.addAttachment = function($el) {
        this.form.find('ul.discussion-reply-attachments').append(replyAttachmentTemplate());
        return this.form.find('a.discussion-reply-add-attachment').hide();
      };
      Reply.prototype.removeAttachment = function($el) {
        $el.closest('ul.discussion-reply-attachments li').remove();
        return this.form.find('a.discussion-reply-add-attachment').show();
      };
      Reply.prototype.removeAttachments = function() {
        return this.form.find('ul.discussion-reply-attachments').empty();
      };
      return Reply;
    })();
    _.extend(Reply.prototype, Backbone.Events);
    return Reply;
  });
}).call(this);
