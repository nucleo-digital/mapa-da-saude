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
}

module.exports = homeVM;
