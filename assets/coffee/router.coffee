define ['backbone', 'jquery', 'module', 'views/app' ], (Backbone, $, module, AppView) ->
  class AppRouter extends Backbone.Router
    current_view: null

    routes:
      '': 'home'

    initialize: ->
      @.bind 'all', @on_route, @

    on_route: (ref) ->
      if !!@current_view
        @current_view.remove()
        @current_view = null

    home: ->
      @current_view = new AppView()

      @show @current_view

    show: (view) ->
      $('#app').html view.render().$el.html()

  module.exports = AppRouter
