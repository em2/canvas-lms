(function() {
  var __slice = Array.prototype.slice;
  define(['vendor/handlebars.vm', 'i18nObj', 'jquery', 'str/htmlEscape', 'compiled/util/semanticDateRange', 'jquery.instructure_date_and_time', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins'], function(Handlebars, I18n, $, htmlEscape, semanticDateRange) {
    var fn, name, _ref;
    _ref = {
      t: function(key, defaultValue, options) {
        var value, wrappers, _ref;
        wrappers = {};
        options = (_ref = options != null ? options.hash : void 0) != null ? _ref : {};
        for (key in options) {
          value = options[key];
          if (key.match(/^w\d+$/)) {
            wrappers[new Array(parseInt(key.replace('w', '')) + 2).join('*')] = value;
            delete options[key];
          }
        }
        if (wrappers['*']) {
          options.wrapper = wrappers;
        }
        if (!(this instanceof String || typeof this === 'string')) {
          options = $.extend(options, this);
        }
        return I18n.scoped(options.scope).t(key, defaultValue, options);
      },
      hiddenIf: function(condition) {
        if (condition) {
          return " display:none; ";
        }
      },
      hiddenUnless: function(condition) {
        if (!condition) {
          return " display:none; ";
        }
      },
      semanticDateRange: function() {
        return new Handlebars.SafeString(semanticDateRange.apply(null, arguments));
      },
      friendlyDatetime: function(datetime, _arg) {
        var parsed, pubdate;
        pubdate = _arg.hash.pubdate;
        parsed = $.parseFromISO(datetime);
        return new Handlebars.SafeString("<time title='" + parsed.datetime_formatted + "' datetime='" + (parsed.datetime.toISOString()) + "' " + (pubdate ? 'pubdate' : void 0) + ">" + ($.friendlyDatetime(parsed.datetime)) + "</time>");
      },
      datetimeFormatted: function(isoString) {
        if (!isoString.datetime) {
          isoString = $.parseFromISO(isoString);
        }
        return isoString.datetime_formatted;
      },
      dateToString: function(date, format) {
        if (date == null) {
          date = '';
        }
        return date.toString(format);
      },
      mimeClass: function(contentType) {
        return $.mimeClass(contentType);
      },
      convertNativeToMediaCommentThumnail: function(html) {
        var $dummy;
        $dummy = $('<div />').html(html);
        $dummy.find('video.instructure_inline_media_comment,audio.instructure_inline_media_comment').replaceWith(function() {
          return $("<a id='media_comment_" + ($(this).data('media_comment_id')) + "'              data-media_comment_type='" + ($(this).data('media_comment_type')) + "'              class='instructure_inline_media_comment' />");
        });
        return new Handlebars.SafeString($dummy.html());
      },
      newlinesToBreak: function(string) {
        return new Handlebars.SafeString(htmlEscape(string).replace(/\n/g, "<br />"));
      },
      ifEqual: function() {
        var arg, args, inverse, previousArg, _i, _j, _len, _ref;
        previousArg = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), _ref = arguments[_i++], fn = _ref.fn, inverse = _ref.inverse;
        for (_j = 0, _len = args.length; _j < _len; _j++) {
          arg = args[_j];
          if (arg !== previousArg) {
            return inverse(this);
          }
          previousArg = arg;
        }
        return fn(this);
      },
      ifAll: function() {
        var arg, args, inverse, _i, _j, _len, _ref;
        args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), _ref = arguments[_i++], fn = _ref.fn, inverse = _ref.inverse;
        for (_j = 0, _len = args.length; _j < _len; _j++) {
          arg = args[_j];
          if (!arg) {
            return inverse(this);
          }
        }
        return fn(this);
      },
      eachWithIndex: function(context, options) {
        var ctx, index, inverse, ret;
        fn = options.fn;
        inverse = options.inverse;
        ret = '';
        if (context && context.length > 0) {
          for (index in context) {
            ctx = context[index];
            ctx._index = index;
            ret += fn(ctx);
          }
        } else {
          ret = inverse(this);
        }
        return ret;
      },
      eachProp: function(context, options) {
        var prop;
        return ((function() {
          var _results;
          _results = [];
          for (prop in context) {
            _results.push(options.fn({
              property: prop,
              value: context[prop]
            }));
          }
          return _results;
        })()).join('');
      }
    };
    for (name in _ref) {
      fn = _ref[name];
      Handlebars.registerHelper(name, fn);
    }
    return Handlebars;
  });
}).call(this);
