var m = require('mithril');

var ranking = {
  controller: function(args) {
    ranking.homeVM = args.homeVM;
  },

  view: function(ctrl) {
    return m('#ranking', [
      m('h2', 'RANKING'),
      m('.small-divider'),

    ]);
  }
};

module.exports = ranking;
