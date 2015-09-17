var m = require('mithril');

var ranking = {
  controller: function() {
  },

  view: function(ctrl) {
    return m('#ranking', [
      m('h2', 'RANKING'),
      m('.small-divider'),
    ]);
  }
};

module.exports = ranking;
