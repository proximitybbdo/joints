define ['backbone', 'jquery', 'module', 'handlebars',
  'views/base',
  'models/base',
  'collections/userlist'], (Backbone, $, module, Handlebars, BaseView, BaseModel, UserList) ->

  class UserListItemView extends BaseView
    initialize: ->
      @template = Handlebars.getTemplate 'user-list-item'

    render: ->
      @$el.html @template @model.toJSON()
      @

    on_kill: ->
      console.log 'UserListItemView::on_kill'

  module.exports = UserListItemView
