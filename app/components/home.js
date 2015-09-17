var m        = require('mithril');
var filters  = require('components/filters');
var map      = require('components/map');
var ranking  = require('components/ranking');
var details  = require('components/details');
var homeVM   = require('models/homeVM');

var home = {
  controller:  function() {
    events.subscribe('toggleRanking', home.onToggleRanking);
  },

  view: function(ctrl) {
    return [
      m('.main-card', [
        m.component(map),
        m.component(ranking),
        m.component(filters),
      ]),
      m.component(details),
    ];
  },

  onToggleRanking: function() {
    var mapEl  = document.getElementById('map');
    var rankEl = document.getElementById('ranking');

    var mapWidth   = homeVM.rankingOpen() ? '40%' : '70%';
    var rankWidth  = homeVM.rankingOpen() ? '30%' : '0';
    var rankMargin = homeVM.rankingOpen() ? '0'   : '-2em';

    Velocity(mapEl, {width: mapWidth}, {duration: 200, complete: map.resize});
    Velocity(rankEl, {width: rankWidth, marginRight: rankMargin}, {duration: 200});
  },
};

module.exports = home;
