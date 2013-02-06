define ['backbone', 'jquery', 'module', 'views/app' ], (Backbone, $, module, AppView) ->
  class AppRouter extends Backbone.Router
    current_view: null

    routes:
      '': 'home'
      'about': 'about'

    initialize: ->
      @.bind 'all', @on_route, @

    on_route: (ref) ->
      if !!@current_view
        @current_view.remove()
        @current_view = null

    home: ->
      console.log 'home'

      # @current_view = new AppView()

      # @show @current_view

    # active_game: ->
    #   @current_view = new GameView.ActiveGameView()

    #   @show @current_view

    show: (view) ->
      # $('#app').append view.el
      $('#app').html view.render().$el.html()

  module.exports = AppRouter
