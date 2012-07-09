(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'i18n!EditAppointmentGroupDetails', 'compiled/calendar/TimeBlockList', 'jst/calendar/editAppointmentGroup', 'jst/calendar/genericSelect', 'jquery.ajaxJSON', 'jquery.disableWhileLoading', 'jquery.instructure_forms'], function($, I18n, TimeBlockList, editAppointmentGroupTemplate, genericSelectTemplate) {
    var EditAppointmentGroupDetails;
    return EditAppointmentGroupDetails = (function() {
      function EditAppointmentGroupDetails(selector, apptGroup, contextChangeCB, closeCB) {
        var appt, maxAppointmentsPerStudent, maxPerStudentCheckbox, maxPerStudentInput, timeBlocks;
        this.apptGroup = apptGroup;
        this.contextChangeCB = contextChangeCB;
        this.closeCB = closeCB;
        this.contextChange = __bind(this.contextChange, this);
        this.save = __bind(this.save, this);
        this.saveClick = __bind(this.saveClick, this);
        this.saveWithoutPublishingClick = __bind(this.saveWithoutPublishingClick, this);
        this.currentContextInfo = null;
        $(selector).html(editAppointmentGroupTemplate({
          title: this.apptGroup.title,
          contexts: this.apptGroup.contexts,
          appointment_group: this.apptGroup
        }));
        this.form = $(selector).find("form");
        this.form.find("select.context_id").change(this.contextChange).change();
        if (this.apptGroup.id) {
          this.form.attr('action', this.apptGroup.url);
          this.form.find(".context_id").val(this.apptGroup.context_code).attr('disabled', true);
          this.form.find("select.context_id").change();
          this.form.find(".group_category").attr('disabled', true);
          this.form.find(".course_section").attr('disabled', true);
          this.form.find(".group-signup-checkbox").attr('disabled', true);
          if (this.apptGroup.participant_type === 'Group') {
            this.form.find(".group-signup-checkbox").prop('checked', true);
            this.form.find(".group_category").val(this.apptGroup.sub_context_code);
          } else {
            this.form.find(".group-signup-checkbox").prop('checked', false);
            if (this.apptGroup.sub_context_code) {
              this.form.find(".course_section").val(this.apptGroup.sub_context_code);
            } else {
              this.form.find(".course_section").val("all");
            }
          }
        } else {
          this.form.attr('action', this.currentContextInfo.create_appointment_group_url);
        }
        timeBlocks = (function() {
          var _i, _len, _ref, _results;
          _ref = this.apptGroup.appointmentEvents || [];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            appt = _ref[_i];
            _results.push([appt.start, appt.end, true]);
          }
          return _results;
        }).call(this);
        this.timeBlockList = new TimeBlockList(this.form.find(".time-block-list-body"), this.form.find(".splitter"), timeBlocks);
        this.form.find('[name="slot_duration"]').change(__bind(function(e) {
          if (this.form.find('[name="autosplit_option"]').is(":checked")) {
            this.timeBlockList.split(e.target.value);
            return this.timeBlockList.render();
          }
        }, this));
        this.form.find('[name="participant_visibility"]').prop('checked', this.apptGroup.participant_visibility === 'protected');
        this.form.find(".group-signup-checkbox").change(__bind(function(jsEvent) {
          var checked;
          checked = !!jsEvent.target.checked;
          this.form.find('.per_appointment_groups_label').toggle(checked);
          this.form.find('.per_appointment_users_label').toggle(!checked);
          this.form.find(".section-signup").toggle(!checked);
          return this.form.find(".group-signup").toggle(checked);
        }, this));
        this.form.find(".group-signup-checkbox").change();
        this.form.find('[name="per_slot_option"]').change(__bind(function(jsEvent) {
          var checkbox, input;
          checkbox = jsEvent.target;
          input = this.form.find('[name="participants_per_appointment"]');
          if (checkbox.checked) {
            input.attr('disabled', false);
            if (input.val() === '') {
              return input.val('1');
            }
          } else {
            return input.attr('disabled', true);
          }
        }, this));
        if (this.apptGroup.participants_per_appointment > 0) {
          this.form.find('[name="per_slot_option"]').prop('checked', true);
          this.form.find('[name="participants_per_appointment"]').val(this.apptGroup.participants_per_appointment);
        } else {
          this.form.find('[name="participants_per_appointment"]').attr('disabled', true);
        }
        maxPerStudentInput = this.form.find('[name="max_appointments_per_participant"]');
        maxAppointmentsPerStudent = this.apptGroup.max_appointments_per_participant || 1;
        maxPerStudentInput.val(maxAppointmentsPerStudent);
        maxPerStudentCheckbox = this.form.find('#max-per-student-option');
        maxPerStudentCheckbox.change(function() {
          return maxPerStudentInput.prop('disabled', !maxPerStudentCheckbox.prop('checked'));
        });
        if (maxAppointmentsPerStudent > 0) {
          maxPerStudentCheckbox.prop('checked', true);
        } else {
          maxPerStudentInput.attr('disabled', true);
        }
        if (this.apptGroup.workflow_state === 'active') {
          this.form.find("#appointment-blocks-active-button").attr('disabled', true).prop('checked', true);
        }
      }
      EditAppointmentGroupDetails.prototype.contextInfoForCode = function(code) {
        var context, _i, _len, _ref;
        _ref = this.apptGroup.contexts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          context = _ref[_i];
          if (context.asset_string === code) {
            return context;
          }
        }
        return null;
      };
      EditAppointmentGroupDetails.prototype.saveWithoutPublishingClick = function(jsEvent) {
        jsEvent.preventDefault();
        return this.save(false);
      };
      EditAppointmentGroupDetails.prototype.saveClick = function(jsEvent) {
        jsEvent.preventDefault();
        return this.save(true);
      };
      EditAppointmentGroupDetails.prototype.save = function(publish) {
        var create, data, deferred, method, onError, onSuccess, params, range, _i, _len, _ref;
        data = this.form.getFormData({
          object_name: 'appointment_group'
        });
        create = this.apptGroup.id === void 0;
        params = {
          'appointment_group[title]': data.title,
          'appointment_group[description]': data.description,
          'appointment_group[location_name]': data.location
        };
        if (data.max_appointments_per_participant_option) {
          if (data.max_appointments_per_participant < 1) {
            $('[name="max_appointments_per_participant"]').errorBox(I18n.t('bad_max_appts', 'You must allow at least one appointment per participant'));
            return false;
          } else {
            params['appointment_group[max_appointments_per_participant]'] = data.max_appointments_per_participant;
          }
        } else {
          params['appointment_group[max_appointments_per_participant]'] = "";
        }
        params['appointment_group[new_appointments]'] = [];
        if (!this.timeBlockList.validate()) {
          return false;
        }
        _ref = this.timeBlockList.blocks();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          range = _ref[_i];
          params['appointment_group[new_appointments]'].push([$.dateToISO8601UTC($.unfudgeDateForProfileTimezone(range[0])), $.dateToISO8601UTC($.unfudgeDateForProfileTimezone(range[1]))]);
        }
        if (data.per_slot_option === '1' && data.participants_per_appointment) {
          params['appointment_group[participants_per_appointment]'] = data.participants_per_appointment;
        }
        if (publish && this.apptGroup.workflow_state !== 'active') {
          params['appointment_group[publish]'] = '1';
        }
        params['appointment_group[participant_visibility]'] = data.participant_visibility === '1' ? 'protected' : 'private';
        if (create) {
          params['appointment_group[context_code]'] = data.context_code;
          if (data.use_group_signup === '1' && data.group_category_id) {
            params['appointment_group[sub_context_code]'] = data.group_category_id;
          } else if (data.section_id && data.section_id !== 'all') {
            params['appointment_group[sub_context_code]'] = data.section_id;
          }
          params['appointment_group[min_appointments_per_participant]'] = 1;
        }
        onSuccess = __bind(function() {
          return this.closeCB(true);
        }, this);
        onError = __bind(function() {}, this);
        method = this.apptGroup.id ? 'PUT' : 'POST';
        deferred = $.ajaxJSON(this.form.attr('action'), method, params, onSuccess, onError);
        return this.form.disableWhileLoading(deferred);
      };
      EditAppointmentGroupDetails.prototype.contextChange = function(jsEvent) {
        var context, groupsInfo, sectionsInfo;
        context = $(jsEvent.target).val();
        this.currentContextInfo = this.contextInfoForCode(context);
        this.apptGroup.contextInfo = this.currentContextInfo;
        if (this.currentContextInfo === null) {
          return;
        }
        if (this.currentContextInfo.course_sections) {
          sectionsInfo = {
            cssClass: 'course_section',
            name: 'section_id',
            collection: [
              {
                id: 'all',
                name: "All Sections"
              }
            ].concat(this.currentContextInfo.course_sections)
          };
          this.form.find(".section_select").html(genericSelectTemplate(sectionsInfo));
        }
        if (!this.currentContextInfo.group_categories || this.currentContextInfo.group_categories.length === 0) {
          this.form.find(".group-signup-checkbox").attr('disabled', true).prop('checked', false).change();
        } else if (this.currentContextInfo.group_categories) {
          this.form.find(".group-signup-checkbox").attr('disabled', false);
          groupsInfo = {
            cssClass: 'group_category',
            name: 'group_category_id',
            collection: this.currentContextInfo.group_categories
          };
          this.form.find(".group_select").html(genericSelectTemplate(groupsInfo));
        }
        this.contextChangeCB(context);
        if (!this.apptGroup.id) {
          return this.form.attr('action', this.currentContextInfo.create_appointment_group_url);
        }
      };
      return EditAppointmentGroupDetails;
    })();
  });
}).call(this);
