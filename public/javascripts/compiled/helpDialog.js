(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['i18n!help_dialog', 'jst/helpDialog', 'INST', 'str/htmlEscape', 'compiled/fn/preventDefault', 'jquery.instructure_misc_helpers', 'jquery.instructure_jquery_patches', 'jquery.disableWhileLoading'], function(I18n, helpDialogTemplate, INST, htmlEscape, preventDefault) {
    var helpDialog;
    return helpDialog = {
      defaultLinks: [
        {
          available_to: ['student'],
          text: I18n.t('instructor_question', 'Ask Your Instructor a Question'),
          subtext: I18n.t('instructor_question_sub', 'Questions are submitted to your instructor'),
          url: '#teacher_feedback'
        }, {
          available_to: ['user', 'student', 'teacher', 'admin'],
          text: I18n.t('search_the_canvas_guides', 'Search the Canvas Guides'),
          subtext: I18n.t('canvas_help_sub', 'Find answers to common questions'),
          url: 'http://guides.instructure.com'
        }, {
          available_to: ['user', 'student', 'teacher', 'admin'],
          text: I18n.t('report_problem', 'Report a Problem'),
          subtext: I18n.t('report_problem_sub', 'If Canvas misbehaves, tell us about it'),
          url: '#create_ticket'
        }
      ],
      defaultTitle: I18n.t('Help', "Help"),
      initDialog: function() {
        this.$dialog = $('<div style="padding:0; overflow: visible;" />').dialog({
          resizable: false,
          width: 400,
          title: this.defaultTitle,
          close: __bind(function() {
            return this.switchTo('#help-dialog-options');
          }, this)
        });
        this.$dialog.dialog('widget').delegate('a[href="#teacher_feedback"],\
                                          a[href="#create_ticket"],\
                                          a[href="#help-dialog-options"]', 'click', preventDefault(__bind(function(_arg) {
          var currentTarget;
          currentTarget = _arg.currentTarget;
          return this.switchTo($(currentTarget).attr('href'));
        }, this)));
        this.helpLinksDfd = $.getJSON('/help_links').done(__bind(function(links) {
          var locals;
          links = $.grep(this.defaultLinks.concat(links), function(link) {
            return $.detect(link.available_to, function(role) {
              return role === 'user' || (ENV.current_user_roles && __indexOf.call(ENV.current_user_roles, role) >= 0);
            });
          });
          locals = {
            showEmail: !ENV.current_user_id,
            helpLinks: links,
            showBadBrowserMessage: INST.browser.ie,
            browserVersion: INST.browser.version,
            url: window.location
          };
          this.$dialog.html(helpDialogTemplate(locals));
          this.initTicketForm();
          return $(this).trigger('ready');
        }, this));
        this.$dialog.disableWhileLoading(this.helpLinksDfd);
        return this.dialogInited = true;
      },
      initTicketForm: function() {
        var $form;
        return $form = this.$dialog.find('#create_ticket').formSubmit({
          disableWhileLoading: true,
          required: ['error[subject]', 'error[comments]', 'error[user_perceived_severity]'],
          success: __bind(function() {
            this.$dialog.dialog('close');
            return $form.find(':input').val('');
          }, this)
        });
      },
      switchTo: function(panelId) {
        var newHeight, newTitle, toggleablePanels;
        toggleablePanels = "#teacher_feedback, #create_ticket";
        this.$dialog.find(toggleablePanels).hide();
        newHeight = this.$dialog.find(panelId).show().outerHeight();
        this.$dialog.animate({
          left: toggleablePanels.match(panelId) ? -400 : 0,
          height: newHeight
        }, {
          step: __bind(function() {
            return this.$dialog.dialog('option', 'position', 'center');
          }, this),
          duration: 100
        });
        if (newTitle = this.$dialog.find("a[href='" + panelId + "'] .text").text()) {
          newTitle = $("          <a class='ui-dialog-header-backlink' href='#help-dialog-options'>            " + (I18n.t('Back', 'Back')) + "          </a>          <span>" + newTitle + "</span>        ");
        } else {
          newTitle = this.defaultTitle;
        }
        return this.$dialog.dialog('option', 'title', newTitle);
      },
      open: function() {
        if (!helpDialog.dialogInited) {
          helpDialog.initDialog();
        }
        helpDialog.$dialog.dialog('open');
        return helpDialog.initTeacherFeedback();
      },
      initTeacherFeedback: function() {
        var $form, coursesDfd, currentUserIsStudent;
        currentUserIsStudent = ENV.current_user_roles && __indexOf.call(ENV.current_user_roles, 'student') >= 0;
        if (!this.teacherFeedbackInited && currentUserIsStudent) {
          this.teacherFeedbackInited = true;
          coursesDfd = $.getJSON('/api/v1/courses.json');
          $form = null;
          this.helpLinksDfd.done(__bind(function() {
            return $form = this.$dialog.find("#teacher_feedback").disableWhileLoading(coursesDfd).formSubmit({
              disableWhileLoading: true,
              required: ['recipients[]', 'body'],
              success: __bind(function() {
                return this.$dialog.dialog('close');
              }, this)
            });
          }, this));
          return $.when(coursesDfd, this.helpLinksDfd).done(function(_arg) {
            var courses, options;
            courses = _arg[0];
            options = $.map(courses, function(c) {
              return "<option value='course_" + c.id + "_admins' " + (ENV.context_id === c.id ? 'selected' : '') + ">              " + (htmlEscape(c.name)) + "            </option>";
            });
            return $form.find('[name="recipients[]"]').html(options.join(''));
          });
        }
      },
      initTriggers: function() {
        return $('.help_dialog_trigger').click(preventDefault(this.open));
      }
    };
  });
}).call(this);
