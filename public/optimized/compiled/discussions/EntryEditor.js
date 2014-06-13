(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['i18n!editor', 'jquery', 'compiled/editor/EditorToggle'], function(I18n, $, EditorToggle) {
    var EntryEditor;
    return EntryEditor = (function() {
      __extends(EntryEditor, EditorToggle);
      function EntryEditor(view) {
        this.view = view;
        this.onSaveError = __bind(this.onSaveError, this);
        this.onSaveSuccess = __bind(this.onSaveSuccess, this);
        EntryEditor.__super__.constructor.call(this, this.view.$('.message:first'));
        this.cancelButton = this.createCancelButton();
        this.done.addClass('small-button');
      }
      EntryEditor.prototype.display = function(opts) {
        EntryEditor.__super__.display.apply(this, arguments);
        this.cancelButton.detach();
        if ((opts != null ? opts.cancel : void 0) !== true) {
          return this.view.model.save({
            messageNotification: I18n.t('saving', 'Saving...'),
            message: this.content
          }, {
            success: this.onSaveSuccess,
            error: this.onSaveError
          });
        }
      };
      EntryEditor.prototype.createCancelButton = function() {
        return $('<a/>').html(I18n.t('cancel', 'Cancel')).attr('href', 'javascript:').addClass('cancel_button').click(__bind(function() {
          return this.display({
            cancel: true
          });
        }, this));
      };
      EntryEditor.prototype.edit = function() {
        EntryEditor.__super__.edit.apply(this, arguments);
        return this.cancelButton.insertAfter(this.done);
      };
      EntryEditor.prototype.getContent = function() {
        return this.view.model.get('message');
      };
      EntryEditor.prototype.onSaveSuccess = function() {
        return this.view.model.set('messageNotification', '');
      };
      EntryEditor.prototype.onSaveError = function() {
        this.view.model.set({
          messageNotification: I18n.t('save_failed', 'Failed to save, please try again later')
        });
        return this.edit();
      };
      return EntryEditor;
    })();
  });
}).call(this);
