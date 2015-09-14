var m = require('mithril');
var switchBtn = require('components/switchBtn')

var filters = {
  controller: function() {
  },

  view: function(ctrl) {
    return m('#filters', [
      m('h2', 'FILTROS'),
      m('.small-divider'),
      m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.'),
      m('.indicators', [
        m('h3', 'INDICADORES'),
        m.component(switchBtn, {btnId: 'ranking-toggle'}),
        m('span.ranking-toggle-title', 'Ranking'),
      ]),
    ]);
  }
};

module.exports = filters;
