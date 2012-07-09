(function() {
  define(['compiled/backbone-ext/Backbone', 'use!underscore'], function(Backbone, _) {
    Backbone.syncWithoutMultipart = Backbone.sync;
    Backbone.syncWithMultipart = function(method, model, options) {
      var $form, $iframe, callback, el, httpMethod, iframeId, toForm, _ref;
      iframeId = 'file_upload_iframe_' + (new Date()).getTime();
      $iframe = $("<iframe id='" + iframeId + "' name='" + iframeId + "' ></iframe>").hide();
      httpMethod = {
        create: 'POST',
        update: 'PUT',
        "delete": 'DELETE',
        read: 'GET'
      }[method];
      toForm = function(object, nested) {
        var inputs;
        inputs = _.map(object, function(attr, key) {
          var $orig;
          if (_.isElement(attr)) {
            $orig = $(attr);
            $orig.after($orig.clone(true));
            return attr;
          } else if (!_.isEmpty(attr) && (_.isArray(attr) || typeof attr === 'object')) {
            return toForm(attr, key);
          } else if (!("" + key).match(/^_/) && (attr != null) && typeof attr !== 'object' && typeof attr !== 'function') {
            return $("<input type='hidden' name='" + key + "' value='" + attr + "' />")[0];
          }
        });
        return _.flatten(inputs);
      };
      $form = $("<form enctype='multipart/form-data' target='" + iframeId + "' action='" + ((_ref = options.url) != null ? _ref : model.url()) + "' method='POST'>\n  <input type='hidden' name='_method' value='" + httpMethod + "' />\n  <input type='hidden' name='authenticity_token' value='" + ENV.AUTHENTICITY_TOKEN + "' />\n</form>").hide();
      $form.prepend((function() {
        var _i, _len, _ref2, _results;
        _ref2 = toForm(model);
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          el = _ref2[_i];
          if (el) {
            _results.push(el);
          }
        }
        return _results;
      })());
      $(document.body).prepend($iframe, $form);
      callback = function() {
        var iframeBody, response, _ref2;
        iframeBody = ($iframe[0].contentDocument || $iframe[0].contentWindow.document).body;
        response = $.parseJSON($(iframeBody).text());
        response = (_ref2 = response.objects) != null ? _ref2 : response;
        if (iframeBody.className === "error") {
          if (typeof options.error === "function") {
            options.error(response);
          }
        } else {
          if (typeof options.success === "function") {
            options.success(response);
          }
        }
        $iframe.remove();
        return $form.remove();
      };
      $iframe[0].onreadystatechange = function() {
        if (this.readyState === 'complete') {
          return callback();
        }
      };
      $iframe[0].onload = callback;
      return $form[0].submit();
    };
    return Backbone.sync = function(method, model, options) {
      if (options != null ? options.multipart : void 0) {
        return Backbone.syncWithMultipart(method, model, options);
      } else {
        return Backbone.syncWithoutMultipart(method, model, options);
      }
    };
  });
}).call(this);
