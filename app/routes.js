var home = require('components/home');

var m = require('mithril');

var routes  = {};

routes.init = function () {
  m.route(document.getElementById('main'), '/', {
    '/': home,
  });
};

module.exports = routes;
