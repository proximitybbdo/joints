define ['backbone', 'module'], (Backbone, module) ->
  class BaseView extends Backbone.View

    constructor: (options) ->
      @bindings = []

      super options

    remove: ->
      if @on_kill
        @on_kill()
        
      @unbind_all
      @undelegateEvents()
      @$el.remove()

    bind: (model, event, callback) ->
      model.bind event, callback, @

      @bindings.push {model: model, event: event, callback: callback}

    unbind_all: ->
      _.each @bindings, (binding) ->
        binding.model.unbind binding.event, binding.callback

      @bindings = []
      
  module.exports = BaseView
