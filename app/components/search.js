var m = require('mithril');
var map      = require('components/map');
var Hospital = require('models/hospital');
var autoComplete = require('auto-complete/auto-complete');


var search = {
  controller: function() {
  },

  view: function() {
    return m('.search', [
      m('.icon', [m('img[src=img/search.png]')]),
      m('input#search-input[placeholder="Encontre uma unidade"]', {config: search.drawAutocomplete}),
    ]);
  },

  drawAutocomplete: function(element, isInitialized) {
    if(isInitialized) return;

    new autoComplete({
      selector: 'input#search-input',
      minChars: 1,
      source: function(term, suggest){
        term = term.toLowerCase();
        suggest(Hospital.search(term));
      },
      renderItem: function (item, term){
        var text = item.name;
        term = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + term.split(' ').join('|') + ")", "gi");
        return '<div class="autocomplete-suggestion" data-hospital-id=' + item.id + ' data-val="' + text + '">' + text.replace(re, "<b>$1</b>") + '</div>';
      },
      onSelect: function(e, term, item){
        var hosp = Hospital.findById(item.getAttribute('data-hospital-id'))
        map.setActiveMark(hosp);
      }
    });
  },
};

module.exports = search;
