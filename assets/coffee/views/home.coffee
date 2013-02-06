define ['backbone', 'jquery', 'module', 'handlebars',
  'views/base',
  'models/base'], (Backbone, $, module, Handlebars, BaseView, BaseModel) ->
  class HomeView extends BaseView
    @template: null

    initialize: ->
      @template = Handlebars.getTemplate 'home'

    render: ->
      @$el.html @template
      @

  module.exports = HomeView
