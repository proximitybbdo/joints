define ['backbone', 'module'], (Backbone, module) ->
  class BaseView extends Backbone.View
    remove: ->
      @undelegateEvents()
      @$el.empty()
      @
      
  module.exports = BaseView
