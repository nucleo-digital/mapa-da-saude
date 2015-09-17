var m        = require('mithril');
var filters  = require('components/filters');
var map      = require('components/map');
var ranking  = require('components/ranking');
var Hospital = require('models/hospital');

var home = {
  vm: {
    init: function() {
      var _this = this;

      _this.rankingOpen = m.prop(false);
      _this.indicator = m.prop('service');

      _this.onRankingToggle = function() {
        var mapEl  = document.getElementById('map');
        var rankEl = document.getElementById('ranking');

        var mapWidth   = _this.rankingOpen() ? '40%' : '70%';
        var rankWidth  = _this.rankingOpen() ? '30%' : '0';
        var rankMargin = _this.rankingOpen() ? '0'   : '-2em';

        Velocity(mapEl, {width: mapWidth}, {duration: 200});
        Velocity(rankEl, {width: rankWidth, marginRight: rankMargin}, {duration: 200});
      }
    }
  },

  controller:  function() {
    home.vm.init();
  },

  view: function(ctrl) {
    return m('.main-card', [
      m.component(map),
      m.component(ranking, {homeVM: this.vm}),
      m.component(filters, {homeVM: this.vm}),
      m('.name', Hospital.activePoint().name),
    ]);
  }
};

module.exports = home;
