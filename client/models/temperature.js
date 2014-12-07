var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: 'date',
  props: {
    date: 'string',
    celsius: 'number'
  }
})
