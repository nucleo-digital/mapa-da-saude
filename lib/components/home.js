var m = require('mithril');
var map = require('components/map');
var filters = require('components/filters');

var home = {
    controller:  function() {
    },

    view: function(ctrl) {
        return m('.main-card', [
            m.component(map),
            m.component(filters)
        ]);
    }
};

module.exports = home;
