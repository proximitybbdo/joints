define ['backbone', 'jquery', 'module',
  'views/home',
  'views/detail' ], (Backbone, $, module, HomeView, DetailView) ->
  class AppRouter extends Backbone.Router
    current_view: null

    routes:
      '': 'home'
      'detail': 'detail'

    initialize: ->
      @

    home: ->
      @show new HomeView

    detail: ->
      @show new DetailView

    show: (view) ->
      if !!@current_view
        @current_view.remove()

      @current_view = view
      $('#app').html @current_view.render().el

  module.exports = AppRouter
