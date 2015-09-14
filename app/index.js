/*globals app:true */

// require mapbox as soon as possible
require('mapbox.js')

var c = require('config');
var m = require('mithril');

var routes = require('routes');

var header = require('components/header');
var footer = require('components/footer');

m.render(document.getElementById('container'), [
  m.component(header),
  m('#main'),
  m.component(footer),
]);

routes.init();