var m = require('mithril');
var c = require('config');
var _ = require('underscore');
var lunr = require('lunr');

var homeVM = require('models/homeVM');

var _hospitais = []; // cache

var index =  lunr(function () {
  this.field('name');
  this.ref('id');
});


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

          // add to lunr index
          index.add(hosp);
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

  indicatorValue: function(hosp) {
    return hosp.ratings[homeVM.indicator()];
  },

  indicatorColor: function(hosp) {
    var value = Hospital.indicatorValue(hosp);

    if      (value >= 7)  return 'green';
    else if (value <= 4)  return 'red';
    else                  return 'yellow';
  },

  search: function(term) {
    return _.map(index.search(term), function(res) {
      var ref = res.ref;
      return _.find(_hospitais, function(h) { return h.id == ref });
    });
  },

  findById: function(id) {
    return _.find(_hospitais, function(h) { return h.id == id });
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
