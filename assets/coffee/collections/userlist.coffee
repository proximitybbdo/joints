define ['backbone', 'module', 'models/base'], (Backbone, module, BaseModel) ->
  class UserList extends Backbone.Collection
    url: '/api/users'
    model: BaseModel

  module.exports = UserList
