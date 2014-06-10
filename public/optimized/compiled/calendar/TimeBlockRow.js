(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty;
  define(['i18n!calendar', 'jst/calendar/TimeBlockRow'], function(I18n, timeBlockRowTemplate) {
    var TimeBlockRow;
    return TimeBlockRow = (function() {
      function TimeBlockRow(TimeBlockList, data) {
        this.TimeBlockList = TimeBlockList;
        if (data == null) {
          data = {};
        }
        this.focus = __bind(this.focus, this);
        this.remove = __bind(this.remove, this);
        this.locked = data.locked;
        this.$row = $(timeBlockRowTemplate(data)).bind({
          focusin: this.focus,
          focusout: __bind(function() {
            return this.$row.removeClass('focused');
          }, this)
        });
        this.inputs = {};
        if (!this.locked) {
          this.$row.find('.date_field').date_field();
          this.$row.find('.time_field').time_field();
        }
        $.each(this.inputNames, __bind(function(i, inputName) {
          this.inputs[inputName] = {};
          this.inputs[inputName].$el = this.$row.find("input[name='" + inputName + "']").change(__bind(function() {
            return this.handleInputChange(inputName);
          }, this));
          this.updateModel(inputName);
          if (this.locked) {
            return this.inputs[inputName].valid = true;
          }
        }, this));
        this.$row.find('.delete-block-link').click(this.remove);
      }
      TimeBlockRow.prototype.inputNames = ['date', 'start_time', 'end_time'];
      TimeBlockRow.prototype.updateModel = function(inputName) {
        return this.inputs[inputName].val = $.trim(this.inputs[inputName].$el.val());
      };
      TimeBlockRow.prototype.handleInputChange = function(inputName) {
        this.updateModel(inputName);
        this.validateField(inputName);
        this.validate();
      };
      TimeBlockRow.prototype.updateDom = function(inputName, val) {
        this.inputs[inputName].val = val;
        return this.inputs[inputName].$el.val(val);
      };
      TimeBlockRow.prototype.remove = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        this.$row.remove();
        return this.TimeBlockList.rowRemoved(this);
      };
      TimeBlockRow.prototype.focus = function() {
        this.$row.addClass('focused');
        if (this.$row.is(':last-child')) {
          return this.$row.parents('.time-block-list-body-wrapper').scrollTop(9999);
        }
      };
      TimeBlockRow.prototype.validateField = function(inputName) {
        var $suggest, invalidDate;
        $suggest = this.inputs[inputName].$el.nextAll('.datetime_suggest');
        invalidDate = $suggest.hasClass('invalid_datetime');
        if (!invalidDate) {
          this.updateDom(inputName, $suggest.text());
        }
        this.inputs[inputName].$el.toggleClass('error', invalidDate);
        return this.inputs[inputName].valid = !invalidDate;
      };
      TimeBlockRow.prototype.validate = function() {
        var input, name, testDate, valid, _ref, _ref2;
        if (this.locked) {
          return true;
        }
        valid = true;
        _ref = this.inputs;
        for (name in _ref) {
          if (!__hasProp.call(_ref, name)) continue;
          input = _ref[name];
          if ((_ref2 = input.$el.data('associated_error_box')) != null) {
            _ref2.remove();
          }
          if (!this.validateField(name)) {
            valid = false;
          }
        }
        if (valid && !this.blank()) {
          if (this.validDate() && this.inputs.end_time.val && this.endAt() < new Date()) {
            valid = false;
            this.inputs.end_time.$el.addClass('error').errorBox(I18n.t('ends_in_past_error', 'You cannot create an appointment slot that ends in the past'));
          }
          if (this.inputs.start_time.val && this.inputs.end_time.val) {
            testDate = this.validDate() || 'Today';
            if (this.timeToDate(testDate, this.inputs.end_time.val) <= this.timeToDate(testDate, this.inputs.start_time.val)) {
              valid = false;
              this.inputs.start_time.$el.addClass('error').errorBox(I18n.t('end_before_start_error', 'Start time must be before end time'));
            }
          }
        }
        return this.blank() || valid;
      };
      TimeBlockRow.prototype.timeToDate = function(date, time) {
        return Date.parse(date + ' ' + time);
      };
      TimeBlockRow.prototype.endAt = function() {
        if (this.validDate()) {
          return this.timeToDate(this.inputs.date.val, this.inputs.end_time.val);
        }
      };
      TimeBlockRow.prototype.startAt = function() {
        if (this.validDate()) {
          return this.timeToDate(this.inputs.date.val, this.inputs.start_time.val);
        }
      };
      TimeBlockRow.prototype.validDate = function() {
        if (this.inputs.date.val && this.inputs.date.valid) {
          return this.inputs.date.val;
        }
      };
      TimeBlockRow.prototype.getData = function() {
        return [this.startAt(), this.endAt(), !!this.locked];
      };
      TimeBlockRow.prototype.blank = function() {
        return this.inputs.date.val === '' && this.inputs.start_time.val === '' && this.inputs.end_time.val === '';
      };
      return TimeBlockRow;
    })();
  });
}).call(this);
