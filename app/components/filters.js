var m = require('mithril');
var switchBtn = require('components/switchBtn');

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
        m('.indicators-header', [
          m('h3', 'INDICADORES'),
          m.component(switchBtn, {
            btnId: 'ranking-toggle',
            onclick: m.withAttr("checked", filters.homeVM.rankingOpen),
            onchange: filters.homeVM.onRankingToggle,
          }),
          m('span.ranking-toggle-title', 'Ranking'),
        ]),

        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-services][value=services][checked]',
            {onchange: m.withAttr('value', filters.homeVM.indicator)}),
          m('label[for=indicator-services]', 'Serviços oferecidos pelo hospital'),
        ]),
        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-equipments][value=equipments]',
            {onchange: m.withAttr('value', filters.homeVM.indicator)}),
          m('label[for=indicator-equipments]', 'Equipamentos'),
        ]),
        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-physicians][value=physicians]',
            {onchange: m.withAttr('value', filters.homeVM.indicator)}),
          m('label[for=indicator-physicians]', 'Atenção dos médicos'),
        ]),
        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-waiting-time][value=waiting-time]',
            {onchange: m.withAttr('value', filters.homeVM.indicator)}),
          m('label[for=indicator-waiting-time]', 'Tempo de espera'),
        ]),

      ]), // end .indicators

      m('.separator'),
      m('h3', 'Legenda'),
      m('.subtitles', [
        m('.item', [
          m('.circle.green'),
          m('.label', 'Ótimo'),
        ]),

        m('.item', [
          m('.circle.yellow'),
          m('.label', 'Regular'),
        ]),

        m('.item', [
          m('.circle.red'),
          m('.label', 'Ruim'),
        ]),

      ]),
    ]);
  }
};

module.exports = filters;
