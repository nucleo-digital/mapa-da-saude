var m = require('mithril');
var switchBtn = require('components/switchBtn')

var filters = {
  controller: function(args) {
    filters.homeVM = args.homeVM;
  },

  view: function(ctrl) {
    return m('#filters', [
      m('h2', 'FILTROS'),
      m('.small-divider'),
      m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.'),

      m('.indicators', [
        m('h3', 'INDICADORES'),
        m.component(switchBtn, {
          btnId: 'ranking-toggle',
          onclick: m.withAttr("checked", filters.homeVM.rankingOpen),
          onchange: filters.homeVM.onRankingToggle,
        }),
        m('span.ranking-toggle-title', 'Ranking'),
      ]),
    ]);
  }
};

module.exports = filters;
