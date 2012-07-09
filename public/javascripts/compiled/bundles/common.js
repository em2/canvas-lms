(function() {
  require(['compiled/widget/courseList', 'compiled/helpDialog', 'translations/_core_en', 'jquery.ajaxJSON', 'vendor/firebugx', 'jquery.google-analytics', 'vendor/swfobject/swfobject', 'reminders', 'jquery.instructure_forms', 'instructure', 'ajax_errors', 'page_views', 'compiled/license_help', 'compiled/behaviors/ujsLinks', 'media_comments', 'order', 'jqueryui/effects/core', 'jqueryui/effects/drop', 'jqueryui/progressbar', 'jqueryui/tabs', 'jquery.fancyplaceholder', 'jqueryui/autocomplete', 'link_enrollment', 'media_comments', 'vendor/jquery.pageless', 'vendor/jquery.scrollTo'], function(courseList, helpDialog) {
    courseList.init();
    return helpDialog.initTriggers();
  });
}).call(this);
