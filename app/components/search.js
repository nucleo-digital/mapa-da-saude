var m = require('mithril');

var autoComplete = require('auto-complete/auto-complete');


var search = {
  controller: function() {
  },

  view: function() {
    return m('.search', [
      m('.icon', [m('img[src=img/search.png]')]),
      m('input[placeholder="Encontre uma unidade"]', {config: search.drawAutocomplete}),
    ]);
  },

  drawAutocomplete: function(element, isInitialized) {
    if(isInitialized) return;

    console.log('init autocomplete');
  },
};

module.exports = search;
