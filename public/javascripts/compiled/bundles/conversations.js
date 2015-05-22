(function() {
  require(['compiled/conversations/Inbox'], function(Inbox) {
    return new Inbox(ENV.CONVERSATIONS);
  });
}).call(this);
