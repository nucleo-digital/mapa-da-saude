var m = require('mithril');
var c = require('config');
var _ = require('underscore');

var Hospital = require('models/hospital');
var EM = 12; // main.styl -> font-size: 12px

var map = {
  vm: {
    init: function() {
      this.mapEl = null;
    },

    buildMarker: function(hosp) {
      return L.marker(hosp.pos, {
        icon: L.divIcon({
          className: ('circle-marker hospital-' + hosp.id),
          iconSize: 2 * EM,
          html: '<span class="inner-content">42</span>'
        }),
        title: hosp.name,
      });
    },

    mapResize: function() {
      map.vm.mapEl.invalidateSize(true);
    },

    setActivePoint: function(hosp) {
      this.resetPoints();

      var el = document.getElementsByClassName('hospital-' + hosp.id)[0];
      if (el) {
        el.className += ' circle-marker-active'
        Velocity(el.children[0], 'fadeIn', {display: 'inline-block'});
      }

      Hospital.activePoint(hosp);
      this.mapEl.setView(hosp.pos);

      m.redraw(true);
    },

    setStyleForActivePoint: function(el, hosp) {
    },

    resetPoints: function() {
      _.each(document.getElementsByClassName('circle-marker-active'), function(el) {
        el.className = el.className.replace('circle-marker-active', '');
        el.children[0].style.display = 'none';
      });
    },
  },

  controller: function() {
    var ctrl = this;
    map.vm.init()

    ctrl.drawMap = function(element, isInitialized) {
      if (isInitialized) return;

      L.mapbox.accessToken = c.getMapboxToken();
      map.vm.mapEl = L.mapbox.map('map', 'mapbox.emerald').setZoom(11);

      ctrl.loadData()
    };

    ctrl.loadData = function() {
      Hospital.all().then(function(hospitais) {
        _.each(hospitais, function(hosp) {
          map.vm.buildMarker(hosp)
            .on('click', function() { map.vm.setActivePoint(hosp); return true; })
            .addTo(map.vm.mapEl);
        });

        // TODO change-me
        // set and arbitrary point to start
        map.vm.setActivePoint(hospitais[4]);
      });
    };
  },

  view: function(ctrl) {
    return m('#map', {config: ctrl.drawMap})
  }
};

module.exports = map;
