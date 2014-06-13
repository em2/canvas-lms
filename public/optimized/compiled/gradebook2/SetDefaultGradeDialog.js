(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['i18n!gradebook2', 'jquery', 'jst/SetDefaultGradeDialog', 'use!underscore', 'jquery.disableWhileLoading', 'jquery.instructure_forms', 'jquery.instructure_jquery_patches', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub', 'compiled/jquery/fixDialogButtons', 'jst/_grading_box'], function(I18n, $, setDefaultGradeDialogTemplate, _) {
    var SetDefaultGradeDialog;
    return SetDefaultGradeDialog = (function() {
      function SetDefaultGradeDialog(assignment, gradebook) {
        this.assignment = assignment;
        this.gradebook = gradebook;
        this.initDialog = __bind(this.initDialog, this);
        this.initDialog();
      }
      SetDefaultGradeDialog.prototype.initDialog = function() {
        var templateLocals;
        templateLocals = {
          assignment: this.assignment,
          showPointsPossible: this.assignment.points_possible || this.assignment.points_possible === '0',
          url: "/courses/" + this.gradebook.options.context_id + "/gradebook/update_submission"
        };
        templateLocals["assignment_grading_type_is_" + this.assignment.grading_type] = true;
        this.$dialog = $(setDefaultGradeDialogTemplate(templateLocals));
        this.$dialog.dialog({
          resizable: false,
          width: 350,
          open: __bind(function() {
            return this.$dialog.find(".grading_box").focus();
          }, this),
          close: __bind(function() {
            return this.$dialog.remove();
          }, this)
        }).fixDialogButtons();
        return this.$dialog.formSubmit({
          disableWhileLoading: true,
          processData: __bind(function(data) {
            var canOverwrite, hasNoScore, idx, inSection, student, studentsAffected, updateData, _ref;
            studentsAffected = 0;
            hasNoScore = __bind(function(student) {
              return !(student["assignment_" + this.assignment.id].score != null);
            }, this);
            canOverwrite = data.overwrite_existing_grades;
            inSection = __bind(function(student) {
              if (this.gradebook.sectionToShow) {
                return _.include(student.sections, this.gradebook.sectionToShow);
              } else {
                return true;
              }
            }, this);
            updateData = __bind(function(idx, student) {
              studentsAffected = studentsAffected + 1;
              data["submissions[submission_" + idx + "][assignment_id]"] = this.assignment.id;
              data["submissions[submission_" + idx + "][user_id]"] = student.id;
              return data["submissions[submission_" + idx + "][grade]"] = data.default_grade;
            }, this);
            _ref = this.gradebook.students;
            for (idx in _ref) {
              student = _ref[idx];
              if ((hasNoScore(student) || canOverwrite) && inSection(student)) {
                updateData(idx, student);
              }
            }
            if (studentsAffected === 0) {
              alert(I18n.t('alerts.none_to_update', "None to Update"));
              return false;
            }
            return data;
          }, this),
          success: __bind(function(data) {
            var datum, submissions;
            submissions = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = data.length; _i < _len; _i++) {
                datum = data[_i];
                _results.push(datum.submission);
              }
              return _results;
            })();
            $.publish('submissions_updated', [submissions]);
            alert(I18n.t('alerts.scores_updated', {
              'one': '1 Student score updated',
              'other': '%{count} Student scores updated'
            }, {
              'count': data.length
            }));
            return this.$dialog.remove();
          }, this)
        });
      };
      return SetDefaultGradeDialog;
    })();
  });
}).call(this);
