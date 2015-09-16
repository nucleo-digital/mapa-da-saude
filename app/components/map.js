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
          L.circleMarker(hosp.pos, {
              title: hosp.name,
              color: '#4c5768',
              opacity: 1,
              fillColor: "#000",
              fillOpacity: 0,
              weight: 5,
              radius: 7,
          }).addTo(map.vm.mapEl);
        });
      });
    };
  },

  view: function(ctrl) {
    return m('#map', {config: ctrl.drawMap})
  }
};

module.exports = map;
