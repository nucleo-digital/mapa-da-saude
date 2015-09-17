var m = require('mithril');
var c = require('config');
var _ = require('underscore');

var homeVM   = require('models/homeVM');
var Hospital = require('models/hospital');

var EM = 12; // main.styl -> font-size: 12px

var map = {
  el: null,

  controller: function() {
    events.subscribe('changeIndicator', map.onChangeIndicator);
  },

  view: function(ctrl) {
    return m('#map', {config: map.drawMap})
  },

  drawMap: function(element, isInitialized) {
    if (isInitialized) return;

    L.mapbox.accessToken = c.getMapboxToken();
    map.el = L.mapbox.map('map', 'mapbox.emerald').setZoom(12);

    map.loadData();
  },

  loadData: function() {
    Hospital.each(function(hosp) {
      if (hosp.id) {
        map.buildMarker(hosp)
          .on('click', function() { map.setActiveMark(hosp); })
          .addTo(map.el);

      } else {
        console.error("hospital must have an ID");
      }

    }).then(function(hospitais) {
      // TODO change-me
      // set and arbitrary point to start
      map.setActiveMark(hospitais[12]);
    });
  },

  buildMarker: function(hosp) {
    return L.marker(hosp.pos, {
      icon: L.divIcon({
        className: [ 'circle-marker', hosp.elementID, map.indicatorClass(hosp) ].join(' '),
        iconSize: 2 * EM,
        html: '<span class="inner-content">42</span>'
      }),
      title: hosp.name,
    });
  },

  setActiveMark: function(hosp) {
    map.resetMarks();

    // set style for active mark
    var markEl = document.getElementsByClassName(hosp.elementID)[0];
    if (markEl) {
      markEl.className += ' circle-marker-active';
      Velocity(markEl.children[0], 'fadeIn', {display: 'inline-block'});  // show inner content
    }

    homeVM.activeMark(hosp);
    map.el.setView(hosp.pos);

    m.redraw(true);
  },

  resetMarks: function() {
    _.each(document.getElementsByClassName('circle-marker-active'), function(el) {
      el.className = el.className.replace('circle-marker-active', '');
      el.children[0].style.display = 'none';  // hide inner-content
    });
  },

  resize: function() {
    map.el.invalidateSize(true);
  },

  indicatorClass: function(hosp) {
    var color;
    var value = hosp.ratings[homeVM.indicator()];

    if      (value >= 7) { color = 'green'; }
    else if (value <= 4) { color = 'red'; }
    else                 { color = 'yellow'; }

    return 'indicator-' + color;
  },

  onChangeIndicator: function() {
    Hospital.each(function(hosp) {
      var el = document.getElementsByClassName(hosp.elementID)[0];

      // reset color to new indicator
      el.className = el.className.replace(/indicator-(red|green|yellow)/g, map.indicatorClass(hosp));
    });
  },
};

module.exports = map;
