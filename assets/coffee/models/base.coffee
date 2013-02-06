define ['backbone', 'module'], (Backbone, module) ->
  class BaseModel extends Backbone.Model
    defaults:
      foo: 'bar'

  module.exports = BaseModel
