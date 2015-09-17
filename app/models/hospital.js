var m = require('mithril');
var c = require('config');
var _ = require('underscore');

var _hospitais = []; // cache

var Hospital = {

  all: function() {
    if (_hospitais.length > 0) {  // cached
      var deferred = m.deferred();  // use deferred to keep same interface usage
      deferred.resolve(_hospitais);
      return deferred.promise;

    } else {
      return m.request({method: 'get', url: '/json/hospitais.json'}).then(function(hospitais) {
        _.each(hospitais, function(hosp) {
          hosp.pos = [_convertAngleToFloat(hosp.lat), _convertAngleToFloat(hosp.lon)];
          hosp.elementID = 'hospital-' + hosp.id;
        });

        _hospitais = hospitais;  // cache result
        return hospitais;
      });
    }
  },

  each: function(fn) {
    var deferred = m.deferred();

    Hospital.all().then(function(hospitais) {
        _.each(hospitais, fn);

        deferred.resolve(hospitais);
    });
    return deferred.promise;
  },

};

var _convertAngleToFloat = function(point) {
    //Example: 17.21.18S
    var multiplier = (point.indexOf("S") > -1  || point.indexOf("O") > -1) ? -1 : 1; //handle south and west
    point = point.replace('°', '#').replace('"', '#').replace("'", '#');
    point = point.replace(/[^0-9.#]/g, ""); //remove the characters

    var pointArray = point.split('#'); //split the string.

    //Decimal degrees =
    //   whole number of degrees,
    //   plus minutes divided by 60,
    //   plus seconds divided by 3600

    var degrees = parseFloat(pointArray[0]);
    var minutes = parseFloat(pointArray[1]) / 60;
    var seconds = parseFloat(pointArray[2]) / 3600;

    return (degrees + minutes + seconds) * multiplier;
};

module.exports = Hospital;
