(function() {
  define(['i18n!lib.text_helper', 'str/htmlEscape'], function(I18n, htmlEscape) {
    var AUTO_LINKIFY_PLACEHOLDER, AUTO_LINKIFY_REGEX, th;
    AUTO_LINKIFY_PLACEHOLDER = "LINK-PLACEHOLDER";
    AUTO_LINKIFY_REGEX = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))|(LINK-PLACEHOLDER)/gi;
    return th = {
      quoteClump: function(lines) {
        return "<div class='quoted_text_holder'>        <a href='#' class='show_quoted_text_link'>" + (I18n.t("quoted_text_toggle", "show quoted text")) + "</a>        <div class='quoted_text' style='display: none;'>          " + (lines.join("\n")) + "        </div>      </div>";
      },
      formatMessage: function(message) {
        var idx, line, links, placeholderBlocks, processedLines, quoteBlock, _ref;
        links = [];
        placeholderBlocks = [];
        message = message.replace(AUTO_LINKIFY_REGEX, function(match, i) {
          var link;
          placeholderBlocks.push(match === AUTO_LINKIFY_PLACEHOLDER ? AUTO_LINKIFY_PLACEHOLDER : (link = match, link.slice(0, 4) === 'www' ? link = "http://" + link : void 0, link = encodeURI(link).replace(/'/g, '%27'), links.push(link), "<a href='" + (htmlEscape(link)) + "'>" + (htmlEscape(match)) + "</a>"));
          return AUTO_LINKIFY_PLACEHOLDER;
        });
        message = htmlEscape(message);
        message = message.replace(new RegExp(AUTO_LINKIFY_PLACEHOLDER, 'g'), function(match, i) {
          return placeholderBlocks.shift();
        });
        message = message.replace(/\n/g, '<br />\n');
        processedLines = [];
        quoteBlock = [];
        _ref = message.split("\n");
        for (idx in _ref) {
          line = _ref[idx];
          if (line.match(/^(&gt;|>)/)) {
            quoteBlock.push(line);
          } else {
            if (quoteBlock.length) {
              processedLines.push(th.quoteClump(quoteBlock));
            }
            quoteBlock = [];
            processedLines.push(line);
          }
        }
        if (quoteBlock.length) {
          processedLines.push(th.quoteClump(quoteBlock));
        }
        return message = processedLines.join("\n");
      }
    };
  });
}).call(this);
