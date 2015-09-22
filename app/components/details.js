var m = require('mithril');
var _ = require('underscore');
var homeVM = require('models/homeVM');

var details = {
  controller: function() {

  },

  view: function() {
    var hosp = homeVM.activeMark();
    return m('#details', hosp ? details.renderCards(hosp) : []);
  },

  renderCards: function(hosp) {
    return [
      m('h2.hospital-name', hosp.name),

      m('.card.left', [
        m('h2', 'NÚMERO DE MÉDICOS'),
        m('.small-divider'),
        m('.info-image.physicians', [m('img[src=img/numero-de-medicos.svg]')]),
        m('.info-text', [ m('.num', hosp.info.numPhysicians), m('.label', 'médicos') ]),
      ]),
      m('.card.middle', [
        m('h2', 'OUTROS PROFISSIONAIS'),
        m('.small-divider'),
        m('.info-image.other', [m('img[src=img/outros-profissionais.svg]')]),
        m('.info-text', [ m('.num', hosp.info.numOtherProfessionals), m('.label', 'outros profissionais') ]),

      ]),
      m('.card.right', [
        m('h2', 'LEITOS'),
        m('.small-divider'),
        m('.info-image.beds', [m('img[src=img/leitos.svg]')]),
        m('.info-text', [ m('.num', hosp.info.numBeds), m('.label', 'leitos') ]),
      ]),
      m('.card.left', [
        m('h2', 'PACIENTES'),
        m('.small-divider'),
        m('.info-image.patients', [m('img[src=img/pacientes.svg]')]),
        m('.info-text', [ m('.num', hosp.info.numPatients), m('.label', 'pacientes') ]),

      ]),
      m('.card.middle', [
        m('h2', 'OUVIDORIA'),
        m('.small-divider'),
        m('.info-image.ombudsman', [m('img[src=img/ombudsman.png]')]),
        m('.info-text', [ m('.num', hosp.info.ombudsman), m('.label', 'ouvidoria') ]),

      ]),
      m('.card.right', [
        m('h2', 'SERVIÇOS ESPECIALIZADOS'),
        m('.small-divider'),
        m('ul.specialized-services', [
          _.map(hosp.info.specializedServices.split(';'), function(s) {
            return (s.length > 0 ) ? m('li', s) : '';
          })
        ]),
      ]),
      m('.card.left', [
        m('h2', 'ATENÇÃO AMBULATORIAL'),
        m('.small-divider'),
        (
          (hosp.info.ambulatoryCare !== '-') ?

          m('.big-circle.' + details.levelColor(hosp.info.ambulatoryCare), [
            m('.inner-content', details.levelContent(hosp.info.ambulatoryCare))
          ])
          :
          m('.nao-tem', 'NÃO TEM')
        ),
      ]),
      m('.card.middle', [
        m('h2', 'ATENÇÃO HOSPITALAR'),
        m('.small-divider'),
        (
          (hosp.info.hospitalCare !== '-') ?

          m('.big-circle.' + details.levelColor(hosp.info.hospitalCare), [
            m('.inner-content', details.levelContent(hosp.info.hospitalCare))
          ])
          :
          m('.nao-tem', 'NÃO TEM')
        ),
      ]),

      m('h3.note', 'Número de pessoas entrevistadas: 5054'),

    ];
  },

  levelColor: function(info) {
    switch (info) {
      case 'H':
        return 'green';
      case 'M':
        return 'yellow';
      case "L":
        return 'red'
    }
  },

  levelContent: function(info) {
    switch (info) {
      case 'H':
        return 'Alta';
      case 'M':
        return 'Média';
      default:
        return 'Baixa'
    }
  }
};

module.exports = details;
