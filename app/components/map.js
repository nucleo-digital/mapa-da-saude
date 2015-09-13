var m = require('mithril');

var map = {
  controller: function() {
    this.drawMap = function(element, isInitialized) {
      if (isInitialized) return;

      L.mapbox.accessToken = 'pk.eyJ1IjoiYW5kZXJzb25jYXJkb3NvIiwiYSI6ImZlM' +
                             'zY1ZmUxMDBjZTZmMGI3ZDQ4MmRhOWFlZjdjMzQ5In0.Z' +
                             'ABI2r0BxiN4sdntoU385Q';
      L.mapbox.map('map', 'mapbox.emerald');
    };
  },

  view: function(ctrl) {
    return m('#map', {config: ctrl.drawMap})
  }
};

module.exports = map;
