var m = require('mithril');
var c = require('config');

var Hospital = require('models/hospital');

var map = {
  vm: {
    init: function() {
      this.mapEl = null;
    }
  },

  controller: function(args) {
    var _this = this;
    map.vm.init()

    map.homeVM = args.homeVM;

    _this.drawMap = function(element, isInitialized) {
      if (isInitialized) return;

      L.mapbox.accessToken = c.getMapboxToken();
      map.vm.mapEl = L.mapbox.map('map', 'mapbox.emerald');

      _this.loadData()
    };

    _this.loadData = function() {

      Hospital.all().then(function(hospitais) {
        // set initial position
        map.vm.mapEl.setView(hospitais[4].pos, 11);

        hospitais.forEach(function(hosp) {
          var icon = L.mapbox.marker.icon({
              title: hosp.name,
              'marker-symbol': 'circle-stroked',
              'marker-size': 'small',
              'marker-color': '#4c5768'
          });

          L.marker(hosp.pos, {icon: icon}).addTo(map.vm.mapEl);
        });
      });
    };
  },

  view: function(ctrl) {
    return m('#map', {config: ctrl.drawMap})
  }
};

module.exports = map;
