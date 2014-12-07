var Collection = require('ampersand-rest-collection'),
  config = require('clientconfig'),
  Temperature = require('./temperature')

module.exports = Collection.extend({
  model: Temperature,
  url: function() {
    return config.apiUrl + '/brews/' + this.parent.name + '/temperatures'
  }
})
