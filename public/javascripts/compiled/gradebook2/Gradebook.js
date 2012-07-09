(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['i18n!gradebook2', 'compiled/gradebook2/GRADEBOOK_TRANSLATIONS', 'jquery', 'compiled/grade_calculator', 'vendor/spin', 'compiled/multi_grid', 'compiled/SubmissionDetailsDialog', 'compiled/gradebook2/AssignmentGroupWeightsDialog', 'compiled/gradebook2/SubmissionCell', 'compiled/gradebook2/GradebookHeaderMenu', 'str/htmlEscape', 'jst/gradebook_uploads_form', 'jst/gradebook2/section_to_show_menu', 'jst/gradebook2/column_header', 'jst/gradebook2/group_total_cell', 'jst/gradebook2/row_student_name', 'jst/_avatar', 'jquery.ajaxJSON', 'jquery.instructure_date_and_time', 'jquery.instructure_jquery_patches', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub', 'vendor/jquery.store', 'jqueryui/mouse', 'jqueryui/position', 'jqueryui/sortable', 'compiled/jquery.kylemenu', 'compiled/jquery/fixDialogButtons'], function(I18n, GRADEBOOK_TRANSLATIONS, $, GradeCalculator, Spinner, MultiGrid, SubmissionDetailsDialog, AssignmentGroupWeightsDialog, SubmissionCell, GradebookHeaderMenu, htmlEscape, gradebook_uploads_form, sectionToShowMenuTemplate, columnHeaderTemplate, groupTotalCellTemplate, rowStudentNameTemplate) {
    var Gradebook;
    return Gradebook = (function() {
      var columnWidths;
      columnWidths = {
        assignment: {
          min: 10,
          max: 200
        },
        assignmentGroup: {
          min: 35,
          max: 200
        },
        total: {
          min: 85,
          max: 100
        }
      };
      function Gradebook(options) {
        var promise;
        this.options = options;
        this.initGrid = __bind(this.initGrid, this);
        this.initHeader = __bind(this.initHeader, this);
        this.hoverMinimizedCell = __bind(this.hoverMinimizedCell, this);
        this.unminimizeColumn = __bind(this.unminimizeColumn, this);
        this.minimizeColumn = __bind(this.minimizeColumn, this);
        this.fixColumnReordering = __bind(this.fixColumnReordering, this);
        this.unhighlightColumns = __bind(this.unhighlightColumns, this);
        this.highlightColumn = __bind(this.highlightColumn, this);
        this.calculateStudentGrade = __bind(this.calculateStudentGrade, this);
        this.groupTotalFormatter = __bind(this.groupTotalFormatter, this);
        this.staticCellFormatter = __bind(this.staticCellFormatter, this);
        this.cellFormatter = __bind(this.cellFormatter, this);
        this.updateSubmissionsFromExternal = __bind(this.updateSubmissionsFromExternal, this);
        this.updateSubmission = __bind(this.updateSubmission, this);
        this.gotSubmissionsChunk = __bind(this.gotSubmissionsChunk, this);
        this.getSubmissionsChunks = __bind(this.getSubmissionsChunks, this);
        this.buildRows = __bind(this.buildRows, this);
        this.handleAssignmentMutingChange = __bind(this.handleAssignmentMutingChange, this);
        this.rowFilter = __bind(this.rowFilter, this);
        this.columnSortFn = __bind(this.columnSortFn, this);
        this.arrangeColumnsBy = __bind(this.arrangeColumnsBy, this);
        this.gotChunkOfStudents = __bind(this.gotChunkOfStudents, this);
        this.gotSections = __bind(this.gotSections, this);
        this.gotAssignmentGroups = __bind(this.gotAssignmentGroups, this);
        this.chunk_start = 0;
        this.students = {};
        this.rows = [];
        this.studentsPage = 1;
        this.sortFn = function(student) {
          return student.sortable_name;
        };
        this.assignmentsToHide = ($.store.userGet("hidden_columns_" + this.options.context_code) || '').split(',');
        this.sectionToShow = Number($.store.userGet("grading_show_only_section" + this.options.context_id)) || void 0;
        this.show_attendance = $.store.userGet("show_attendance_" + this.options.context_code) === 'true';
        this.include_ungraded_assignments = $.store.userGet("include_ungraded_assignments_" + this.options.context_code) === 'true';
        $.subscribe('assignment_group_weights_changed', this.buildRows);
        $.subscribe('assignment_muting_toggled', this.handleAssignmentMutingChange);
        $.subscribe('submissions_updated', this.updateSubmissionsFromExternal);
        promise = $.when($.ajaxJSON(this.options.students_url, "GET"), $.ajaxJSON(this.options.assignment_groups_url, "GET", {}, this.gotAssignmentGroups), $.ajaxJSON(this.options.sections_url, "GET", {}, this.gotSections)).then(__bind(function(_arg) {
          var status, students, xhr;
          students = _arg[0], status = _arg[1], xhr = _arg[2];
          return this.gotChunkOfStudents(students, xhr);
        }, this));
        this.spinner = new Spinner();
        $(this.spinner.spin().el).css({
          opacity: 0.5,
          top: '50%',
          left: '50%'
        }).addClass('use-css-transitions-for-show-hide').appendTo('#main');
      }
      Gradebook.prototype.gotAssignmentGroups = function(assignmentGroups) {
        var assignment, group, _i, _len, _results;
        this.assignmentGroups = {};
        this.assignments = {};
        new AssignmentGroupWeightsDialog({
          context: this.options,
          assignmentGroups: assignmentGroups
        });
        _results = [];
        for (_i = 0, _len = assignmentGroups.length; _i < _len; _i++) {
          group = assignmentGroups[_i];
          htmlEscape(group);
          this.assignmentGroups[group.id] = group;
          _results.push((function() {
            var _j, _len2, _ref, _results2;
            _ref = group.assignments;
            _results2 = [];
            for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
              assignment = _ref[_j];
              htmlEscape(assignment);
              assignment.assignment_group = group;
              if (assignment.due_at) {
                assignment.due_at = $.parseFromISO(assignment.due_at);
              }
              _results2.push(this.assignments[assignment.id] = assignment);
            }
            return _results2;
          }).call(this));
        }
        return _results;
      };
      Gradebook.prototype.gotSections = function(sections) {
        var section, _i, _len;
        this.sections = {};
        for (_i = 0, _len = sections.length; _i < _len; _i++) {
          section = sections[_i];
          htmlEscape(section);
          this.sections[section.id] = section;
        }
        return this.sections_enabled = sections.length > 1;
      };
      Gradebook.prototype.gotChunkOfStudents = function(studentEnrollments, xhr) {
        var link, student, studentEnrollment, _base, _base2, _i, _len, _name;
        for (_i = 0, _len = studentEnrollments.length; _i < _len; _i++) {
          studentEnrollment = studentEnrollments[_i];
          student = studentEnrollment.user;
          student.enrollment = studentEnrollment;
          (_base = this.students)[_name = student.id] || (_base[_name] = htmlEscape(student));
          (_base2 = this.students[student.id]).sections || (_base2.sections = []);
          this.students[student.id].sections.push(studentEnrollment.course_section_id);
        }
        link = xhr.getResponseHeader('Link');
        if (link && link.match(/rel="next"/)) {
          this.studentsPage += 1;
          return $.ajaxJSON(this.options.students_url, "GET", {
            "page": this.studentsPage
          }, this.gotChunkOfStudents);
        } else {
          return this.gotAllStudents();
        }
      };
      Gradebook.prototype.gotAllStudents = function() {
        var assignment, id, sectionId, sectionNames, student, _name, _ref, _ref2;
        _ref = this.students;
        for (id in _ref) {
          student = _ref[id];
          student.computed_current_score || (student.computed_current_score = 0);
          student.computed_final_score || (student.computed_final_score = 0);
          student.secondary_identifier = student.sis_login_id || student.login_id;
          if (this.sections_enabled) {
            sectionNames = $.toSentence(((function() {
              var _i, _len, _ref2, _results;
              _ref2 = student.sections;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                sectionId = _ref2[_i];
                _results.push(this.sections[sectionId].name);
              }
              return _results;
            }).call(this)).sort());
          }
          student.display_name = rowStudentNameTemplate({
            avatar_image_url: student.avatar_url,
            display_name: student.name,
            url: student.enrollment.grades.html_url,
            sectionNames: sectionNames
          });
          _ref2 = this.assignments;
          for (id in _ref2) {
            assignment = _ref2[id];
            student[_name = "assignment_" + id] || (student[_name] = {
              assignment_id: id,
              user_id: student.id
            });
          }
          this.rows.push(student);
        }
        this.initGrid();
        this.buildRows();
        this.getSubmissionsChunks();
        return this.initHeader();
      };
      Gradebook.prototype.arrangeColumnsBy = function(newThingToArrangeBy) {
        var columns;
        if (newThingToArrangeBy && newThingToArrangeBy !== this._sortColumnsBy) {
          this.$columnArrangementTogglers.each(function() {
            return $(this).closest('li').showIf($(this).data('arrangeColumnsBy') !== newThingToArrangeBy);
          });
          this._sortColumnsBy = newThingToArrangeBy;
          $.store[newThingToArrangeBy === 'due_date' ? 'userSet' : 'userRemove']("sort_grade_colums_by_" + this.options.context_id, newThingToArrangeBy);
          columns = this.gradeGrid.getColumns();
          columns.sort(this.columnSortFn);
          this.gradeGrid.setColumns(columns);
          this.fixColumnReordering();
          this.buildRows();
        }
        return this._sortColumnsBy || (this._sortColumnsBy = $.store.userGet("sort_grade_colums_by_" + this.options.context_id) || 'assignment_group');
      };
      Gradebook.prototype.columnSortFn = function(a, b) {
        var aDate, bDate, diffOfAssignmentGroupPosition, diffOfAssignmentPosition, _ref, _ref2;
        if (b.type === 'total_grade') {
          return -1;
        }
        if (a.type === 'total_grade') {
          return 1;
        }
        if (b.type === 'assignment_group' && a.type !== 'assignment_group') {
          return -1;
        }
        if (a.type === 'assignment_group' && b.type !== 'assignment_group') {
          return 1;
        }
        if (a.type === 'assignment_group' && b.type === 'assignment_group') {
          return a.object.position - b.object.position;
        } else if (a.type === 'assignment' && b.type === 'assignment') {
          if (this.arrangeColumnsBy() === 'assignment_group') {
            diffOfAssignmentGroupPosition = a.object.assignment_group.position - b.object.assignment_group.position;
            diffOfAssignmentPosition = a.object.position - b.object.position;
            return (diffOfAssignmentGroupPosition * 1000000) + diffOfAssignmentPosition;
          } else {
            aDate = ((_ref = a.object.due_at) != null ? _ref.timestamp : void 0) || Number.MAX_VALUE;
            bDate = ((_ref2 = b.object.due_at) != null ? _ref2.timestamp : void 0) || Number.MAX_VALUE;
            if (aDate === bDate) {
              if (a.object.name === b.object.name) {
                return 0;
              }
              if (a.object.name > b.object.name) {
                return 1;
              } else {
                return -1;
              }
            }
            return aDate - bDate;
          }
        }
        throw "unhandled column sort condition";
      };
      Gradebook.prototype.rowFilter = function(student) {
        var _ref;
        return !this.sectionToShow || (_ref = this.sectionToShow, __indexOf.call(student.sections, _ref) >= 0);
      };
      Gradebook.prototype.handleAssignmentMutingChange = function(assignment) {
        var colDef, idx;
        idx = this.gradeGrid.getColumnIndex("assignment_" + assignment.id);
        colDef = this.gradeGrid.getColumns()[idx];
        colDef.name = this.assignmentHeaderHtml(assignment);
        this.gradeGrid.setColumns(this.gradeGrid.getColumns());
        this.fixColumnReordering();
        return this.buildRows();
      };
      Gradebook.prototype.buildRows = function() {
        var column, i, id, sortables, student, _len, _ref, _ref2, _ref3, _ref4;
        this.rows.length = 0;
        sortables = {};
        _ref = this.gradeGrid.getColumns();
        for (id in _ref) {
          column = _ref[id];
          if ('' + ((_ref2 = column.object) != null ? _ref2.submission_types : void 0) === "attendance") {
            column.unselectable = !this.show_attendance;
            column.cssClass = this.show_attendance ? '' : 'completely-hidden';
            this.$grid.find("[id*='" + column.id + "']").showIf(this.show_attendance);
          }
        }
        _ref3 = this.students;
        for (id in _ref3) {
          student = _ref3[id];
          student.row = -1;
          if (this.rowFilter(student)) {
            this.rows.push(student);
            this.calculateStudentGrade(student);
            sortables[student.id] = this.sortFn(student);
          }
        }
        this.rows.sort(function(a, b) {
          if (sortables[a.id] < sortables[b.id]) {
            return -1;
          } else if (sortables[a.id] > sortables[b.id]) {
            return 1;
          } else {
            return 0;
          }
        });
        _ref4 = this.rows;
        for (i = 0, _len = _ref4.length; i < _len; i++) {
          student = _ref4[i];
          student.row = i;
        }
        return this.multiGrid.invalidate();
      };
      Gradebook.prototype.getSubmissionsChunks = function() {
        var assignment, id, params, student, students, _results;
        _results = [];
        while (true) {
          students = this.rows.slice(this.chunk_start, this.chunk_start + this.options.chunk_size);
          if (!students.length) {
            this.allSubmissionsLoaded = true;
            break;
          }
          params = {
            student_ids: (function() {
              var _i, _len, _results2;
              _results2 = [];
              for (_i = 0, _len = students.length; _i < _len; _i++) {
                student = students[_i];
                _results2.push(student.id);
              }
              return _results2;
            })(),
            assignment_ids: (function() {
              var _ref, _results2;
              _ref = this.assignments;
              _results2 = [];
              for (id in _ref) {
                assignment = _ref[id];
                _results2.push(id);
              }
              return _results2;
            }).call(this),
            response_fields: ['user_id', 'url', 'score', 'grade', 'submission_type', 'submitted_at', 'assignment_id', 'grade_matches_current_submission']
          };
          $.ajaxJSON(this.options.submissions_url, "GET", params, this.gotSubmissionsChunk);
          _results.push(this.chunk_start += this.options.chunk_size);
        }
        return _results;
      };
      Gradebook.prototype.gotSubmissionsChunk = function(student_submissions) {
        var data, student, submission, _i, _j, _len, _len2, _ref;
        for (_i = 0, _len = student_submissions.length; _i < _len; _i++) {
          data = student_submissions[_i];
          student = this.students[data.user_id];
          _ref = data.submissions;
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            submission = _ref[_j];
            this.updateSubmission(submission);
          }
          student.loaded = true;
          this.multiGrid.invalidateRow(student.row);
          this.calculateStudentGrade(student);
        }
        return this.multiGrid.render();
      };
      Gradebook.prototype.updateSubmission = function(submission) {
        var student;
        student = this.students[submission.user_id];
        if (submission.submitted_at) {
          submission.submitted_at = $.parseFromISO(submission.submitted_at);
        }
        return student["assignment_" + submission.assignment_id] = submission;
      };
      Gradebook.prototype.updateSubmissionsFromExternal = function(submissions) {
        var student, submission, _i, _len;
        for (_i = 0, _len = submissions.length; _i < _len; _i++) {
          submission = submissions[_i];
          student = this.students[submission.user_id];
          this.updateSubmission(submission);
          this.multiGrid.invalidateRow(student.row);
          this.calculateStudentGrade(student);
        }
        return this.multiGrid.render();
      };
      Gradebook.prototype.cellFormatter = function(row, col, submission) {
        var assignment;
        if (!this.rows[row].loaded) {
          return this.staticCellFormatter(row, col, '');
        } else if (!(submission != null)) {
          return this.staticCellFormatter(row, col, '-');
        } else {
          assignment = this.assignments[submission.assignment_id];
          if (!(assignment != null)) {
            return this.staticCellFormatter(row, col, '');
          } else {
            if (assignment.grading_type === 'points' && assignment.points_possible) {
              return SubmissionCell.out_of.formatter(row, col, submission, assignment);
            } else {
              return (SubmissionCell[assignment.grading_type] || SubmissionCell).formatter(row, col, submission, assignment);
            }
          }
        }
      };
      Gradebook.prototype.staticCellFormatter = function(row, col, val) {
        return "<div class='cell-content gradebook-cell'>" + val + "</div>";
      };
      Gradebook.prototype.groupTotalFormatter = function(row, col, val, columnDef, student) {
        var letterGrade, percentage;
        if (val == null) {
          return '';
        }
        percentage = Math.round((val.score / val.possible) * 1000) / 10;
        if (isNaN(percentage)) {
          percentage = 0;
        }
        if (val.possible && this.options.grading_standard && columnDef.type === 'total_grade') {
          letterGrade = GradeCalculator.letter_grade(this.options.grading_standard, percentage);
        }
        return groupTotalCellTemplate({
          score: val.score,
          possible: val.possible,
          letterGrade: letterGrade,
          percentage: percentage
        });
      };
      Gradebook.prototype.calculateStudentGrade = function(student) {
        var finalOrCurrent, group, key, result, submissionsAsArray, value, _i, _len, _ref;
        if (student.loaded) {
          finalOrCurrent = this.include_ungraded_assignments ? 'final' : 'current';
          submissionsAsArray = (function() {
            var _results;
            _results = [];
            for (key in student) {
              value = student[key];
              if (key.match(/^assignment_(?!group)/)) {
                _results.push(value);
              }
            }
            return _results;
          })();
          result = INST.GradeCalculator.calculate(submissionsAsArray, this.assignmentGroups, this.options.group_weighting_scheme);
          _ref = result.group_sums;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            group = _ref[_i];
            student["assignment_group_" + group.group.id] = group[finalOrCurrent];
          }
          return student["total_grade"] = result[finalOrCurrent];
        }
      };
      Gradebook.prototype.highlightColumn = function(columnIndexOrEvent) {
        var match;
        if (isNaN(columnIndexOrEvent)) {
          match = columnIndexOrEvent.currentTarget.className.match(/c\d+/);
          if (match) {
            columnIndexOrEvent = match.toString().replace('c', '');
          }
        }
        return this.$grid.find('.slick-header-column:eq(' + columnIndexOrEvent + ')').addClass('hovered-column');
      };
      Gradebook.prototype.unhighlightColumns = function() {
        return this.$grid.find('.hovered-column').removeClass('hovered-column');
      };
      Gradebook.prototype.fixColumnReordering = function() {
        var $headers, fixupStopCallback, initHeaderDropMenus, makeOnlyAssignmentsSortable, onlyAssignmentColsSelector, originalItemsSelector, originalStopFn;
        $headers = $('#gradebook_grid').find('.slick-header-columns');
        originalItemsSelector = $headers.sortable('option', 'items');
        onlyAssignmentColsSelector = '> *:not([id*="assignment_group"]):not([id*="total_grade"])';
        (makeOnlyAssignmentsSortable = function() {
          var $notAssignments;
          $headers.sortable('option', 'items', onlyAssignmentColsSelector);
          $notAssignments = $(originalItemsSelector, $headers).not($(onlyAssignmentColsSelector, $headers));
          return $notAssignments.data('sortable-item', null);
        })();
        (initHeaderDropMenus = __bind(function() {
          return $headers.find('.gradebook-header-drop').click(__bind(function(event) {
            var $link;
            $link = $(event.target);
            if (!$link.data('gradebookHeaderMenu')) {
              $link.data('gradebookHeaderMenu', new GradebookHeaderMenu(this.assignments[$link.data('assignmentId')], $link, this));
            }
            return false;
          }, this));
        }, this))();
        originalStopFn = $headers.sortable('option', 'stop');
        return (fixupStopCallback = function() {
          return $headers.sortable('option', 'stop', function(event, ui) {
            var returnVal;
            $headers.sortable('option', 'items', originalItemsSelector);
            returnVal = originalStopFn.apply(this, arguments);
            makeOnlyAssignmentsSortable();
            initHeaderDropMenus();
            fixupStopCallback();
            return returnVal;
          });
        })();
      };
      Gradebook.prototype.minimizeColumn = function($columnHeader) {
        var colIndex, columnDef;
        colIndex = $columnHeader.index();
        columnDef = this.gradeGrid.getColumns()[colIndex];
        columnDef.cssClass = (columnDef.cssClass || '').replace(' minimized', '') + ' minimized';
        columnDef.unselectable = true;
        columnDef.unminimizedName = columnDef.name;
        columnDef.name = '';
        columnDef.minimized = true;
        this.$grid.find(".l" + colIndex).add($columnHeader).addClass('minimized');
        this.assignmentsToHide.push(columnDef.id);
        return $.store.userSet("hidden_columns_" + this.options.context_code, $.uniq(this.assignmentsToHide).join(','));
      };
      Gradebook.prototype.unminimizeColumn = function($columnHeader) {
        var colIndex, columnDef;
        colIndex = $columnHeader.index();
        columnDef = this.gradeGrid.getColumns()[colIndex];
        columnDef.cssClass = (columnDef.cssClass || '').replace(' minimized', '');
        columnDef.unselectable = false;
        columnDef.name = columnDef.unminimizedName;
        columnDef.minimized = false;
        this.$grid.find(".l" + colIndex).add($columnHeader).removeClass('minimized');
        $columnHeader.find('.slick-column-name').html(columnDef.name);
        this.assignmentsToHide = $.grep(this.assignmentsToHide, function(el) {
          return el !== columnDef.id;
        });
        return $.store.userSet("hidden_columns_" + this.options.context_code, $.uniq(this.assignmentsToHide).join(','));
      };
      Gradebook.prototype.hoverMinimizedCell = function(event) {
        var $hoveredCell, assignment, columnDef, htmlLines, offset, submission, _ref;
        $hoveredCell = $(event.currentTarget).removeClass('hover');
        columnDef = this.gradeGrid.getColumns()[$hoveredCell.index()];
        assignment = columnDef.object;
        offset = $hoveredCell.offset();
        htmlLines = [assignment.name];
        if ($hoveredCell.hasClass('slick-cell')) {
          submission = this.rows[this.gradeGrid.getCellFromEvent(event).row][columnDef.id];
          if (assignment.points_possible != null) {
            htmlLines.push("" + ((_ref = submission.score) != null ? _ref : '--') + " / " + assignment.points_possible);
          } else if (submission.score != null) {
            htmlLines.push(submission.score);
          }
          Array.prototype.push.apply(htmlLines, $.map(SubmissionCell.classesBasedOnSubmission(submission, assignment), __bind(function(c) {
            return GRADEBOOK_TRANSLATIONS["#submission_tooltip_" + c];
          }, this)));
        } else if (assignment.points_possible != null) {
          htmlLines.push(I18n.t('points_out_of', "out of %{points_possible}", {
            points_possible: assignment.points_possible
          }));
        }
        return $hoveredCell.data('tooltip', $("<span />", {
          "class": 'gradebook-tooltip',
          css: {
            left: offset.left - 15,
            top: offset.top,
            zIndex: 10000,
            display: 'block'
          },
          html: htmlLines.join('<br />')
        }).appendTo('body').css('top', function(i, top) {
          return parseInt(top) - $(this).outerHeight();
        }));
      };
      Gradebook.prototype.unhoverMinimizedCell = function(event) {
        var $tooltip;
        if ($tooltip = $(this).data('tooltip')) {
          if (event.toElement === $tooltip[0]) {
            return $tooltip.mouseleave(function() {
              return $tooltip.remove();
            });
          } else {
            return $tooltip.remove();
          }
        }
      };
      Gradebook.prototype.fixMaxHeaderWidth = function() {
        return this.$grid.find('.slick-header-columns').width(1000000);
      };
      Gradebook.prototype.onGridInit = function() {
        var grid, tooltipTexts;
        this.fixColumnReordering();
        tooltipTexts = {};
        $(this.spinner.el).remove();
        $('#gradebook_wrapper').show();
        this.$grid = grid = $('#gradebook_grid').fillWindowWithMe({
          alsoResize: '#gradebook_students_grid',
          onResize: __bind(function() {
            return this.multiGrid.resizeCanvas();
          }, this)
        }).delegate('.slick-cell', {
          'mouseenter.gradebook focusin.gradebook': this.highlightColumn,
          'mouseleave.gradebook focusout.gradebook': this.unhighlightColumns,
          'mouseenter focusin': function(event) {
            grid.find('.hover, .focus').removeClass('hover focus');
            return $(this).addClass((event.type === 'mouseenter' ? 'hover' : 'focus'));
          },
          'mouseleave focusout': function() {
            return $(this).removeClass('hover focus');
          }
        }).delegate('.gradebook-cell-comment', 'click.gradebook', __bind(function(event) {
          var data;
          event.preventDefault();
          data = $(event.currentTarget).data();
          return SubmissionDetailsDialog.open(this.assignments[data.assignmentId], this.students[data.userId], this.options);
        }, this)).delegate('.minimized', {
          'mouseenter': this.hoverMinimizedCell,
          'mouseleave': this.unhoverMinimizedCell
        });
        this.fixMaxHeaderWidth();
        $('#gradebook_grid .slick-resizable-handle').live('drag', __bind(function(e, dd) {
          return this.$grid.find('.slick-header-column').each(__bind(function(colIndex, elem) {
            var $columnHeader, columnDef;
            $columnHeader = $(elem);
            columnDef = this.gradeGrid.getColumns()[colIndex];
            if ($columnHeader.outerWidth() <= minimumAssignmentColumWidth) {
              if (!columnDef.minimized) {
                return this.minimizeColumn($columnHeader);
              }
            } else if (columnDef.minimized) {
              return this.unminimizeColumn($columnHeader);
            }
          }, this));
        }, this));
        return $(document).trigger('gridready');
      };
      Gradebook.prototype.initHeader = function() {
        var $sectionToShowMenu, $settingsMenu, $upload_modal, allSectionsText, id, s, sections, updateSectionBeingShownText, _ref;
        if (this.sections_enabled) {
          allSectionsText = I18n.t('all_sections', 'All Sections');
          sections = [
            {
              name: allSectionsText,
              checked: !this.sectionToShow
            }
          ];
          _ref = this.sections;
          for (id in _ref) {
            s = _ref[id];
            sections.push({
              name: s.name,
              id: id,
              checked: this.sectionToShow === id
            });
          }
          $sectionToShowMenu = $(sectionToShowMenuTemplate({
            sections: sections,
            scrolling: sections.length > 15
          }));
          (updateSectionBeingShownText = __bind(function() {
            return $('#section_being_shown').html(this.sectionToShow ? this.sections[this.sectionToShow].name : allSectionsText);
          }, this))();
          $('#section_to_show').after($sectionToShowMenu).show().kyleMenu({
            buttonOpts: {
              icons: {
                primary: "ui-icon-sections",
                secondary: "ui-icon-droparrow"
              }
            }
          });
          $sectionToShowMenu.bind('menuselect', __bind(function(event, ui) {
            this.sectionToShow = Number($sectionToShowMenu.find('[aria-checked="true"] input[name="section_to_show_radio"]').val()) || void 0;
            $.store[this.sectionToShow ? 'userSet' : 'userRemove']("grading_show_only_section" + this.options.context_id, this.sectionToShow);
            updateSectionBeingShownText();
            return this.buildRows();
          }, this));
        }
        $settingsMenu = $('#gradebook_settings').next();
        $.each(['show_attendance', 'include_ungraded_assignments'], __bind(function(i, setting) {
          return $settingsMenu.find("#" + setting).prop('checked', this[setting]).change(__bind(function(event) {
            this[setting] = $(event.target).is(':checked');
            $.store.userSet("" + setting + "_" + this.options.context_code, '' + this[setting]);
            if (setting === 'show_attendance') {
              this.gradeGrid.setColumns(this.getVisibleGradeGridColumns());
            }
            return this.buildRows();
          }, this));
        }, this));
        if (!($.detect(this.gradeGrid.getColumns(), function() {
          var _ref2;
          return ((_ref2 = this.object) != null ? _ref2.submission_types : void 0) === "attendance";
        }))) {
          $settingsMenu.find('#show_attendance').hide();
        }
        this.$columnArrangementTogglers = $('#gradebook-toolbar [data-arrange-columns-by]').bind('click', __bind(function(event) {
          var thingToArrangeBy;
          event.preventDefault();
          thingToArrangeBy = $(event.currentTarget).data('arrangeColumnsBy');
          return this.arrangeColumnsBy(thingToArrangeBy);
        }, this));
        this.arrangeColumnsBy('assignment_group');
        $('#gradebook_settings').show().kyleMenu({
          buttonOpts: {
            icons: {
              primary: "ui-icon-cog",
              secondary: "ui-icon-droparrow"
            }
          }
        });
        $upload_modal = null;
        return $settingsMenu.find('.gradebook_upload_link').click(__bind(function(event) {
          var locals;
          event.preventDefault();
          if (!$upload_modal) {
            locals = {
              download_gradebook_csv_url: "" + this.options.context_url + "/gradebook.csv",
              action: "" + this.options.context_url + "/gradebook_uploads",
              authenticityToken: $("#ajax_authenticity_token").text()
            };
            $upload_modal = $(gradebook_uploads_form(locals)).dialog({
              bgiframe: true,
              autoOpen: false,
              modal: true,
              width: 720,
              resizable: false
            }).fixDialogButtons().delegate('#gradebook-upload-help-trigger', 'click', function() {
              $(this).hide();
              return $('#gradebook-upload-help').show();
            });
          }
          return $upload_modal.dialog('open');
        }, this));
      };
      Gradebook.prototype.getVisibleGradeGridColumns = function() {
        var column, res, submissionType, _i, _len, _ref;
        res = [];
        _ref = this.allAssignmentColumns;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          submissionType = '' + column.object.submission_types;
          if (!(submissionType === "not_graded" || submissionType === "attendance" && !this.show_attendance)) {
            res.push(column);
          }
        }
        return res.concat(this.aggregateColumns);
      };
      Gradebook.prototype.assignmentHeaderHtml = function(assignment) {
        return columnHeaderTemplate({
          assignment: assignment,
          href: assignment.html_url,
          showPointsPossible: assignment.points_possible != null
        });
      };
      Gradebook.prototype.initGrid = function() {
        var $widthTester, assignment, columnDef, fieldName, grids, group, html, id, minWidth, options, outOfFormatter, percentage, sortRowsBy, testWidth;
        $widthTester = $('<span style="padding:10px" />').appendTo('#content');
        testWidth = function(text, minWidth, maxWidth) {
          var width;
          width = Math.max($widthTester.text(text).outerWidth(), minWidth);
          return Math.min(width, maxWidth);
        };
        this.parentColumns = [
          {
            id: 'student',
            name: I18n.t('student_name', 'Student Name'),
            field: 'display_name',
            width: 150,
            cssClass: "meta-cell",
            resizable: false,
            sortable: true
          }, {
            id: 'secondary_identifier',
            name: I18n.t('secondary_id', 'Secondary ID'),
            field: 'secondary_identifier',
            width: 100,
            cssClass: "meta-cell secondary_identifier_cell",
            resizable: false,
            sortable: true
          }
        ];
        this.allAssignmentColumns = (function() {
          var _ref, _results;
          _ref = this.assignments;
          _results = [];
          for (id in _ref) {
            assignment = _ref[id];
            outOfFormatter = assignment && assignment.grading_type === 'points' && (assignment.points_possible != null) && SubmissionCell.out_of;
            minWidth = outOfFormatter ? 70 : 90;
            fieldName = "assignment_" + id;
            columnDef = {
              id: fieldName,
              field: fieldName,
              name: this.assignmentHeaderHtml(assignment),
              object: assignment,
              formatter: this.cellFormatter,
              editor: outOfFormatter || SubmissionCell[assignment.grading_type] || SubmissionCell,
              minWidth: columnWidths.assignment.min,
              maxWidth: columnWidths.assignment.max,
              width: testWidth(assignment.name, minWidth, columnWidths.assignment.max),
              sortable: true,
              toolTip: assignment.name,
              type: 'assignment'
            };
            if (__indexOf.call(this.assignmentsToHide, fieldName) >= 0) {
              columnDef.width = 10;
              __bind(function(fieldName) {
                return $(document).bind('gridready', __bind(function() {
                  return this.minimizeColumn(this.$grid.find("[id*='" + fieldName + "']"));
                }, this)).unbind('gridready.render').bind('gridready.render', __bind(function() {
                  return this.gradeGrid.invalidate();
                }, this));
              }, this)(fieldName);
            }
            _results.push(columnDef);
          }
          return _results;
        }).call(this);
        this.aggregateColumns = (function() {
          var _ref, _results;
          _ref = this.assignmentGroups;
          _results = [];
          for (id in _ref) {
            group = _ref[id];
            html = "" + group.name;
            if (group.group_weight != null) {
              percentage = I18n.toPercentage(group.group_weight, {
                precision: 0
              });
              html += "<div class='assignment-points-possible'>\n  " + (I18n.t('percent_of_grade', "%{percentage} of grade", {
                percentage: percentage
              })) + "\n</div>";
            }
            _results.push({
              id: "assignment_group_" + id,
              field: "assignment_group_" + id,
              formatter: this.groupTotalFormatter,
              name: html,
              toolTip: group.name,
              object: group,
              minWidth: columnWidths.assignmentGroup.min,
              maxWidth: columnWidths.assignmentGroup.max,
              width: testWidth(group.name, columnWidths.assignmentGroup.min, columnWidths.assignmentGroup.max),
              cssClass: "meta-cell assignment-group-cell",
              sortable: true,
              type: 'assignment_group'
            });
          }
          return _results;
        }).call(this);
        this.aggregateColumns.push({
          id: "total_grade",
          field: "total_grade",
          formatter: this.groupTotalFormatter,
          name: "Total",
          minWidth: columnWidths.total.min,
          maxWidth: columnWidths.total.max,
          width: testWidth("Total", columnWidths.total.min, columnWidths.total.max),
          cssClass: "total-cell",
          sortable: true,
          type: 'total_grade'
        });
        $widthTester.remove();
        options = $.extend({
          enableCellNavigation: false,
          enableColumnReorder: false,
          enableAsyncPostRender: true,
          asyncPostRenderDelay: 1,
          autoEdit: true,
          rowHeight: 35,
          headerHeight: 38
        }, this.options);
        grids = [
          {
            selector: '#gradebook_students_grid',
            columns: this.parentColumns
          }, {
            selector: '#gradebook_grid',
            columns: this.getVisibleGradeGridColumns(),
            options: {
              enableCellNavigation: true,
              editable: true,
              syncColumnCellResize: true,
              enableColumnReorder: true
            }
          }
        ];
        this.multiGrid = new MultiGrid(this.rows, options, grids, 1);
        this.gradeGrid = this.multiGrid.grids[1];
        this.gradeGrid.onCellChange.subscribe(__bind(function(event, data) {
          this.calculateStudentGrade(data.item);
          return this.gradeGrid.invalidate();
        }, this));
        sortRowsBy = __bind(function(sortFn) {
          var i, student, _len, _ref;
          this.rows.sort(sortFn);
          _ref = this.rows;
          for (i = 0, _len = _ref.length; i < _len; i++) {
            student = _ref[i];
            student.row = i;
          }
          return this.multiGrid.invalidate();
        }, this);
        this.gradeGrid.onSort.subscribe(__bind(function(event, data) {
          return sortRowsBy(function(a, b) {
            var aScore, bScore, _ref, _ref2;
            aScore = (_ref = a[data.sortCol.field]) != null ? _ref.score : void 0;
            bScore = (_ref2 = b[data.sortCol.field]) != null ? _ref2.score : void 0;
            if (!aScore && aScore !== 0) {
              aScore = -99999999999;
            }
            if (!bScore && bScore !== 0) {
              bScore = -99999999999;
            }
            if (data.sortAsc) {
              return bScore - aScore;
            } else {
              return aScore - bScore;
            }
          });
        }, this));
        this.multiGrid.grids[0].onSort.subscribe(__bind(function(event, data) {
          var propertyToSortBy;
          propertyToSortBy = {
            display_name: 'sortable_name',
            secondary_identifier: 'secondary_identifier'
          }[data.sortCol.field];
          return sortRowsBy(function(a, b) {
            var res;
            res = a[propertyToSortBy] < b[propertyToSortBy] ? -1 : a[propertyToSortBy] > b[propertyToSortBy] ? 1 : 0;
            if (data.sortAsc) {
              return res;
            } else {
              return 0 - res;
            }
          });
        }, this));
        this.multiGrid.parent_grid.onKeyDown.subscribe(function() {
          return false;
        });
        return this.onGridInit();
      };
      return Gradebook;
    })();
  });
}).call(this);
