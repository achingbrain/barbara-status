var PageView = require('./base'),
  templates = require('../templates'),
  GraphView = require('../views/graph')

module.exports = PageView.extend({
  pageTitle: 'home',
  template: templates.pages.brew,
  render: function() {
    this.renderWithTemplate(this)

    this.renderSubview(new GraphView({
      model: this.model
    }), '[data-hook=graph]')
  },
  bindings: {
    'model.name': '[data-hook=name]'
  }
})
