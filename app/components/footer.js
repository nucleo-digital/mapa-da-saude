var m = require('mithril');

var footer = {
  controller: function() {
  },

  view: function() {
    return m('#footer', [
      m('.top',[
        m('.realization', 'Realização:'),
        m('.sponsor', [m('img[src=img/wb.svg]')]),
        m('.sponsor', [m('img[src=img/ceara.png]')]),
        m('a.social[href=/]', [m('img[src=img/google.png]')]),
        m('a.social[href=/]', [m('img[src=img/twitter.png]')]),
        m('a.social[href=/]', [m('img[src=img/facebook.png]')]),
      ]),
      m('.bottom', [
        m('.cc', [m('img[src=img/cc.svg]'), m('span.cc-note', 'alguns direitos reservados')]),
        m('a.github[href=/]', [m('img.github[src=img/github.png]')]),
      ]),
    ]);
  }
};

module.exports = footer;
