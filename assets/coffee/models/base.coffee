define ['backbone', 'module'], (Backbone, module) ->
  class BaseModel extends Backbone.Model
    defaults:
      foo: 'bar'
      count: 1

  module.exports = BaseModel
