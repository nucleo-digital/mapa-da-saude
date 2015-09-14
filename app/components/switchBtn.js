var m = require('mithril');

var switchBtn = {
  controller: function(args) {
  },

  view: function(ctrl, args) {
    return m('.switch-wrapper', [
      m('input.switch-btn[id='+args.btnId+'][type=checkbox]', {onclick: args.onclick, onchange: args.onchange}),
      m('label[for='+args.btnId+']'),
    ]);
  }
};

module.exports = switchBtn;

