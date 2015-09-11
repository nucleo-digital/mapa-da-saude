var m = require('mithril');

var footer = {
  controller: function() {
  },

  view: function() {
    return [
        m('.bottom', [
            m('.cc', 'creative commons'),
            m('.github', 'github'),
        ])
    ]
  }
};

module.exports = footer;
