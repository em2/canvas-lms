(function() {
  require(['jquery', 'gradebook_uploads'], function($, GradebookUploader) {
    return $(GradebookUploader.handleThingsNeedingToBeResolved);
  });
}).call(this);
