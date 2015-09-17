var m = require('mithril');

var homeVM = {
  // is the ranking pane open?
  rankingOpen: m.prop(false),

  // the filter indicator
  indicator: m.prop('services'),

  // active map point/mark
  activeMark: m.prop(),

  toggleRanking: function() {
    events.publish('toggleRanking');
  },

  changeIndicator: function() {
    events.publish('changeIndicator');
  },

  changeActiveMark: function(hosp) {
    events.publish('changeActiveMark', hosp);
  }
}

module.exports = homeVM;
