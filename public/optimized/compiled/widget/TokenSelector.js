(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['jquery', 'jquery.ajaxJSON', 'jquery.instructure_jquery_patches', 'jquery.instructure_misc_helpers', 'jquery.disableWhileLoading', 'compiled/jquery/scrollIntoView'], function($) {
    return (function() {
      function _Class(input, url, options) {
        this.input = input;
        this.url = url;
        this.options = options != null ? options : {};
        this.close = __bind(this.close, this);
        this.stack = [];
        this.fetchListAjaxRequests = [];
        this.queryCache = {};
        this.$container = $('<div />').addClass('autocomplete_menu');
        if (this.options.showToggles) {
          this.$container.addClass('with-toggles');
        }
        this.$menu = $('<div />').append(this.$list = this.newList());
        this.$container.append($('<div />').append(this.$menu));
        this.$container.css('top', 0).css('left', 0);
        this.mode = 'input';
        $('body').append(this.$container);
        this.reposition = __bind(function() {
          var offset;
          offset = this.input.bottomOffset();
          this.$container.css('top', offset.top);
          return this.$container.css('left', offset.left);
        }, this);
        $(window).resize(this.reposition);
        this.close();
      }
      _Class.prototype.abortRunningRequests = function() {
        var req, _i, _len, _ref;
        _ref = this.fetchListAjaxRequests;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          req = _ref[_i];
          req.abort();
        }
        return this.fetchListAjaxRequests = [];
      };
      _Class.prototype.browse = function(data) {
        if (!this.uiLocked) {
          this.input.val('');
          this.close();
          this.fetchList({
            data: data
          });
          return true;
        }
      };
      _Class.prototype.newList = function() {
        var $list;
        $list = $('<div class="list"><ul class="heading"></ul><ul></ul></div>');
        $list.find('ul').mousemove(__bind(function(e) {
          var $li;
          if (this.uiLocked) {
            return;
          }
          $li = $(e.target).closest('li');
          if (!$li.hasClass('selectable')) {
            $li = null;
          }
          return this.select($li);
        }, this)).mousedown(__bind(function(e) {
          return setTimeout(__bind(function() {
            return this.input.focus();
          }, this), 0);
        }, this)).click(__bind(function(e) {
          var $li;
          if (this.uiLocked) {
            return;
          }
          $li = $(e.target).closest('li');
          if (!$li.hasClass('selectable')) {
            $li = null;
          }
          this.select($li);
          if (this.selection) {
            if ($(e.target).closest('a.expand').length) {
              if (this.selectionExpanded()) {
                this.collapse();
              } else {
                this.expandSelection();
              }
            } else if (this.selectionToggleable() && $(e.target).closest('a.toggle').length) {
              this.toggleSelection();
            } else {
              if (this.selectionExpanded()) {
                this.collapse();
              } else if (this.selectionExpandable()) {
                this.expandSelection();
              } else {
                this.toggleSelection(true);
                this.clear();
                this.close();
              }
            }
          }
          return this.input.focus();
        }, this));
        $list.body = $list.find('ul').last();
        return $list;
      };
      _Class.prototype.captureKeyDown = function(e) {
        var _ref, _ref2;
        if (this.uiLocked) {
          return true;
        }
        switch ((_ref = (_ref2 = e.originalEvent) != null ? _ref2.keyIdentifier : void 0) != null ? _ref : e.which) {
          case 'Backspace':
          case 'U+0008':
          case 8:
            if (this.input.val() === '') {
              if (this.listExpanded()) {
                this.collapse();
              } else if (this.$menu.is(":visible")) {
                this.close();
              } else {
                this.input.removeLastToken();
              }
              return true;
            }
            break;
          case 'Tab':
          case 'U+0009':
          case 9:
            if (this.selection && (this.selectionToggleable() || !this.selectionExpandable())) {
              this.toggleSelection(true);
            }
            this.clear();
            this.close();
            if (this.selection) {
              return true;
            }
            break;
          case 'Enter':
          case 13:
            if (this.selectionExpanded()) {
              this.collapse();
              return true;
            } else if (this.selectionExpandable() && !this.selectionToggleable()) {
              this.expandSelection();
              return true;
            } else if (this.selection) {
              this.toggleSelection(true);
              this.clear();
            }
            this.close();
            return true;
          case 'Shift':
          case 16:
            return false;
          case 'Esc':
          case 'U+001B':
          case 27:
            if (this.$menu.is(":visible")) {
              this.close();
              return true;
            } else {
              return false;
            }
            break;
          case 'U+0020':
          case 32:
            if (this.selectionToggleable() && this.mode === 'menu') {
              this.toggleSelection();
              return true;
            }
            break;
          case 'Left':
          case 37:
            if (this.listExpanded() && this.input.caret() === 0) {
              if (this.selectionExpanded() || this.input.val() === '') {
                this.collapse();
              } else {
                this.select(this.$list.find('li').first());
              }
              return true;
            }
            break;
          case 'Up':
          case 38:
            this.selectPrev();
            return true;
          case 'Right':
          case 39:
            if (this.input.caret() === this.input.val().length && this.expandSelection()) {
              return true;
            }
            break;
          case 'Down':
          case 40:
            this.selectNext();
            return true;
          case 'U+002B':
          case 187:
          case 107:
            if (this.selectionToggleable() && this.mode === 'menu') {
              this.toggleSelection(true);
              return true;
            }
            break;
          case 'U+002D':
          case 189:
          case 109:
            if (this.selectionToggleable() && this.mode === 'menu') {
              this.toggleSelection(false);
              return true;
            }
        }
        this.mode = 'input';
        this.fetchList();
        return false;
      };
      _Class.prototype.fetchList = function(options, uiLocked) {
        if (options == null) {
          options = {};
        }
        this.uiLocked = uiLocked != null ? uiLocked : false;
        clearTimeout(this.timeout);
        return this.timeout = setTimeout(__bind(function() {
          var postData, thisQuery, _ref;
          postData = this.preparePost((_ref = options.data) != null ? _ref : {});
          thisQuery = JSON.stringify(postData);
          if (postData.search === '' && !this.listExpanded() && !options.data) {
            this.uiLocked = false;
            this.close();
            return;
          }
          if (thisQuery === this.lastAppliedQuery) {
            this.uiLocked = false;
            return;
          } else if (this.queryCache[thisQuery]) {
            this.lastAppliedQuery = thisQuery;
            this.lastSearch = postData.search;
            this.abortRunningRequests();
            this.renderList(this.queryCache[thisQuery], options, postData);
            return;
          }
          return this.fetchListAjaxRequests.push(this.load($.ajaxJSON(this.url, 'POST', $.extend({}, postData), __bind(function(data) {
            var _ref2;
            this.queryCache[thisQuery] = data;
            if (JSON.stringify(this.preparePost((_ref2 = options.data) != null ? _ref2 : {})) === thisQuery) {
              this.lastAppliedQuery = thisQuery;
              this.lastSearch = postData.search;
              if (this.$menu.is(":visible")) {
                return this.renderList(data, options, postData);
              }
            } else {
              return this.uiLocked = false;
            }
          }, this), __bind(function(data) {
            return this.uiLocked = false;
          }, this))));
        }, this), 100);
      };
      _Class.prototype.addByUserId = function(userId, fromConversationId) {
        var success;
        success = __bind(function(data) {
          var user;
          this.close();
          user = data[0];
          if (user) {
            return this.input.addToken({
              value: user.id,
              text: user.name,
              data: user
            });
          }
        }, this);
        return this.load($.ajaxJSON(this.url, 'POST', {
          user_id: userId,
          from_conversation_id: fromConversationId
        }, success, this.close));
      };
      _Class.prototype.open = function() {
        this.$container.show();
        return this.reposition();
      };
      _Class.prototype.close = function() {
        var $list, $selection, i, query, search, _len, _ref, _ref2;
        this.uiLocked = false;
        this.$container.hide();
        delete this.lastAppliedQuery;
        _ref = this.stack;
        for (i = 0, _len = _ref.length; i < _len; i++) {
          _ref2 = _ref[i], $selection = _ref2[0], $list = _ref2[1], query = _ref2[2], search = _ref2[3];
          this.$list.remove();
          this.$list = $list.css('height', 'auto');
        }
        this.$list.find('ul').html('');
        this.stack = [];
        this.$menu.css('left', 0);
        this.select(null);
        return this.input.selectorClosed();
      };
      _Class.prototype.clear = function() {
        return this.input.val('');
      };
      _Class.prototype.blur = function() {
        return this.close();
      };
      _Class.prototype.listExpanded = function() {
        if (this.stack.length) {
          return true;
        } else {
          return false;
        }
      };
      _Class.prototype.selectionExpanded = function() {
        var _ref, _ref2;
        return (_ref = (_ref2 = this.selection) != null ? _ref2.hasClass('expanded') : void 0) != null ? _ref : false;
      };
      _Class.prototype.selectionExpandable = function() {
        var _ref, _ref2;
        return (_ref = (_ref2 = this.selection) != null ? _ref2.hasClass('expandable') : void 0) != null ? _ref : false;
      };
      _Class.prototype.selectionToggleable = function($node) {
        var _ref;
        if ($node == null) {
          $node = this.selection;
        }
        return ((_ref = $node != null ? $node.hasClass('toggleable') : void 0) != null ? _ref : false) && !this.selectionExpanded();
      };
      _Class.prototype.expandSelection = function() {
        if (!(this.selectionExpandable() && !this.selectionExpanded())) {
          return false;
        }
        this.stack.push([this.selection, this.$list, this.lastAppliedQuery, this.lastSearch]);
        this.clear();
        this.$menu.css('width', ((this.stack.length + 1) * 100) + '%');
        return this.fetchList({
          expand: true
        }, true);
      };
      _Class.prototype.collapse = function() {
        var $list, $selection, _ref;
        if (!this.listExpanded()) {
          return false;
        }
        _ref = this.stack.pop(), $selection = _ref[0], $list = _ref[1], this.lastAppliedQuery = _ref[2], this.lastSearch = _ref[3];
        this.uiLocked = true;
        $list.css('height', 'auto');
        return this.$menu.animate({
          left: '+=' + this.$menu.parent().css('width')
        }, 'fast', __bind(function() {
          this.input.val(this.lastSearch);
          this.$list.remove();
          this.$list = $list;
          this.select($selection);
          return this.uiLocked = false;
        }, this));
      };
      _Class.prototype.toggleSelection = function(state, $node, toggleOnly) {
        var id, _ref;
        if ($node == null) {
          $node = this.selection;
        }
        if (toggleOnly == null) {
          toggleOnly = false;
        }
        if (!((state != null) || this.selectionToggleable($node))) {
          return false;
        }
        id = $node.data('id');
        if (state == null) {
          state = !$node.hasClass('on');
        }
        if (state) {
          if (this.selectionToggleable($node) && !toggleOnly) {
            $node.addClass('on');
          }
          this.input.addToken({
            value: id,
            text: (_ref = $node.data('text')) != null ? _ref : $node.text(),
            noClear: true,
            data: $node.data('user_data')
          });
        } else {
          if (!toggleOnly) {
            $node.removeClass('on');
          }
          this.input.removeToken({
            value: id
          });
        }
        if (!toggleOnly) {
          return this.updateSelectAll($node);
        }
      };
      _Class.prototype.updateSelectAll = function($node, offset) {
        var $list, $nodes, $onNodes, $parentNode, $selectAll, selectAllToggled;
        if (offset == null) {
          offset = 0;
        }
        selectAllToggled = $node.data('user_data').selectAll;
        $list = offset ? this.stack[this.stack.length - offset][1] : this.$list;
        $selectAll = $list.selectAll;
        if (!$selectAll) {
          return;
        }
        $nodes = $list.body.find('li.toggleable').not($selectAll);
        if (selectAllToggled) {
          if ($selectAll.hasClass('on')) {
            $nodes.addClass('on').each(__bind(function(i, node) {
              return this.toggleSelection(false, $(node), true);
            }, this));
          } else {
            $nodes.removeClass('on').each(__bind(function(i, node) {
              return this.toggleSelection(false, $(node), true);
            }, this));
          }
        } else {
          $onNodes = $nodes.filter('.on');
          if ($onNodes.length < $nodes.length && $selectAll.hasClass('on')) {
            $selectAll.removeClass('on');
            this.toggleSelection(false, $selectAll, true);
            $onNodes.each(__bind(function(i, node) {
              return this.toggleSelection(true, $(node), true);
            }, this));
          } else if ($onNodes.length === $nodes.length && !$selectAll.hasClass('on')) {
            $selectAll.addClass('on');
            this.toggleSelection(true, $selectAll, true);
            $onNodes.each(__bind(function(i, node) {
              return this.toggleSelection(false, $(node), true);
            }, this));
          }
        }
        if (offset < this.stack.length) {
          offset++;
          $parentNode = this.stack[this.stack.length - offset][0];
          if (this.selectionToggleable($parentNode)) {
            if ($selectAll.hasClass('on')) {
              $parentNode.addClass('on');
            } else {
              $parentNode.removeClass('on');
            }
            return this.updateSelectAll($parentNode, offset);
          }
        }
      };
      _Class.prototype.select = function($node, preserveMode) {
        var _ref, _ref2;
        if (preserveMode == null) {
          preserveMode = false;
        }
        if (($node != null ? $node[0] : void 0) === ((_ref = this.selection) != null ? _ref[0] : void 0)) {
          return;
        }
        if ((_ref2 = this.selection) != null) {
          _ref2.removeClass('active');
        }
        this.selection = ($node != null ? $node.length : void 0) ? ($node.addClass('active'), $node.scrollIntoView({
          ignore: {
            border: true
          }
        }), $node) : null;
        if (!preserveMode) {
          return this.mode = ($node ? 'menu' : 'input');
        }
      };
      _Class.prototype.selectNext = function(preserveMode) {
        var _ref;
        if (preserveMode == null) {
          preserveMode = false;
        }
        this.select(this.selection ? this.selection.next().length ? this.selection.next() : this.selection.parent('ul').next().length ? this.selection.parent('ul').next().find('li').first() : null : this.$list.find('li:first'), preserveMode);
        if ((_ref = this.selection) != null ? _ref.hasClass('message') : void 0) {
          return this.selectNext(preserveMode);
        }
      };
      _Class.prototype.selectPrev = function() {
        var _ref, _ref2;
        this.select(this.selection ? ((_ref = this.selection) != null ? _ref.prev().length : void 0) ? this.selection.prev() : this.selection.parent('ul').prev().length ? this.selection.parent('ul').prev().find('li').last() : null : this.$list.find('li:last'));
        if ((_ref2 = this.selection) != null ? _ref2.hasClass('message') : void 0) {
          return this.selectPrev();
        }
      };
      _Class.prototype.populateRow = function($node, data, options) {
        if (options == null) {
          options = {};
        }
        if (this.options.populator) {
          this.options.populator(this, $node, data, options);
        } else {
          $node.data('id', data.text);
          $node.text(data.text);
        }
        if (options.first) {
          $node.addClass('first');
        }
        if (options.last) {
          return $node.addClass('last');
        }
      };
      _Class.prototype.load = function(deferred) {
        if (!this.$menu.is(":visible")) {
          this.open();
          this.$list.find('ul').last().append($('<li class="message first last"></li>'));
        }
        this.$list.disableWhileLoading(deferred);
        return deferred;
      };
      _Class.prototype.renderList = function(data, options, postData) {
        var $body, $heading, $li, $list, $message, $uls, ancestor, ancestors, i, parent, row, _base, _base2, _len, _ref, _ref2, _ref3;
        if (options == null) {
          options = {};
        }
        if (postData == null) {
          postData = {};
        }
        this.open();
        if (options.expand) {
          $list = this.newList();
        } else {
          $list = this.$list;
        }
        $list.selectAll = null;
        this.selection = null;
        $uls = $list.find('ul');
        $uls.html('');
        $heading = $uls.first();
        $body = $uls.last();
        if (data.length) {
          parent = this.stack.length ? this.stack[this.stack.length - 1][0] : null;
          ancestors = this.stack.length ? (function() {
            var _i, _len, _ref, _results;
            _ref = this.stack;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              ancestor = _ref[_i];
              _results.push(ancestor[0].data('id'));
            }
            return _results;
          }).call(this) : [];
          if (!data.prepared) {
            if (typeof (_base = this.options).preparer === "function") {
              _base.preparer(postData, data, parent);
            }
            data.prepared = true;
          }
          for (i = 0, _len = data.length; i < _len; i++) {
            row = data[i];
            $li = $('<li />').addClass('selectable');
            this.populateRow($li, row, {
              level: this.stack.length,
              first: i === 0,
              last: i === data.length - 1,
              parent: parent,
              ancestors: ancestors
            });
            if (row.selectAll) {
              $list.selectAll = $li;
            }
            if ($li.hasClass('toggleable') && this.input.hasToken($li.data('id'))) {
              $li.addClass('on');
            }
            $body.append($li);
          }
          if (((_ref = $list.selectAll) != null ? typeof _ref.hasClass === "function" ? _ref.hasClass('on') : void 0 : void 0) || this.stack.length && (typeof (_base2 = this.stack[this.stack.length - 1][0]).hasClass === "function" ? _base2.hasClass('on') : void 0)) {
            $list.body.find('li.toggleable').addClass('on');
          }
        } else {
          $message = $('<li class="message first last"></li>');
          $message.text((_ref2 = (_ref3 = this.options.messages) != null ? _ref3.noResults : void 0) != null ? _ref2 : '');
          $body.append($message);
        }
        if (this.listExpanded()) {
          $li = this.stack[this.stack.length - 1][0].clone();
          $li.addClass('expanded').removeClass('active first last');
          $heading.append($li).show();
        } else {
          $heading.hide();
        }
        if (options.expand) {
          $list.insertAfter(this.$list);
          return this.$menu.animate({
            left: '-=' + this.$menu.parent().css('width')
          }, 'fast', __bind(function() {
            this.$list.animate({
              height: '1px'
            }, 'fast', __bind(function() {
              return this.uiLocked = false;
            }, this));
            this.$list = $list;
            return this.selectNext(true);
          }, this));
        } else {
          if (!options.loading) {
            this.selectNext(true);
          }
          return this.uiLocked = false;
        }
      };
      _Class.prototype.preparePost = function(data) {
        var postData, _base, _ref, _ref2;
        postData = $.extend({}, (_ref = this.options.baseData) != null ? _ref : {}, data, {
          search: this.input.val().replace(/^\s+|\s+$/g, "")
        });
        postData.exclude = this.input.baseExclude.concat(this.stack.length ? [] : this.input.tokenValues());
        if (this.listExpanded()) {
          postData.context = this.stack[this.stack.length - 1][0].data('id');
        }
        if ((_ref2 = postData.per_page) == null) {
          postData.per_page = typeof (_base = this.options).limiter === "function" ? _base.limiter({
            level: this.stack.length
          }) : void 0;
        }
        return postData;
      };
      return _Class;
    })();
  });
}).call(this);
