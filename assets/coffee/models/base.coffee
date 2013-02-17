define ['backbone', 'module'], (Backbone, module) ->
  class BaseModel extends Backbone.Model
    defaults:
      email: ''

  module.exports = BaseModel
