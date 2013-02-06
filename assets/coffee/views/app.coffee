define ['backbone', 'jquery', 'module', 'handlebars', 'views/base'],
  (Backbone, $, module, Handlebars, BaseView) ->
  class AppView extends BaseView
    @template: null

    # illustrating nested view
    @detail_view: null

    initialize: ->
      @template = Handlebars.getTemplate 'app'

      # @detail_view = new DetailView

      @

    render: ->
      @$el.html @template

      # @$el.find('#detail').html @detail_view.render().el

      @

  module.exports = AppView
