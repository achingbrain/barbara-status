var Collection = require('ampersand-rest-collection'),
  Brew = require('./brew'),
  config = require('clientconfig')

module.exports = Collection.extend({
  model: Brew,
  url: config.apiUrl + '/brews',
  indexes: ['name']
});
