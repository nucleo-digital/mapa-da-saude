var m = require('mithril');

var filters = {
  controller: function() {
  },

  view: function(ctrl) {
    return m('#filters', [m('span', 'Filtros')]);
  }
};

module.exports = filters;
