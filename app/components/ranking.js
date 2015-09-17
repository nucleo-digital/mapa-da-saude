var m = require('mithril');
var _ = require('underscore');

var Hospital = require('models/hospital');
var homeVM   = require('models/homeVM');

var ranking = {
  controller: function() {
  },

  view: function(ctrl) {
    var items = ranking.sortedList().then(function(hosps) {
      return _.map(hosps,  ranking.renderItem);
    });

    return m('#ranking', [
      m('h2', 'RANKING'),
      m('.small-divider'),
      m('ul', items()),
    ]);
  },

  sortedList: function() {
    var defr = m.deferred();

    Hospital.all().then(function(hospitais) {
      defr.resolve(
        _.sortBy(hospitais, function(hosp) { return -hosp.ratings[homeVM.indicator()] })
      );
    });

    return defr.promise;
  },

  renderItem: function(h, idx) {
    return m('li.ranking-item', [
      m('.circle.' + Hospital.indicatorColor(h), [m('.inner-index', idx + 1)]),
      m('.name', h.name)
    ]);
  },
};

module.exports = ranking;
