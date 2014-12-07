var Router = require('ampersand-router'),
  BrewPage = require('./pages/brew')

module.exports = Router.extend({
  routes: {
    '': 'home',
    'brews/:name': 'brew',
    '(*path)': 'catchAll'
  },

  home: function () {
    if(app.brews.length == 0) {
      app.brews.once('add', function(brew) {
        this.redirectTo('/brews/' + brew.name)
      }.bind(this))

      app.brews.fetch()
    } else {
      this.redirectTo('/brews/' + app.brews.at(0).name)
    }
  },

  brew: function (name) {
    var brew = app.brews.get(name, 'name')

    if(!brew) {
      return this.redirectTo('/')
    }

    this.trigger('page', new BrewPage({
      model: brew
    }));
  },

  catchAll: function () {
    this.redirectTo('');
  }
});
