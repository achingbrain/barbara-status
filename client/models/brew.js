var AmpersandModel = require('ampersand-model'),
  HeaterEvents = require('./heaterEvents'),
  Temperatures = require('./temperatures')

module.exports = AmpersandModel.extend({
  props: {
    id: 'string',
    name: 'string'
  },
  collections: {
    heaterEvents: HeaterEvents,
    temperatures: Temperatures
  }
})
