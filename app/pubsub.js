
// Global event bus
events = (function(){
  var handlers = {};
  var props = handlers.hasOwnProperty;

  var exists = function (evt) {
    return props.call(handlers, evt);
  };

  return {
    subscribe: function(evt, listener) {
      if(!exists(evt)) handlers[evt] = [];

      var index = handlers[evt].push(listener) -1;
      return {
        remove: function() {
          delete handlers[evt][index];
        }
      };
    },

    publish: function(evt, args) {
      if(!exists(evt)) return;

      // trigger handlers
      handlers[evt].forEach(function(handler) {
          handler(args != undefined ? args : {});
      });
    }
  };
})();

module.exports = events;
