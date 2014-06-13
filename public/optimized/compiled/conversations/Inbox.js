(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['i18n!conversations', 'jquery', 'str/htmlEscape', 'compiled/conversations/introSlideshow', 'compiled/widget/TokenInput', 'compiled/str/TextHelper', 'compiled/jquery/scrollIntoView', 'jquery.ajaxJSON', 'jquery.instructure_date_and_time', 'jquery.instructure_forms', 'jquery.instructure_jquery_patches', 'jquery.instructure_misc_helpers', 'jquery.disableWhileLoading', 'jquery.rails_flash_notifications', 'media_comments', 'vendor/jquery.ba-hashchange', 'vendor/jquery.elastic', 'vendor/jquery.pageless', 'jqueryui/position'], function(I18n, $, htmlEscape, introSlideshow, TokenInput, TextHelper) {
    return (function() {
      function _Class(options) {
        this.options = options;
        this.initializeMenus = __bind(this.initializeMenus, this);
        this.currentUser = this.options.USER;
        this.contexts = this.options.CONTEXTS;
        this.scope = this.options.SCOPE;
        this.userCache = {};
        this.userCache[this.currentUser.id] = this.currentUser;
        $(__bind(function() {
          return this.render();
        }, this));
      }
      _Class.prototype.render = function() {
        this.$inbox = $('#inbox');
        this.minHeight = parseInt(this.$inbox.css('min-height').replace('px', ''));
        this.$conversations = $('#conversations');
        this.$conversationList = this.$conversations.find("ul.conversations");
        this.$messages = $('#messages');
        this.$messageList = this.$messages.find('ul.messages');
        this.initializeHelp();
        this.initializeForms();
        this.initializeMenus();
        this.initializeMessageActions();
        this.initializeConversationActions();
        this.initializeTemplates();
        this.initializeTokenInputs();
        this.initializeConversationsPane(this.options.INITIAL_CONVERSATIONS);
        this.initializeAutoResize();
        this.initializeHashChange();
        if (this.options.SHOW_INTRO) {
          return introSlideshow();
        }
      };
      _Class.prototype.showMessageForm = function() {
        var newMessage;
        newMessage = !(this.$selectedConversation != null);
        this.$form.find('#recipient_info').showIf(newMessage);
        this.$form.find('#group_conversation_info').hide();
        $('#action_compose_message').toggleClass('active', newMessage);
        if (newMessage) {
          this.$form.find('.audience').html(I18n.t('headings.new_message', 'New Message'));
          this.$form.addClass('new');
          this.$form.find('#action_add_recipients').hide();
          this.$form.attr({
            action: '/conversations'
          });
        } else {
          this.buildFormAudience();
          this.$form.removeClass('new');
          this.$form.find('#action_add_recipients').showIf(!this.$selectedConversation.hasClass('private'));
          this.$form.attr({
            action: this.$selectedConversation.find('a.details_link').attr('add_url')
          });
        }
        this.resetMessageForm();
        this.$form.find('#user_note_info').hide().find('input').attr('checked', false);
        return this.$form.show().find(':input:visible:first').focus();
      };
      _Class.prototype.resetMessageForm = function() {
        if (this.$selectedConversation != null) {
          this.buildFormAudience();
        }
        this.$form.find('input[name!=authenticity_token], textarea').not(":checkbox").val('').change();
        this.$form.find(".attachment:visible").remove();
        this.$form.find(".media_comment").hide();
        this.$form.find("#action_media_comment").show();
        return this.resize();
      };
      _Class.prototype.buildFormAudience = function() {
        var $context, $elem, $formAudience, elem, _i, _len, _results;
        $formAudience = this.$form.find('.audience');
        $formAudience.html(this.$selectedConversation.find('.audience').html());
        $formAudience.find('em').attr('id', 'form_contexts');
        $context = $formAudience.find('.context');
        _results = [];
        for (_i = 0, _len = $context.length; _i < _len; _i++) {
          elem = $context[_i];
          $elem = $(elem);
          _results.push($elem.replaceWith("<a href='" + (htmlEscape($elem.data('url'))) + "'>" + (htmlEscape($elem.html())) + "</a>"));
        }
        return _results;
      };
      _Class.prototype.parseQueryString = function(queryString) {
        var hash, key, parts, value, _i, _len, _ref, _ref2;
        if (queryString == null) {
          queryString = window.location.search.substr(1);
        }
        hash = {};
        _ref = queryString.split(/\&/);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          parts = _ref[_i];
          _ref2 = parts.split(/\=/, 2), key = _ref2[0], value = _ref2[1];
          hash[decodeURIComponent(key)] = decodeURIComponent(value);
        }
        return hash;
      };
      _Class.prototype.isSelected = function($conversation) {
        return this.$selectedConversation && this.$selectedConversation.attr('id') === ($conversation != null ? $conversation.attr('id') : void 0);
      };
      _Class.prototype.selectUnloadedConversation = function(conversationId, params) {
        return $.ajaxJSON('/conversations/' + conversationId, 'GET', {}, __bind(function(data) {
          this.addConversation(data, true);
          $("#conversation_" + conversationId).hide();
          return this.selectConversation($("#conversation_" + conversationId), $.extend(params, {
            data: data
          }));
        }, this));
      };
      _Class.prototype.noMessagesCheck = function() {
        return $('#no_messages').showIf(!this.$conversationList.find('li:not([id=conversations_loader])').length);
      };
      _Class.prototype.selectConversation = function($conversation, params) {
        var $c, completion, url;
        if (params == null) {
          params = {};
        }
        this.toggleMessageActions(false);
        if (this.isSelected($conversation)) {
          this.$selectedConversation.removeClass('inactive');
          this.$messageList.find('li.selected').removeClass('selected');
          return;
        }
        this.$messageList.removeClass('private').hide().html('');
        if ($conversation != null ? $conversation.hasClass('private') : void 0) {
          this.$messageList.addClass('private');
        }
        if (this.$selectedConversation) {
          this.$selectedConversation.removeClass('selected inactive');
          if (this.scope === 'unread') {
            this.$selectedConversation.fadeOut('fast', __bind(function(e) {
              $(e.currentTarget).remove();
              return this.noMessagesCheck();
            }, this));
          }
          this.$selectedConversation = null;
        }
        if ($conversation) {
          this.$selectedConversation = $conversation.addClass('selected');
        }
        if (this.$selectedConversation || $('#action_compose_message').length) {
          this.showMessageForm();
          if (params.message) {
            this.$form.find('#body').val(params.message);
          }
        } else {
          this.$form.parent().hide();
        }
        if (this.$selectedConversation) {
          this.$selectedConversation.scrollIntoView();
        } else {
          if (params.user_id) {
            $('#from_conversation_id').val(params.from_conversation_id);
            $('#recipients').data('token_input').selector.addByUserId(params.user_id, params.from_conversation_id);
          }
          return;
        }
        $c = this.$selectedConversation;
        completion = __bind(function(data) {
          var message, user, _i, _j, _len, _len2, _ref, _ref2, _ref3;
          if (!this.isSelected($c)) {
            return;
          }
          _ref = data.participants;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            user = _ref[_i];
            if (!((_ref2 = this.userCache[user.id]) != null ? _ref2.avatar_url : void 0)) {
              this.userCache[user.id] = user;
              user.htmlName = this.htmlNameForUser(user);
            }
          }
          if (data['private'] && (user = ((function() {
            var _j, _len2, _ref3, _results;
            _ref3 = data.participants;
            _results = [];
            for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
              user = _ref3[_j];
              if (user.id !== this.currentUser.id) {
                _results.push(user);
              }
            }
            return _results;
          }).call(this))[0] && this.canAddNotesFor(user))) {
            this.$form.find('#user_note_info').show();
          }
          this.resize();
          this.$messages.show();
          _ref3 = data.messages;
          for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
            message = _ref3[_j];
            this.$messageList.append(this.buildMessage(message));
          }
          this.$messageList.show();
          if (this.$selectedConversation.hasClass('unread')) {
            return this.setConversationState(this.$selectedConversation, 'read');
          }
        }, this);
        if (params.data) {
          return completion(params.data);
        } else {
          url = this.$selectedConversation.find('a.details_link').attr('href');
          return this.$messageList.show().disableWhileLoading($.ajaxJSON(url, 'GET', {}, completion));
        }
      };
      _Class.prototype.contextList = function(contexts, withUrl, limit) {
        var compare, context, course, formatContext, group, id, roles, sharedContexts;
        if (withUrl == null) {
          withUrl = false;
        }
        if (limit == null) {
          limit = 2;
        }
        compare = function(contextA, contextB) {
          var strA, strB;
          strA = contextA.name.toLowerCase();
          strB = contextB.name.toLowerCase();
          if (strA < strB) {
            return -1;
          } else if (strA > strB) {
            return 1;
          } else {
            return 0;
          }
        };
        formatContext = function(context) {
          if (withUrl && context.type === "course") {
            return "<span class='context' data-url='" + (htmlEscape(context.url)) + "'>" + (htmlEscape(context.name)) + "</span>";
          } else {
            return htmlEscape(context.name);
          }
        };
        sharedContexts = ((function() {
          var _ref, _results;
          _ref = contexts.courses;
          _results = [];
          for (id in _ref) {
            roles = _ref[id];
            if (course = this.contexts.courses[id]) {
              _results.push(course);
            }
          }
          return _results;
        }).call(this)).concat((function() {
          var _ref, _results;
          _ref = contexts.groups;
          _results = [];
          for (id in _ref) {
            roles = _ref[id];
            if (group = this.contexts.groups[id]) {
              _results.push(group);
            }
          }
          return _results;
        }).call(this)).sort(compare).slice(0, limit);
        return $.toSentence((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = sharedContexts.length; _i < _len; _i++) {
            context = sharedContexts[_i];
            _results.push(formatContext(context));
          }
          return _results;
        })());
      };
      _Class.prototype.htmlNameForUser = function(user, contexts) {
        var _ref, _ref2;
        if (contexts == null) {
          contexts = {
            courses: user.common_courses,
            groups: user.common_groups
          };
        }
        return htmlEscape(user.name) + (((_ref = contexts.courses) != null ? _ref.length : void 0) || ((_ref2 = contexts.groups) != null ? _ref2.length : void 0) ? " <em>" + htmlEscape(this.contextList(contexts)) + "</em>" : '');
      };
      _Class.prototype.canAddNotesFor = function(user) {
        var id, roles, _ref, _ref2;
        if (!this.options.NOTES_ENABLED) {
          return false;
        }
        if (user.can_add_notes) {
          return true;
        }
        _ref = user.common_courses;
        for (id in _ref) {
          roles = _ref[id];
          if (__indexOf.call(roles, 'StudentEnrollment') >= 0 && (this.options.CAN_ADD_NOTES_FOR_ACCOUNT || ((_ref2 = this.contexts.courses[id]) != null ? _ref2.can_add_notes : void 0))) {
            return true;
          }
        }
        return false;
      };
      _Class.prototype.buildMessage = function(data) {
        var $attachmentBlank, $mediaObjectBlank, $message, $pmAction, $ul, attachment, avatar, pmUrl, submessage, user, userName, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
        if (data.submission) {
          return this.buildSubmission(data);
        }
        $message = $("#message_blank").clone(true).attr('id', 'message_' + data.id);
        $message.data('id', data.id);
        $message.addClass(data.generated ? 'generated' : data.author_id === this.currentUser.id ? 'self' : 'other');
        $message.addClass('forwardable');
        user = this.userCache[data.author_id];
        if (avatar = user != null ? user.avatar_url : void 0) {
          $message.prepend($('<img />').attr('src', avatar).addClass('avatar'));
        }
        if (user) {
          if ((_ref = user.htmlName) == null) {
            user.htmlName = this.htmlNameForUser(user);
          }
        }
        userName = (_ref2 = user != null ? user.name : void 0) != null ? _ref2 : I18n.t('unknown_user', 'Unknown user');
        $message.find('.audience').html((user != null ? user.htmlName : void 0) || htmlEscape(userName));
        $message.find('span.date').text($.parseFromISO(data.created_at).datetime_formatted);
        $message.find('p').html(TextHelper.formatMessage(data.body));
        $message.find("a.show_quoted_text_link").click(__bind(function(e) {
          var $target, $text;
          $target = $(e.currentTarget);
          $text = $target.parents(".quoted_text_holder").children(".quoted_text");
          if ($text.length) {
            event.stopPropagation();
            event.preventDefault();
            $text.show();
            return $target.hide();
          }
        }, this));
        $pmAction = $message.find('a.send_private_message');
        pmUrl = $.replaceTags($pmAction.attr('href'), {
          user_id: data.author_id,
          user_name: encodeURIComponent(userName),
          from_conversation_id: this.$selectedConversation.data('id')
        });
        $pmAction.attr('href', pmUrl).click(__bind(function(e) {
          return e.stopPropagation();
        }, this));
        if ((_ref3 = data.forwarded_messages) != null ? _ref3.length : void 0) {
          $ul = $('<ul class="messages"></ul>');
          _ref4 = data.forwarded_messages;
          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
            submessage = _ref4[_i];
            $ul.append(this.buildMessage(submessage));
          }
          $message.append($ul);
        }
        $ul = $message.find('ul.message_attachments').detach();
        $mediaObjectBlank = $ul.find('.media_object_blank').detach();
        $attachmentBlank = $ul.find('.attachment_blank').detach();
        if ((data.media_comment != null) || ((_ref5 = data.attachments) != null ? _ref5.length : void 0)) {
          $message.append($ul);
          if (data.media_comment != null) {
            $ul.append(this.buildMediaObject($mediaObjectBlank, data.media_comment));
          }
          if (data.attachments != null) {
            _ref6 = data.attachments;
            for (_j = 0, _len2 = _ref6.length; _j < _len2; _j++) {
              attachment = _ref6[_j];
              $ul.append(this.buildAttachment($attachmentBlank, attachment));
            }
          }
        }
        return $message;
      };
      _Class.prototype.buildMediaObject = function(blank, data) {
        var $mediaObject;
        $mediaObject = blank.clone(true).attr('id', 'media_comment_' + data.media_id);
        $mediaObject.find('span.title').html(htmlEscape(data.display_name));
        $mediaObject.find('span.media_comment_id').html(htmlEscape(data.media_id));
        $mediaObject.find('.instructure_inline_media_comment').data('media_comment_type', data.media_type);
        return $mediaObject;
      };
      _Class.prototype.buildAttachment = function(blank, data) {
        var $attachment, $link;
        $attachment = blank.clone(true).attr('id', 'attachment_' + data.id);
        $attachment.data('id', data.id);
        $attachment.find('span.title').html(htmlEscape(data.display_name));
        $link = $attachment.find('a');
        $link.attr('href', data.url);
        $link.click(__bind(function(e) {
          return e.stopPropagation();
        }, this));
        return $attachment;
      };
      _Class.prototype.buildSubmission = function(data) {
        var $comment, $commentBlank, $header, $inlineMore, $moreLink, $submission, $ul, comment, href, idx, index, initiallyShown, score, user, userName, _ref, _ref2, _ref3, _ref4;
        $submission = $("#submission_blank").clone(true).attr('id', data.id);
        $submission.data('id', data.id);
        data = data.submission;
        $ul = $submission.find('ul');
        $header = $ul.find('li.header');
        href = $.replaceTags($header.find('a').attr('href'), {
          course_id: data.assignment.course_id,
          assignment_id: data.assignment_id,
          id: data.user_id
        });
        $header.find('a').attr('href', href);
        user = this.userCache[data.user_id];
        if (user) {
          if ((_ref = user.htmlName) == null) {
            user.htmlName = this.htmlNameForUser(user);
          }
        }
        userName = (_ref2 = user != null ? user.name : void 0) != null ? _ref2 : I18n.t('unknown_user', 'Unknown user');
        $header.find('.title').html(htmlEscape(data.assignment.name));
        $header.find('span.date').text(data.submitted_at ? $.parseFromISO(data.submitted_at).datetime_formatted : I18n.t('not_applicable', 'N/A'));
        $header.find('.audience').html((user != null ? user.htmlName : void 0) || htmlEscape(userName));
        if (data.score && data.assignment.points_possible) {
          score = "" + data.score + " / " + data.assignment.points_possible;
        } else {
          score = (_ref3 = data.score) != null ? _ref3 : I18n.t('not_scored', 'no score');
        }
        $header.find('.score').html(score);
        $commentBlank = $ul.find('.comment').detach();
        index = 0;
        initiallyShown = 4;
        for (idx = _ref4 = data.submission_comments.length - 1; idx >= 0; idx += -1) {
          comment = data.submission_comments[idx];
          if (index >= 10) {
            break;
          }
          index++;
          $comment = this.buildSubmissionComment($commentBlank, comment);
          if (index > initiallyShown) {
            $comment.hide();
          }
          $ul.append($comment);
        }
        $moreLink = $ul.find('.more').detach();
        if (index > initiallyShown) {
          $inlineMore = $moreLink.clone(true);
          $inlineMore.find('.hidden').text(index - initiallyShown);
          $inlineMore.attr('title', htmlEscape(I18n.t('titles.expand_inline', "Show more comments")));
          $inlineMore.click(__bind(function(e) {
            var $target;
            $target = $(e.currentTarget);
            $submission = $target.closest('.submission');
            $submission.find('.more:hidden').show();
            $target.hide();
            $submission.find('.comment:hidden').slideDown('fast');
            this.resize();
            return false;
          }, this));
          $ul.append($inlineMore);
        }
        if (data.submission_comments.length > index) {
          $moreLink.find('a').attr('href', href).attr('target', '_blank');
          $moreLink.find('.hidden').text(data.submission_comments.length - index);
          $moreLink.attr('title', htmlEscape(I18n.t('titles.view_submission', "Open submission in new window.")));
          if (data.submission_comments.length > initiallyShown) {
            $moreLink.hide();
          }
          $ul.append($moreLink);
        }
        return $submission;
      };
      _Class.prototype.buildSubmissionComment = function(blank, data) {
        var $comment, avatar, user, userName, _ref, _ref2;
        $comment = blank.clone(true);
        user = this.userCache[data.author_id];
        if (avatar = user != null ? user.avatar_url : void 0) {
          $comment.prepend($('<img />').attr('src', avatar).addClass('avatar'));
        }
        if (user) {
          if ((_ref = user.htmlName) == null) {
            user.htmlName = this.htmlNameForUser(user);
          }
        }
        userName = (_ref2 = user != null ? user.name : void 0) != null ? _ref2 : I18n.t('unknown_user', 'Unknown user');
        $comment.find('.audience').html((user != null ? user.htmlName : void 0) || htmlEscape(userName));
        $comment.find('span.date').text($.parseFromISO(data.created_at).datetime_formatted);
        $comment.find('p').html(htmlEscape(data.comment).replace(/\n/g, '<br />'));
        return $comment;
      };
      _Class.prototype.inboxActionUrlFor = function($action, $conversation) {
        return $.replaceTags($action.attr('href'), 'id', $conversation.data('id'));
      };
      _Class.prototype.inboxAction = function($action, options) {
        var $loadingNode, ajaxRequest, defaults, _ref, _ref2, _ref3;
        $loadingNode = (_ref = options.loadingNode) != null ? _ref : $action.closest('ul.conversations li');
        if (!$loadingNode.length) {
          $loadingNode = $('#conversation_actions').data('selectedConversation');
        }
        defaults = {
          loadingNode: $loadingNode,
          url: this.inboxActionUrlFor($action, $loadingNode),
          method: 'POST',
          data: {}
        };
        options = $.extend(defaults, options);
        if (!((_ref2 = typeof options.before === "function" ? options.before(options.loadingNode, options) : void 0) != null ? _ref2 : true)) {
          return;
        }
        ajaxRequest = $.ajaxJSON(options.url, options.method, options.data, __bind(function(data) {
          return typeof options.success === "function" ? options.success(options.loadingNode, data) : void 0;
        }, this), __bind(function(data) {
          return typeof options.error === "function" ? options.error(options.loadingNode, data) : void 0;
        }, this));
        return (_ref3 = options.loadingNode) != null ? _ref3.disableWhileLoading(ajaxRequest) : void 0;
      };
      _Class.prototype.addConversation = function(data, append) {
        var $conversation;
        $('#no_messages').hide();
        $conversation = $("#conversation_" + data.id);
        if ($conversation.length) {
          $conversation.show();
        } else {
          $conversation = $("#conversation_blank").clone(true).attr('id', 'conversation_' + data.id);
        }
        $conversation.data('id', data.id);
        if (data.avatar_url) {
          $conversation.prepend($('<img />').attr('src', data.avatar_url).addClass('avatar'));
        }
        $conversation[append ? 'appendTo' : 'prependTo'](this.$conversationList).click(__bind(function(e) {
          e.preventDefault();
          return this.setHash('#/conversations/' + $(e.currentTarget).data('id'));
        }, this));
        this.updateConversation($conversation, data, null);
        if (!append) {
          $conversation.hide().slideDown('fast');
        }
        this.$conversationList.append($("#conversations_loader"));
        return $conversation;
      };
      _Class.prototype.htmlAudienceForConversation = function(conversation, cutoff) {
        var audience, context_info, id, idOrArray;
        if (cutoff == null) {
          cutoff = 2;
        }
        audience = conversation.audience;
        if (audience.length === 0) {
          return "<span>" + (htmlEscape(I18n.t('notes_to_self', 'Monologue'))) + "</span>";
        }
        context_info = "<em>" + (this.contextList(conversation.audience_contexts, true)) + "</em>";
        if (audience.length === 1) {
          return "<span>" + (htmlEscape(this.userCache[audience[0]].name)) + "</span> " + context_info;
        }
        if (audience.length > cutoff) {
          audience = audience.slice(0, cutoff).concat([audience.slice(cutoff, audience.length)]);
        }
        return $.toSentence((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = audience.length; _i < _len; _i++) {
            idOrArray = audience[_i];
            _results.push(typeof idOrArray === 'number' ? "<span>" + (htmlEscape(this.userCache[idOrArray].name)) + "</span>" : "<span class='others'>\n  " + (htmlEscape(I18n.t('other', "other", {
              count: idOrArray.length
            }))) + "\n  <span>\n    <ul>\n      " + (((function() {
              var _j, _len2, _results2;
              _results2 = [];
              for (_j = 0, _len2 = idOrArray.length; _j < _len2; _j++) {
                id = idOrArray[_j];
                _results2.push("<li>" + (htmlEscape(this.userCache[id].name)) + "</li>");
              }
              return _results2;
            }).call(this)).join('')) + "\n    </ul>\n  </span>\n</span>");
          }
          return _results;
        }).call(this)) + " " + context_info;
      };
      _Class.prototype.lastMessageKey = function() {
        if (this.scope === 'sent') {
          return 'last_authored_message';
        } else {
          return 'last_message';
        }
      };
      _Class.prototype.lastMessageAtKey = function() {
        return "" + (this.lastMessageKey()) + "_at";
      };
      _Class.prototype.updateConversation = function($conversation, data, move_mode) {
        var $a, $p, moveDirection, property, timestampKey, user, _i, _j, _len, _len2, _ref, _ref2;
        if (move_mode == null) {
          move_mode = 'slide';
        }
        timestampKey = this.lastMessageAtKey();
        if (!data[timestampKey]) {
          return this.removeConversation($conversation);
        }
        this.toggleMessageActions(false);
        $a = $conversation.find('a.details_link');
        $a.attr('href', $.replaceTags($a.attr('href'), 'id', data.id));
        $a.attr('add_url', $.replaceTags($a.attr('add_url'), 'id', data.id));
        if (data.participants) {
          _ref = data.participants;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            user = _ref[_i];
            if (!this.userCache[user.id]) {
              this.userCache[user.id] = user;
            }
          }
        }
        if (data.audience) {
          $conversation.data('audience', data.audience.concat([this.currentUser.id]));
          $conversation.find('.audience').html(this.htmlAudienceForConversation(data));
          if (this.isSelected($conversation)) {
            this.buildFormAudience();
          }
        }
        $conversation.find('.actions a').click(__bind(function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.closeMenus();
          return this.openConversationMenu($(e.currentTarget));
        }, this)).focus(__bind(function() {
          this.closeMenus();
          return this.openConversationMenu($(e.currentTarget));
        }, this));
        if (data.message_count != null) {
          $conversation.find('.count').text(data.message_count);
          $conversation.find('.count').showIf(data.message_count > 1);
        }
        $conversation.find('span.date').text($.friendlyDatetime($.parseFromISO(data[timestampKey]).datetime));
        moveDirection = $conversation.data(timestampKey) > data[timestampKey] ? 'down' : 'up';
        $conversation.data(timestampKey, data[timestampKey]);
        $conversation.data('starred', data.starred);
        $p = $conversation.find('p');
        $p.text(data[this.lastMessageKey()]);
        if (data.properties.length) {
          _ref2 = data.properties;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            property = _ref2[_j];
            $conversation.addClass(property);
          }
        }
        if (data['private']) {
          $conversation.addClass('private');
        }
        if (data.starred) {
          $conversation.addClass('starred');
        }
        if (!data.subscribed) {
          $conversation.addClass('unsubscribed');
        }
        this.setConversationState($conversation, data.workflow_state);
        if (move_mode) {
          return this.repositionConversation($conversation, moveDirection, move_mode);
        }
      };
      _Class.prototype.repositionConversation = function($conversation, moveDirection, move_mode) {
        var $dummy_conversation, $n, lastMessageAt, timestampKey;
        $conversation.show();
        timestampKey = this.lastMessageAtKey();
        lastMessageAt = $conversation.data(timestampKey);
        $n = $conversation;
        if (moveDirection === 'up') {
          while ($n.prev() && $n.prev().data(timestampKey) < lastMessageAt) {
            $n = $n.prev();
          }
        } else {
          while ($n.next() && $n.next().data(timestampKey) > lastMessageAt) {
            $n = $n.next();
          }
        }
        if ($n === $conversation) {
          return;
        }
        if (move_mode === 'immediate') {
          return $conversation.detach()[moveDirection === 'up' ? 'insertBefore' : 'insertAfter']($n);
        } else {
          $dummy_conversation = $conversation.clone().insertAfter($conversation);
          $conversation.detach()[moveDirection === 'up' ? 'insertBefore' : 'insertAfter']($n).animate({
            opacity: 'toggle',
            height: 'toggle'
          }, 0);
          $dummy_conversation.animate({
            opacity: 'toggle',
            height: 'toggle'
          }, 200, __bind(function() {
            return $dummy_conversation.remove();
          }, this));
          return $conversation.animate({
            opacity: 'toggle',
            height: 'toggle'
          }, 200, __bind(function() {
            return $conversation.scrollIntoView();
          }, this));
        }
      };
      _Class.prototype.removeConversation = function($conversation) {
        var deselect;
        deselect = this.isSelected($conversation);
        return $conversation.fadeOut('fast', __bind(function() {
          $conversation.remove();
          this.noMessagesCheck();
          if (deselect) {
            return this.setHash('');
          }
        }, this));
      };
      _Class.prototype.setConversationState = function($conversation, state) {
        return $conversation.removeClass('read unread archived').addClass(state);
      };
      _Class.prototype.openConversationMenu = function($node) {
        var $container, $conversation, elements, offset;
        elements = {
          node: $node,
          container: $('#conversation_actions'),
          conversation: $node.closest('li'),
          parent: $node.parent(),
          lists: $('#conversation_actions ul'),
          listElements: $('#conversation_actions li'),
          focusable: $('a, input, select, textarea'),
          actions: {
            markAsRead: $('#action_mark_as_read').parent(),
            markAsUnread: $('#action_mark_as_unread').parent(),
            unstar: $('#action_unstar').parent(),
            star: $('#action_star').parent(),
            unsubscribe: $('#action_unsubscribe').parent(),
            subscribe: $('#action_subscribe').parent(),
            forward: $('#action_forward').parent(),
            archive: $('#action_archive').parent(),
            unarchive: $('#action_unarchive').parent(),
            "delete": $('#action_delete').parent(),
            deleteAll: $('#action_delete_all').parent()
          }
        };
        this.activeActionMenu = elements.node;
        elements.parent.addClass('selected');
        elements.container.addClass('selected');
        elements.conversation.addClass('menu_active');
        $container = elements.container;
        $conversation = elements.conversation;
        elements.container.data('selectedConversation', elements.conversation);
        elements.lists.removeClass('first last').hide();
        elements.listElements.hide();
        if (elements.conversation.hasClass('unread')) {
          elements.actions.markAsRead.show();
        }
        if (elements.conversation.hasClass('read')) {
          elements.actions.markAsUnread.show();
        }
        if (elements.conversation.hasClass('starred')) {
          elements.actions.unstar.show();
        } else {
          elements.actions.star.show();
        }
        if (elements.conversation.hasClass('private')) {
          elements.actions.subscribe.hide();
          elements.actions.unsubscribe.hide();
        } else {
          if (!elements.conversation.hasClass('unsubscribed')) {
            elements.actions.unsubscribe.show();
          }
          if (elements.conversation.hasClass('unsubscribed')) {
            elements.actions.subscribe.show();
          }
        }
        elements.actions.forward.show();
        elements.actions["delete"].show();
        elements.actions.deleteAll.show();
        if (this.scope === 'archived') {
          elements.actions.unarchive.show();
        } else {
          elements.actions.archive.show();
        }
        $(window).one('keydown', __bind(function(e) {
          if (e.keyCode !== 9 || e.shiftKey) {
            return;
          }
          return elements.focusable.one('focus.actions_menu', __bind(function(e) {
            this.nextElement = $(e.target);
            elements.focusable.unbind('.actions_menu');
            elements.container.find('a:visible:first').focus();
            elements.container.find('a:visible:first').bind('blur.actions_menu', e, __bind(function() {
              return $(window).one('keyup', __bind(function(e) {
                var actionMenuActive;
                actionMenuActive = elements.container.find('a:focus').length;
                if (!actionMenuActive) {
                  elements.container.find('a.visible').unbind('.actions_menu');
                  return this.activeActionMenu.focus();
                }
              }, this));
            }, this));
            return elements.container.find('a:visible:last').bind('blur.actions_menu', e, __bind(function() {
              return $(window).one('keyup', __bind(function(e) {
                var actionMenuActive;
                actionMenuActive = elements.container.find('a:focus').length;
                if (!actionMenuActive) {
                  elements.container.find('a.visible').unbind('.actions_menu');
                  this.nextElement.focus();
                  return this.closeMenus();
                }
              }, this));
            }, this));
          }, this));
        }, this));
        elements.container.find('li[style*="list-item"]').parent().show();
        elements.groups = elements.container.find('ul[style*="block"]');
        if (elements.groups.length) {
          elements.groups.first().addClass('first');
          elements.groups.last().addClass('last');
        }
        offset = elements.node.offset();
        return elements.container.css({
          left: offset.left + (elements.node.width() / 2) - elements.container.offsetParent().offset().left - (elements.container.width() / 2),
          top: offset.top + (elements.node.height() * 0.9) - elements.container.offsetParent().offset().top
        });
      };
      _Class.prototype.closeMenus = function() {
        $('#actions .menus > li, #conversation_actions, #conversations .actions').removeClass('selected');
        return $('#conversations li.menu_active').removeClass('menu_active');
      };
      _Class.prototype.openMenu = function($menu) {
        var $div, offset;
        this.closeMenus();
        if (!$menu.hasClass('disabled')) {
          $div = $menu.parent('li, span').addClass('selected').find('div');
          offset = -($div.parent().position().left + $div.parent().outerWidth() / 2) + 6;
          if (offset < -($div.outerWidth() / 2)) {
            offset = -($div.outerWidth() / 2);
          }
          return $div.css('margin-left', offset + 'px');
        }
      };
      _Class.prototype.resize = function() {
        var availableHeight;
        availableHeight = $(window).height() - $('#header').outerHeight(true) - ($('#wrapper-container').outerHeight(true) - $('#wrapper-container').height()) - ($('#main').outerHeight(true) - $('#main').height()) - $('#breadcrumbs').outerHeight(true) - $('#footer').outerHeight(true);
        if (availableHeight < this.minHeight) {
          availableHeight = this.minHeight;
        }
        $(document.body).toggleClass('too_small', availableHeight <= this.minHeight);
        this.$inbox.height(availableHeight);
        this.$messageList.height(availableHeight - this.$form.outerHeight(true));
        return this.$conversationList.height(availableHeight - $('#actions').outerHeight(true));
      };
      _Class.prototype.toggleMessageActions = function(state) {
        if (state != null) {
          this.$messageList.find('> li').removeClass('selected');
          this.$messageList.find('> li :checkbox').attr('checked', false);
        } else {
          state = !!this.$messageList.find('li.selected').length;
        }
        $('#action_forward').parent().showIf(state && this.$messageList.find('li.selected.forwardable').length);
        if (state) {
          $("#message_actions").slideDown(100);
        } else {
          $("#message_actions").slideUp(100);
        }
        return this.$form[state ? 'addClass' : 'removeClass']('disabled');
      };
      _Class.prototype.setHash = function(hash) {
        if (hash !== location.hash) {
          location.hash = hash;
          return $(document).triggerHandler('document_fragment_change', hash);
        }
      };
      _Class.prototype.initializeHelp = function() {
        return $('#help_crumb').click(__bind(function(e) {
          e.preventDefault();
          return introSlideshow();
        }, this));
      };
      _Class.prototype.initializeForms = function() {
        $('#create_message_form, #forward_message_form').find('textarea').elastic().keypress(__bind(function(e) {
          if (e.which === 13 && e.shiftKey) {
            e.preventDefault();
            $(e.target).closest('form').submit();
            return false;
          }
        }, this));
        this.$form = $('#create_message_form');
        this.$addForm = $('#add_recipients_form');
        this.$forwardForm = $('#forward_message_form');
        this.$form.submit(__bind(function(e) {
          var valid;
          valid = !!(this.$form.find('#body').val() && (this.$form.find('#recipient_info').filter(':visible').length === 0 || this.$form.find('.token_input li').length > 0));
          if (!valid) {
            e.stopImmediatePropagation();
          }
          return valid;
        }, this));
        this.$form.formSubmit({
          fileUpload: __bind(function() {
            return this.$form.find(".file_input:visible").length > 0;
          }, this),
          preparedFileUpload: true,
          context_code: "user_" + $("#identity .user_id").text(),
          folder_id: this.options.FOLDER_ID,
          intent: 'message',
          formDataTarget: 'url',
          handle_files: function(attachments, data) {
            var a;
            data.attachment_ids = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = attachments.length; _i < _len; _i++) {
                a = attachments[_i];
                _results.push(a.attachment.id);
              }
              return _results;
            })();
            return data;
          },
          disableWhileLoading: true,
          success: __bind(function(data) {
            var $conversation, conversation, _i, _len;
            if (data.length == null) {
              data = [data];
            }
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              conversation = data[_i];
              $conversation = $('#conversation_' + conversation.id);
              if ($conversation.length) {
                if (this.isSelected($conversation)) {
                  this.buildMessage(conversation.messages[0]).prependTo(this.$messageList).slideDown('fast');
                }
                this.updateConversation($conversation, conversation, data.length === 1 ? 'slide' : 'immediate');
              } else if (conversation[this.lastMessageAtKey()]) {
                this.addConversation(conversation);
              }
              if (data.length === 1) {
                this.setHash('#/conversations/' + conversation.id);
              }
            }
            $.flashMessage(data.length > 1 ? I18n.t('messages_sent', 'Messages Sent') : I18n.t('message_sent', 'Message Sent'));
            return this.resetMessageForm();
          }, this),
          error: __bind(function(data) {
            var error, errorText;
            if (typeof data.isRejected === "function" ? data.isRejected() : void 0) {
              return;
            }
            error = data[0];
            if ((error != null ? error.attribute : void 0) === 'body') {
              this.$form.find('#body').errorBox(I18n.t('message_blank_error', 'No message was specified'));
            } else {
              errorText = ((error != null ? error.attribute : void 0) === 'recipients' ? error.message === 'blank' ? I18n.t('recipient_blank_error', 'No recipients were specified') : I18n.t('recipient_error', 'The course or group you have selected has no valid recipients') : I18n.t('unspecified_error', 'An unexpected error occurred, please try again'));
              this.$form.find('.token_input').errorBox(errorText);
            }
            return $('.error_box').filter(':visible').css('z-index', 10);
          }, this)
        });
        this.$form.click(__bind(function() {
          return this.toggleMessageActions(false);
        }, this));
        this.$addForm.submit(__bind(function(e) {
          var valid;
          valid = !!(this.$addForm.find('.token_input li').length);
          if (!valid) {
            e.stopImmediatePropagation();
          }
          return valid;
        }, this));
        this.$addForm.formSubmit({
          disableWhileLoading: true,
          success: __bind(function(data) {
            this.buildMessage(data.messages[0]).prependTo(this.$messageList).slideDown('fast');
            this.updateConversation(this.$selectedConversation, data);
            this.resetMessageForm();
            return this.$addForm.dialog('close');
          }, this),
          error: __bind(function(data) {
            return this.$addForm.dialog('close');
          }, this)
        });
        this.$forwardForm.submit(__bind(function(e) {
          var valid;
          valid = !!(this.$forwardForm.find('#forward_body').val() && this.$forwardForm.find('.token_input li').length);
          if (!valid) {
            e.stopImmediatePropagation();
          }
          return valid;
        }, this));
        this.$forwardForm.formSubmit({
          disableWhileLoading: true,
          success: __bind(function(data) {
            var $conversation, conversation;
            conversation = data[0];
            $conversation = $('#conversation_' + conversation.id);
            if ($conversation.length) {
              if (this.isSelected($conversation)) {
                this.buildMessage(conversation.messages[0]).prependTo(this.$messageList).slideDown('fast');
              }
              this.updateConversation($conversation, conversation);
            } else {
              this.addConversation(conversation);
            }
            this.setHash('#/conversations/' + conversation.id);
            this.resetMessageForm();
            return this.$forwardForm.dialog('close');
          }, this),
          error: __bind(function(data) {
            return this.$forwardForm.dialog('close');
          }, this)
        });
        return this.$messageList.click(__bind(function(e) {
          var $message, _ref;
          if ($(e.target).closest('a.instructure_inline_media_comment').length) {} else {
            $message = $(e.target).closest('#messages > ul > li');
            if (!$message.hasClass('generated')) {
              if ((_ref = this.$selectedConversation) != null) {
                _ref.addClass('inactive');
              }
              $message.toggleClass('selected');
              $message.find('> :checkbox').attr('checked', $message.hasClass('selected'));
            }
            return this.toggleMessageActions();
          }
        }, this));
      };
      _Class.prototype.initializeMenus = function() {
        $('.menus > li > a').click(__bind(function(e) {
          e.preventDefault(e);
          return this.openMenu($(e.currentTarget));
        }, this)).focus(__bind(function(e) {
          return this.openMenu($(e.currentTarget));
        }, this));
        $(document).bind('mousedown', __bind(function(e) {
          if (!$(e.target).closest("span.others").find('> span').length) {
            $('span.others > span').hide();
          }
          if (!$(e.target).closest(".menus > li, #conversation_actions, #conversations .actions").length) {
            return this.closeMenus();
          }
        }, this));
        $('#menu_views').parent().find('li a').click(__bind(function(e) {
          this.closeMenus();
          this.lockUntilUserInput();
          return $('#menu_views').text($(e.currentTarget).text());
        }, this));
        return this.$conversations.delegate('.actions a', 'blur', __bind(function(e) {
          return $(window).one('keyup', __bind(function(e) {
            if (e.shiftKey) {
              return this.closeMenus();
            }
          }, this));
        }, this));
      };
      _Class.prototype.initializeMessageActions = function() {
        $('#message_actions').find('a').click(__bind(function(e) {
          return e.preventDefault();
        }, this));
        return $('#cancel_bulk_message_action').click(__bind(function() {
          return this.toggleMessageActions(false);
        }, this));
      };
      _Class.prototype.initializeConversationActions = function() {
        $('#conversation_actions').find('li a').click(__bind(function(e) {
          e.preventDefault();
          return this.closeMenus();
        }, this));
        $('.action_mark_as_read').click(__bind(function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            before: __bind(function($node) {
              if (this.scope !== 'unread') {
                this.setConversationState($node, 'read');
              }
              return true;
            }, this),
            success: __bind(function($node) {
              if (this.scope === 'unread') {
                return this.removeConversation($node);
              }
            }, this),
            error: __bind(function($node) {
              if (this.scope !== 'unread') {
                return this.setConversationState($node('unread'));
              }
            }, this)
          });
        }, this));
        $('.action_mark_as_unread').click(__bind(function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            before: __bind(function($node) {
              return this.setConversationState($node, 'unread');
            }, this),
            error: __bind(function($node) {
              return this.setConversationState($node, 'read');
            }, this)
          });
        }, this));
        $('.action_unstar').click(__bind(function(e) {
          var starred;
          e.preventDefault();
          e.stopImmediatePropagation();
          starred = null;
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            before: __bind(function($node) {
              starred = $node.data('starred');
              if (starred) {
                $node.removeClass('starred');
              }
              return starred;
            }, this),
            success: __bind(function($node, data) {
              this.updateConversation($node, data);
              if (this.scope === 'starred') {
                return this.removeConversation($node);
              }
            }, this),
            error: __bind(function($node) {
              return $node.addClass('starred');
            }, this)
          });
        }, this));
        $('.action_star').click(__bind(function(e) {
          var starred;
          e.preventDefault();
          e.stopImmediatePropagation();
          starred = null;
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            before: __bind(function($node, options) {
              starred = $node.data('starred');
              if (!starred) {
                $node.addClass('starred');
              }
              return !starred;
            }, this),
            success: __bind(function($node, data) {
              return this.updateConversation($node, data);
            }, this),
            error: __bind(function($node) {
              return $node.removeClass('starred');
            }, this)
          });
        }, this));
        $('#action_add_recipients').click(__bind(function(e) {
          e.preventDefault();
          return this.$addForm.attr('action', this.inboxActionUrlFor($(e.currentTarget), this.$selectedConversation)).dialog('close').dialog({
            width: 420,
            title: I18n.t('title.add_recipients', 'Add Recipients'),
            buttons: [
              {
                text: I18n.t('buttons.add_people', 'Add People'),
                click: __bind(function() {
                  return this.$addForm.submit();
                }, this)
              }, {
                text: I18n.t('#buttons.cancel', 'Cancel'),
                click: __bind(function() {
                  return this.$addForm.dialog('close');
                }, this)
              }
            ],
            open: __bind(function() {
              var tokenInput;
              tokenInput = $('#add_recipients').data('token_input');
              tokenInput.baseExclude = this.$selectedConversation.data('audience');
              return this.$addForm.find("input[name!=authenticity_token]").val('').change();
            }, this),
            close: __bind(function() {
              return $('#add_recipients').data('token_input').input.blur();
            }, this)
          });
        }, this));
        $('#action_subscribe').click(__bind(function(e) {
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            data: {
              subscribed: 1
            },
            success: __bind(function($node) {
              return $node.removeClass('unsubscribed');
            }, this)
          });
        }, this));
        $('#action_unsubscribe').click(__bind(function(e) {
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            data: {
              subscribed: 0
            },
            success: __bind(function($node) {
              return $node.addClass('unsubscribed');
            }, this)
          });
        }, this));
        $('#action_archive, #action_unarchive').click(__bind(function(e) {
          return this.inboxAction($(e.currentTarget), {
            method: 'PUT',
            success: __bind(function($node) {
              return this.removeConversation($node);
            }, this)
          });
        }, this));
        $('#action_delete_all').click(__bind(function(e) {
          if (confirm(I18n.t('confirm.delete_conversation', "Are you sure you want to delete your copy of this conversation? This action cannot be undone."))) {
            return this.inboxAction($(e.currentTarget), {
              method: 'DELETE',
              success: __bind(function($node) {
                return this.removeConversation($node);
              }, this)
            });
          }
        }, this));
        $('#action_delete').click(__bind(function(e) {
          var $selectedMessages, message;
          $selectedMessages = this.$messageList.find('.selected');
          message = $selectedMessages.length > 1 ? I18n.t('confirm.delete_messages', "Are you sure you want to delete your copy of these messages? This action cannot be undone.") : I18n.t('confirm.delete_message', "Are you sure you want to delete your copy of this message? This action cannot be undone.");
          if (confirm(message)) {
            $selectedMessages.fadeOut('fast');
            return this.inboxAction($(e.currentTarget), {
              loadingNode: this.$selectedConversation,
              data: {
                remove: (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = $selectedMessages.length; _i < _len; _i++) {
                    message = $selectedMessages[_i];
                    _results.push($(message).data('id'));
                  }
                  return _results;
                })()
              },
              success: __bind(function($node, data) {
                var ignoreList;
                ignoreList = '.selected, .generated';
                if (this.scope === 'sent') {
                  ignoreList += ', .other';
                }
                if (this.$messageList.find('> li').not(ignoreList).length) {
                  $selectedMessages.remove();
                  return this.updateConversation($node, data);
                } else {
                  return this.removeConversation($node);
                }
              }, this),
              error: __bind(function() {
                return $selectedMessages.show();
              }, this)
            });
          }
        }, this));
        return $('#action_forward').click(__bind(function(e) {
          var $preview;
          this.$forwardForm.find("input[name!=authenticity_token], textarea").val('').change();
          $preview = this.$forwardForm.find('ul.messages').first();
          $preview.html('');
          $preview.html(this.$messageList.find('> li.selected.forwardable').clone(true).removeAttr('id').removeClass('self'));
          $preview.find('> li').removeClass('selected odd').find('> :checkbox').attr('checked', true).attr('name', 'forwarded_message_ids[]').val(function() {
            return $(this).closest('li').data('id');
          });
          $preview.find('> li').last().addClass('last');
          return this.$forwardForm.css('max-height', ($(window).height() - 300) + 'px').dialog('close').dialog({
            position: 'center',
            height: 'auto',
            width: 510,
            title: I18n.t('title.forward_messages', 'Forward Messages'),
            buttons: [
              {
                text: I18n.t('buttons.send_message', 'Send'),
                click: function() {
                  return $(this).submit();
                }
              }, {
                text: I18n.t('#buttons.cancel', 'Cancel'),
                click: function() {
                  return $(this).dialog('close');
                }
              }
            ],
            close: __bind(function() {
              return $('#forward_recipients').data('token_input').input.blur();
            }, this)
          });
        }, this));
      };
      _Class.prototype.initializeTemplates = function() {
        var nextAttachmentIndex;
        $('#conversation_blank .audience, #create_message_form .audience').click(__bind(function(e) {
          var $others;
          if (($others = $(e.target).closest('span.others').find('> span')).length) {
            if (!$(e.target).closest('span.others > span').length) {
              $('span.others > span').not($others).hide();
              $others.toggle();
              $others.css('left', $others.parent().position().left);
              $others.css('top', $others.parent().height() + $others.parent().position().top);
            }
            e.preventDefault();
            return false;
          }
        }, this));
        nextAttachmentIndex = 0;
        $('#action_add_attachment').click(__bind(function(e) {
          var $attachment;
          e.preventDefault();
          $attachment = $("#attachment_blank").clone(true);
          $attachment.attr('id', null);
          $attachment.find("input[type='file']").attr('name', 'attachments[' + (nextAttachmentIndex++) + ']');
          $('#attachment_list').append($attachment);
          $attachment.slideDown("fast", __bind(function() {
            return this.resize();
          }, this));
          return false;
        }, this));
        $("#attachment_blank a.remove_link").click(__bind(function(e) {
          var $attachment;
          e.preventDefault();
          $attachment = $(e.currentTarget).closest(".attachment");
          $attachment.slideUp("fast", __bind(function() {
            this.resize();
            return $attachment.remove();
          }, this));
          return false;
        }, this));
        $('#action_media_comment').click(__bind(function(e) {
          e.preventDefault();
          return $("#create_message_form .media_comment").mediaComment('create', 'any', __bind(function(id, type) {
            $("#media_comment_id").val(id);
            $("#media_comment_type").val(type);
            $("#create_message_form .media_comment").show();
            return $("#action_media_comment").hide();
          }, this));
        }, this));
        return $('#create_message_form .media_comment a.remove_link').click(__bind(function(e) {
          e.preventDefault();
          $("#media_comment_id").val('');
          $("#media_comment_type").val('');
          $("#create_message_form .media_comment").hide();
          return $("#action_media_comment").show();
        }, this));
      };
      _Class.prototype.buildContextInfo = function(data) {
        var contextInfo, match, termInfo;
        match = data.id.match(/^(course|section)_(\d+)$/);
        if (match) {
          termInfo = this.contexts["" + match[1] + "s"][match[2]];
        }
        contextInfo = data.context_name || '';
        contextInfo = contextInfo.length < 40 ? contextInfo : contextInfo.substr(0, 40) + '...';
        if (termInfo != null ? termInfo.term : void 0) {
          contextInfo = contextInfo ? "" + contextInfo + " - " + termInfo.term : termInfo.term;
        }
        if (contextInfo) {
          return $('<span />', {
            "class": 'context_info'
          }).text("(" + contextInfo + ")");
        } else {
          return '';
        }
      };
      _Class.prototype.lockUntilUserInput = function() {
        return setTimeout(__bind(function() {
          return this.$inbox.disableWhileLoading(this.untilUserInput());
        }, this));
      };
      _Class.prototype.untilUserInput = function() {
        var d;
        d = $.Deferred();
        $('body').one('keydown click', d.resolve);
        return d.promise();
      };
      _Class.prototype.initializeTokenInputs = function() {
        var buildPopulator, everyoneText, filter, filterInput, noResultsText, placeholderText, selectAllText, tokenInput;
        buildPopulator = __bind(function(pOptions) {
          if (pOptions == null) {
            pOptions = {};
          }
          return __bind(function(selector, $node, data, options) {
            var $b, $contextInfo, $img, $name, $span, text;
            if (options == null) {
              options = {};
            }
            data.id = "" + data.id;
            if (data.avatar_url) {
              $img = $('<img class="avatar" />');
              $img.attr('src', data.avatar_url);
              $node.append($img);
            }
            $b = $('<b />');
            $b.text(data.name);
            $name = $('<span />', {
              "class": 'name'
            });
            if (!options.parent) {
              $contextInfo = this.buildContextInfo(data);
            }
            $name.append($b, $contextInfo);
            $span = $('<span />', {
              "class": 'details'
            });
            if (data.common_courses != null) {
              $span.text(this.contextList({
                courses: data.common_courses,
                groups: data.common_groups
              }));
            } else if (data.type && (data.user_count != null)) {
              $span.text(I18n.t('people_count', 'person', {
                count: data.user_count
              }));
            } else if (data.item_count != null) {
              if (data.id.match(/_groups$/)) {
                $span.text(I18n.t('groups_count', 'group', {
                  count: data.item_count
                }));
              } else if (data.id.match(/_sections$/)) {
                $span.text(I18n.t('sections_count', 'section', {
                  count: data.item_count
                }));
              }
            } else if (data.subText) {
              $span.text(data.subText);
            }
            $node.append($name, $span);
            $node.attr('title', data.name);
            text = data.name;
            if (options.parent) {
              if (data.selectAll && data.noExpand) {
                text = options.parent.data('text');
              } else if (data.id.match(/_\d+_/)) {
                text = I18n.beforeLabel(options.parent.data('text')) + " " + text;
              }
            }
            $node.data('text', text);
            $node.data('id', data.type === 'context' || !pOptions.prefixUserIds ? data.id : "user_" + data.id);
            data.rootId = options.ancestors[0];
            $node.data('user_data', data);
            $node.addClass(data.type ? data.type : 'user');
            if (options.level > 0 && selector.options.showToggles) {
              $node.prepend('<a class="toggle"><i></i></a>');
              if (!data.item_count) {
                $node.addClass('toggleable');
              }
            }
            if (data.type === 'context' && !data.noExpand) {
              $node.prepend('<a class="expand"><i></i></a>');
              return $node.addClass('expandable');
            }
          }, this);
        }, this);
        placeholderText = I18n.t('recipient_field_placeholder', "Enter a name, course, or group");
        noResultsText = I18n.t('no_results', 'No results found');
        everyoneText = I18n.t('enrollments_everyone', "Everyone");
        selectAllText = I18n.t('select_all', "Select All");
        $('.recipients').tokenInput({
          placeholder: placeholderText,
          added: __bind(function(data, $token, newToken) {
            var $details, currentData, _ref;
            data.id = "" + data.id;
            if (newToken && data.rootId) {
              $token.append("<input type='hidden' name='tags[]' value='" + data.rootId + "'>");
            }
            if (newToken && data.type) {
              $token.addClass(data.type);
              if (data.user_count != null) {
                $token.addClass('details');
                $details = $('<span />');
                $details.text(I18n.t('people_count', 'person', {
                  count: data.user_count
                }));
                $token.append($details);
              }
            }
            if (!data.id.match(/^(course|group)_/)) {
              data = $.extend({}, data);
              delete data.avatar_url;
              currentData = (_ref = this.userCache[data.id]) != null ? _ref : {};
              return this.userCache[data.id] = $.extend(currentData, data);
            }
          }, this),
          selector: {
            messages: {
              noResults: noResultsText
            },
            populator: buildPopulator(),
            limiter: __bind(function(options) {
              if (options.level > 0) {
                return -1;
              } else {
                return 5;
              }
            }, this),
            showToggles: true,
            preparer: __bind(function(postData, data, parent) {
              var context;
              context = postData.context;
              if (!postData.search && context && data.length > 1) {
                if (context.match(/^(course|section)_\d+$/)) {
                  return data.unshift({
                    id: "" + context + "_all",
                    name: everyoneText,
                    user_count: parent.data('user_data').user_count,
                    type: 'context',
                    avatar_url: parent.data('user_data').avatar_url,
                    selectAll: true
                  });
                } else if (context.match(/^((course|section)_\d+_.*|group_\d+)$/) && !context.match(/^course_\d+_(groups|sections)$/)) {
                  return data.unshift({
                    id: context,
                    name: selectAllText,
                    user_count: parent.data('user_data').user_count,
                    type: 'context',
                    avatar_url: parent.data('user_data').avatar_url,
                    selectAll: true,
                    noExpand: true
                  });
                }
              }
            }, this),
            baseData: {
              synthetic_contexts: 1
            },
            browser: {
              data: {
                per_page: -1,
                type: 'context'
              }
            }
          }
        });
        tokenInput = $('#recipients').data('token_input');
        tokenInput.$fakeInput.css('width', '100%');
        tokenInput.change = __bind(function(tokens) {
          var user, _ref;
          if (tokens.length > 1 || ((_ref = tokens[0]) != null ? _ref.match(/^(course|group)_/) : void 0)) {
            if (!this.$form.find('#group_conversation_info').is(':visible')) {
              this.$form.find('#group_conversation').attr('checked', false);
            }
            this.$form.find('#group_conversation_info').show();
            this.$form.find('#user_note_info').hide();
          } else {
            this.$form.find('#group_conversation').attr('checked', false);
            this.$form.find('#group_conversation_info').hide();
            this.$form.find('#user_note_info').showIf((user = this.userCache[tokens[0]]) && this.canAddNotesFor(user));
          }
          return this.resize();
        }, this);
        $('#context_tags').tokenInput({
          placeholder: placeholderText,
          added: __bind(function(data, $token, newToken) {
            return $token.prevAll().remove();
          }, this),
          tokenWrapBuffer: 80,
          selector: {
            messages: {
              noResults: noResultsText
            },
            populator: buildPopulator({
              prefixUserIds: true
            }),
            limiter: __bind(function(options) {
              return 5;
            }, this),
            preparer: __bind(function(postData, data, parent) {
              var context, filterText;
              context = postData.context;
              if (!postData.search && context && data.length > 0 && context.match(/^(course|group)_\d+$/)) {
                if (data.length > 1 && context.match(/^course_/)) {
                  data.unshift({
                    id: "" + context + "_all",
                    name: everyoneText,
                    user_count: parent.data('user_data').user_count,
                    type: 'context',
                    avatar_url: parent.data('user_data').avatar_url
                  });
                }
                filterText = context.match(/^course/) ? I18n.t('filter_by_course', 'Fiter by this course') : I18n.t('filter_by_group', 'Fiter by this group');
                return data.unshift({
                  id: context,
                  name: parent.data('text'),
                  type: 'context',
                  avatar_url: parent.data('user_data').avatar_url,
                  subText: filterText,
                  noExpand: true
                });
              }
            }, this),
            baseData: {
              synthetic_contexts: 1,
              types: ['course', 'user', 'group'],
              include_inactive: true
            },
            browser: {
              data: {
                per_page: -1,
                types: ['context']
              }
            }
          }
        });
        filterInput = $('#context_tags').data('token_input');
        filterInput.change = __bind(function(tokenValues) {
          var newUrl;
          if (this.currentFilter !== tokenValues[0]) {
            newUrl = location.href.replace(/[\?#].*|/g, '');
            if (tokenValues[0]) {
              newUrl += '?filter=' + tokenValues[0];
            }
            filterInput.$input.blur();
            this.lockUntilUserInput();
            return location.href = newUrl;
          }
        }, this);
        if (filter = this.options.INITIAL_FILTER) {
          this.currentFilter = filter.id;
          return filterInput.addToken({
            value: filter.id,
            text: filter.name,
            data: $.extend(true, {}, filter)
          });
        }
      };
      _Class.prototype.initializeConversationsPane = function(conversations) {
        var conversation, _i, _len;
        for (_i = 0, _len = conversations.length; _i < _len; _i++) {
          conversation = conversations[_i];
          this.addConversation(conversation, true);
        }
        this.noMessagesCheck();
        return setTimeout(__bind(function() {
          return this.$conversationList.pageless({
            totalPages: Math.ceil(this.options.CONVERSATIONS_COUNT / this.options.CONVERSATIONS_PER_PAGE),
            container: this.$conversationList,
            params: {
              format: 'json',
              per_page: this.options.CONVERSATIONS_PER_PAGE
            },
            loader: $("#conversations_loader"),
            scrape: __bind(function(data) {
              var conversation, _j, _len2;
              if (typeof data === 'string') {
                try {
                  data = $.parseJSON(data) || [];
                } catch (error) {
                  data = [];
                }
                for (_j = 0, _len2 = data.length; _j < _len2; _j++) {
                  conversation = data[_j];
                  this.addConversation(conversation, true);
                }
              }
              this.$conversationList.append($("#conversations_loader"));
              return false;
            }, this)
          }, 1);
        }, this));
      };
      _Class.prototype.initializeAutoResize = function() {
        $(window).resize(__bind(function() {
          return this.resize();
        }, this));
        return setTimeout(__bind(function() {
          return this.resize();
        }, this));
      };
      _Class.prototype.initializeHashChange = function() {
        return $(window).bind('hashchange', __bind(function() {
          var $c, hash, match, params;
          hash = location.hash;
          if (match = hash.match(/^#\/conversations\/(\d+)(\?(.*))?/)) {
            params = match[3] ? this.parseQueryString(match[3]) : {};
            if (($c = $('#conversation_' + match[1])) && $c.length) {
              return this.selectConversation($c, params);
            } else {
              return this.selectUnloadedConversation(match[1], params);
            }
          } else {
            params = {};
            if (match = hash.match(/^#\/conversations\?(.*)$/)) {
              params = this.parseQueryString(match[1]);
            }
            return this.selectConversation(null, params);
          }
        }, this)).triggerHandler('hashchange');
      };
      return _Class;
    })();
  });
}).call(this);
