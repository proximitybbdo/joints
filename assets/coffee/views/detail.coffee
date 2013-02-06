define ['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'],
  (Backbone, $, module, Handlebars, BaseView, BaseModel) ->
  class DetailView extends BaseView

    render: ->
      @$el.html Handlebars.getTemplate 'detail'
      @

  module.exports = DetailView
