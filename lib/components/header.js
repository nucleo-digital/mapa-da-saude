var m = require('mithril');

var header = {
  controller: function() {

  },

  view: function() {
    return m('.menu', [
        m('span.menu-item', "ESCUTA ATIVA DA SAÚDE"),
        m('span.menu-item.title', [ m('a[href=/]', { config: m.route }, 'MAPA DA SAÚDE') ]),
        m('a.menu-item.right[href=/contato]', { config: m.route }, 'Contato'),
        m('a.menu-item.right[href=/sobre]',   { config: m.route }, 'Sobre'),
    ]);
  }
};

module.exports = header;

