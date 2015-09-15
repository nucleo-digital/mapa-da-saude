var m = require('mithril');

var convertDegreeAngleToDouble = function(point) {
    //Example: 17.21.18S
    var multiplier = (point.indexOf("S") > -1  || point.indexOf("O") > -1) ? -1 : 1; //handle south and west
    point = point.replace('°', '#').replace('"', '#').replace("'", '#');
    point = point.replace(/[^0-9.#]/g, ""); //remove the characters
    console.log(point);

    var pointArray = point.split('#'); //split the string.
    console.log(pointArray);

    //Decimal degrees =
    //   whole number of degrees,
    //   plus minutes divided by 60,
    //   plus seconds divided by 3600

    var degrees = parseFloat(pointArray[0]);
    var minutes = parseFloat(pointArray[1]) / 60;
    var seconds = parseFloat(pointArray[2]) / 3600;

    return (degrees + minutes + seconds) * multiplier;
};

pos = ["7°13'33.20\"S", "39°19'31.70\"O"]; //lat, long

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

    var npos = pos.map(convertDegreeAngleToDouble);
    console.log('npos', npos);


    _this.drawMap = function(element, isInitialized) {
      if (isInitialized) return;
      console.log('drawMap')
      L.mapbox.accessToken = 'pk.eyJ1IjoiYW5kZXJzb25jYXJkb3NvIiwiYSI6ImZlM' +
                             'zY1ZmUxMDBjZTZmMGI3ZDQ4MmRhOWFlZjdjMzQ5In0.Z' +
                             'ABI2r0BxiN4sdntoU385Q';
      map.vm.mapEl = L.mapbox.map('map', 'mapbox.emerald').setView(npos, 10);

      _this.add()
    };

    _this.add = function() {

      var circleIcon = L.divIcon({
        className: 'circle-icon',
        html: '<div class="inner-circle"></div>',
        iconSize: [12, 12],
      });
      L.marker(npos, {icon: circleIcon}).addTo(map.vm.mapEl);
    };
  },

  view: function(ctrl) {
    return m('#map', {config: ctrl.drawMap})
  }
};

module.exports = map;
