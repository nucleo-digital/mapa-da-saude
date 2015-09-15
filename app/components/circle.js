var m = require('mithril');

var circle = {
  controller: function(args) {
  },

  view: function(ctrl, args) {
    var cls = (args.class) ? ('.' + args.class) : '';
    return m('.circle' + cls, [m('.inner-circle')])
  }
}

module.exports = circle;
