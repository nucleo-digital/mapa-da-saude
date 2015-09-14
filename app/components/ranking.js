var m = require('mithril');

var ranking = {
  controller: function(args) {
    ranking.homeVM = args.homeVM;
  },

  view: function(ctrl) {
    return m('#ranking', [

    ]);
  }
};

module.exports = ranking;
