var m = require('mithril');

var switchBtn = {
  controller: function(args) {
  },

  view: function(ctrl, args) {
    return m('.switch-wrapper', [
      m('input.switch-btn[id='+args.btnId+'][type=checkbox]'),
      m('label[for='+args.btnId+']'),
    ]);
  }
};

module.exports = switchBtn;

