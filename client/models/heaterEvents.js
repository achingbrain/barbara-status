var Collection = require('ampersand-rest-collection'),
  config = require('clientconfig'),
  HeaterEvent = require('./heaterEvent')

module.exports = Collection.extend({
  model: HeaterEvent,
  url: function() {
    return config.apiUrl + '/brews/' + this.parent.name + '/heaterEvents'
  }
})
