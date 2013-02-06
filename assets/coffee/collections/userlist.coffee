define ['backbone', 'module', 'models/base'], (Backbone, module, BaseModel) ->
  class UserList extends Backbone.Collection
    model: BaseModel

  module.exports = UserList
