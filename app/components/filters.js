var m = require('mithril');
var switchBtn = require('components/switchBtn');
var homeVM = require('models/homeVM');

var filters = {
  controller: function() {
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
            onclick: m.withAttr("checked", homeVM.rankingOpen),
            onchange: homeVM.toggleRanking,
          }),
          m('span.ranking-toggle-title', 'Ranking'),
        ]),

        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-services][value=services][checked]',
            {
              onclick: m.withAttr('value', homeVM.indicator),
              onchange: homeVM.changeIndicator,
            }
          ),
          m('label[for=indicator-services]', 'Serviços oferecidos pelo hospital'),
        ]),
        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-equipments][value=equipments]', {
              onclick: m.withAttr('value', homeVM.indicator),
              onchange: homeVM.changeIndicator,
          }),
          m('label[for=indicator-equipments]', 'Equipamentos'),
        ]),
        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-physicians][value=physicians]', {
              onclick: m.withAttr('value', homeVM.indicator),
              onchange: homeVM.changeIndicator,
          }),
          m('label[for=indicator-physicians]', 'Atenção dos médicos'),
        ]),
        m('.indicators-input', [
          m('input[type=radio][name=indicator][id=indicator-waitingTime][value=waitingTime]', {
              onclick: m.withAttr('value', homeVM.indicator),
              onchange: homeVM.changeIndicator,
          }),
          m('label[for=indicator-waitingTime]', 'Tempo de espera'),
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
