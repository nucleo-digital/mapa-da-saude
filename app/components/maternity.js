var m = require('mithril');
var _ = require('underscore');
var Chart = require('Chart.js');

LABELS = {
  "pre_natal": {
      "nao": "Não",
      "particular": "particular ou plano de saúde",
      "sus": "pelo SUS",
  },
  "acompanhante": {
      "nao": "Não",
      "mae": "Sim, pela mãe",
      "pai_do_bebe": "Sim, pelo pai do bebê",
      "outros": "Sim, outros",
      "irmao": "Sim, pelo(a) irmão(ã)",
      "companheiro": "Sim, pelo(a) companheiro(a)",
      "amigo": "Sim, por um(a) amigo(a)",
  },
  "sem_acompanhante": {
      "nao_permitiu": "O serviço não permitiu",
      "nao_sabia": "Não sabia que podia",
      "nao_deu_tempo": "Não deu tempo",
      "nao_quis": "Não quis",
      "outros": "Outros",
      "nao_tinha": "Não tinha",
  }
};

COLORS = [
  ["#F7464A", "#FF5A5E"],
  ["#46BFBD", "#5AD3D1"],
  ["#FDB45C", "#FFC870"]
];

var maternity = {
  controller: function(args) {
  },

  view: function(ctrl, args) {
    var drawCB = function(element, isInitialized) {
      return maternity.drawChart(element, isInitialized, args);
    };
    return m('canvas.maternity-chart[width=400][height=400]', {config: drawCB});
  },

  drawChart: function(element, isInitialized, args) {
    if (isInitialized) return;

    var ctx = element.getContext("2d");
    var doughnutChart = new Chart(ctx).Doughnut(maternity.buildData(args), {
      tooltipFontSize: 8,
      tooltipXOffset: 100,
    });
  },

  buildData: function(args) {
    var i = 0;
    return _.map(args.hosp.maternity[args.type], function(val, key) {
      var colorPair = COLORS[i % 3];
      i++;
      return {
        value: val,
        color: colorPair[0],
        highlight: colorPair[1],
        label: LABELS[args.type][key]
      };
    });
  },

};

module.exports = maternity;
