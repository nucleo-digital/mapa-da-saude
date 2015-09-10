var m = require('mithril');

var home = {
  controller:  function() {
    ctrl = this;

    ctrl.msg = m.prop("Dashboard da saúde - /home");
  },

  view: function(ctrl) {
    return m('h1#msg', ctrl.msg());
  }
};

module.exports = home;
