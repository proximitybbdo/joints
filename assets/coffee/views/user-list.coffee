define ['backbone', 'jquery', 'module', 'handlebars',
  'views/base',
  'views/user-list-item'], (Backbone, $, module, Handlebars, BaseView, UserListItemView) ->
  class UserListView extends BaseView

    @user_list_items: null

    initialize: ->
      # events
      @bind window.userlist, 'add', @add_model
      @bind window.userlist, 'reset', @add_all_models

      @user_list_items = []

    render: ->
      @$el.html Handlebars.getTemplate 'user-list'
      @

    on_kill: ->
      _.each @user_list_items, (item) ->
        item.remove()

    add_model: (model) ->
      item = new UserListItemView {model: model}

      @user_list_items.push item

      html = item.render().el
      @$el.append html

    add_all_models: (model) ->
      @$el.html('')
      window.userlist.each @add_model, @

  module.exports = UserListView
