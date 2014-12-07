
var View = require('ampersand-view'),
  templates = require('../templates')

module.exports = View.extend({
  template: templates.includes.brew,
  render: function () {
    this.renderWithTemplate()
  },
  bindings: {
    'model.name': {
      type: function (el, value) {
        el.href = '/brews/' + value
        el.innerText = value
      },
      selector: '[data-hook=brewlink]'
    }
  }
})