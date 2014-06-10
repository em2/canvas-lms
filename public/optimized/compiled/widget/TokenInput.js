(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['jquery', 'compiled/widget/TokenSelector', 'jquery.instructure_jquery_patches', 'jquery.instructure_misc_plugins'], function($, TokenSelector) {
    var TokenInput;
    TokenInput = (function() {
      function TokenInput($node, options) {
        var type, _ref;
        this.$node = $node;
        this.options = options;
        this.$node.data('token_input', this);
        this.$fakeInput = $('<div />').css('font-family', this.$node.css('font-family')).insertAfter(this.$node).addClass('token_input').click(__bind(function() {
          return this.$input.focus();
        }, this));
        this.nodeName = this.$node.attr('name');
        this.$node.removeAttr('name').hide().change(__bind(function() {
          this.$tokens.html('');
          return typeof this.change === "function" ? this.change(this.tokenValues()) : void 0;
        }, this));
        this.added = this.options.added;
        this.$placeholder = $('<span />');
        this.$placeholder.text(this.options.placeholder);
        if (this.options.placeholder) {
          this.$placeholder.appendTo(this.$fakeInput);
        }
        this.$scroller = $('<div />').appendTo(this.$fakeInput);
        this.$tokens = $('<ul />').appendTo(this.$scroller);
        this.$tokens.click(__bind(function(e) {
          var $close, $token;
          if ($token = $(e.target).closest('li')) {
            $close = $(e.target).closest('a');
            if ($close.length) {
              $token.remove();
              return typeof this.change === "function" ? this.change(this.tokenValues()) : void 0;
            }
          }
        }, this));
        this.$tokens.maxTokenWidth = __bind(function() {
          var _ref;
          return (parseInt(this.$tokens.css('width').replace('px', '')) - ((_ref = this.options.tokenWrapBuffer) != null ? _ref : 150)) + 'px';
        }, this);
        this.$tokens.resizeTokens = __bind(function(tokens) {
          return tokens.find('div.ellipsis').css('max-width', this.$tokens.maxTokenWidth());
        }, this);
        $(window).resize(__bind(function() {
          return this.$tokens.resizeTokens(this.$tokens);
        }, this));
        this.$input = $('<input />').appendTo(this.$scroller).css('width', '20px').css('font-size', this.$fakeInput.css('font-size')).autoGrowInput({
          comfortZone: 20
        }).focus(__bind(function() {
          this.$placeholder.hide();
          this.active = true;
          return this.$fakeInput.addClass('active');
        }, this)).blur(__bind(function() {
          this.active = false;
          return setTimeout(__bind(function() {
            var _ref;
            if (!this.active) {
              this.$fakeInput.removeClass('active');
              this.$placeholder.showIf(this.val() === '' && !this.$tokens.find('li').length);
              return (_ref = this.selector) != null ? typeof _ref.blur === "function" ? _ref.blur() : void 0 : void 0;
            }
          }, this), 50);
        }, this)).keydown(__bind(function(e) {
          return this.inputKeyDown(e);
        }, this)).keyup(__bind(function(e) {
          return this.inputKeyUp(e);
        }, this));
        if (this.options.selector) {
          type = (_ref = this.options.selector.type) != null ? _ref : TokenSelector;
          delete this.options.selector.type;
          if (this.browser = this.options.selector.browser) {
            delete this.options.selector.browser;
            $('<a class="browser">browse</a>').click(__bind(function() {
              if (this.selector.browse(this.browser.data)) {
                return this.$fakeInput.addClass('browse');
              }
            }, this)).prependTo(this.$fakeInput);
            this.$fakeInput.addClass('browsable');
          }
          this.selector = new type(this, this.$node.attr('finder_url'), this.options.selector);
        }
        this.baseExclude = [];
        this.resize();
      }
      TokenInput.prototype.resize = function() {
        return this.$fakeInput.css('width', this.$node.css('width'));
      };
      TokenInput.prototype.addToken = function(data) {
        var $close, $text, $token, id, newToken, text, val, _ref, _ref2;
        val = (_ref = data != null ? data.value : void 0) != null ? _ref : this.val();
        id = 'token_' + val;
        $token = this.$tokens.find('#' + id);
        newToken = $token.length === 0;
        if (newToken) {
          $token = $('<li />');
          text = (_ref2 = data != null ? data.text : void 0) != null ? _ref2 : this.val();
          $token.attr('id', id);
          $text = $('<div />').addClass('ellipsis');
          $text.attr('title', text);
          $text.text(text);
          $token.append($text);
          $close = $('<a />');
          $token.append($close);
          $token.append($('<input />').attr('type', 'hidden').attr('name', this.nodeName + '[]').val(val));
          this.$tokens.resizeTokens($token);
          this.$tokens.append($token);
        }
        if (!(data != null ? data.noClear : void 0)) {
          this.val('');
        }
        this.$placeholder.hide();
        if (data) {
          if (typeof this.added === "function") {
            this.added(data.data, $token, newToken);
          }
        }
        if (typeof this.change === "function") {
          this.change(this.tokenValues());
        }
        return this.reposition();
      };
      TokenInput.prototype.hasToken = function(data) {
        var _ref;
        return this.$tokens.find('#token_' + ((_ref = data != null ? data.value : void 0) != null ? _ref : data)).length > 0;
      };
      TokenInput.prototype.removeToken = function(data) {
        var id, _ref;
        id = 'token_' + ((_ref = data != null ? data.value : void 0) != null ? _ref : data);
        this.$tokens.find('#' + id).remove();
        if (typeof this.change === "function") {
          this.change(this.tokenValues());
        }
        return this.reposition();
      };
      TokenInput.prototype.removeLastToken = function(data) {
        this.$tokens.find('li').last().remove();
        if (typeof this.change === "function") {
          this.change(this.tokenValues());
        }
        return this.reposition();
      };
      TokenInput.prototype.reposition = function() {
        var _ref;
        if ((_ref = this.selector) != null) {
          _ref.reposition();
        }
        return this.$scroller.scrollTop(this.$scroller.prop("scrollHeight"));
      };
      TokenInput.prototype.inputKeyDown = function(e) {
        var _ref, _ref2, _ref3;
        this.keyUpAction = false;
        if (this.selector) {
          if ((_ref = this.selector) != null ? _ref.captureKeyDown(e) : void 0) {
            e.preventDefault();
            return false;
          } else {
            this.$fakeInput.removeClass('browse');
          }
        } else if ((_ref2 = (_ref3 = e.which, __indexOf.call(this.delimiters, _ref3) >= 0)) != null ? _ref2 : []) {
          this.keyUpAction = this.addToken;
          e.preventDefault();
          return false;
        }
        return true;
      };
      TokenInput.prototype.tokenValues = function() {
        var input, _i, _len, _ref, _results;
        _ref = this.$tokens.find('input');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          input = _ref[_i];
          _results.push(input.value);
        }
        return _results;
      };
      TokenInput.prototype.inputKeyUp = function(e) {
        this.reposition();
        return typeof this.keyUpAction === "function" ? this.keyUpAction() : void 0;
      };
      TokenInput.prototype.bottomOffset = function() {
        var offset;
        offset = this.$fakeInput.offset();
        offset.top += this.$fakeInput.height() + 2;
        return offset;
      };
      TokenInput.prototype.focus = function() {
        return this.$input.focus();
      };
      TokenInput.prototype.val = function(val) {
        if (val != null) {
          if (val !== this.$input.val()) {
            this.$input.val(val).change();
            return this.reposition();
          }
        } else {
          return this.$input.val();
        }
      };
      TokenInput.prototype.caret = function() {
        var end, range, start, val;
        if (this.$input[0].selectionStart != null) {
          start = this.$input[0].selectionStart;
          end = this.$input[0].selectionEnd;
        } else {
          val = this.val();
          range = document.selection.createRange().duplicate();
          range.moveEnd("character", val.length);
          start = range.text === "" ? val.length : val.lastIndexOf(range.text);
          range = document.selection.createRange().duplicate();
          range.moveStart("character", -val.length);
          end = range.text.length;
        }
        if (start === end) {
          return start;
        } else {
          return -1;
        }
      };
      TokenInput.prototype.selectorClosed = function() {
        return this.$fakeInput.removeClass('browse');
      };
      return TokenInput;
    })();
    return $.fn.tokenInput = function(options) {
      return this.each(function() {
        return new TokenInput($(this), $.extend(true, {}, options));
      });
    };
  });
}).call(this);
