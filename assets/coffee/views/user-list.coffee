define ['backbone', 'jquery', 'module', 'handlebars',
  'views/base',
  'views/user-list-item'], (Backbone, $, module, Handlebars, BaseView, UserListItemView) ->
  class UserListView extends BaseView

    # illustrating nested view
    @userlist: null

    initialize: ->
      # make sure that 'this' in the add_model function
      # refers to the UserListView
      # Alternatively, you can add a third param to the
      # bind function on the object you are listening
      _.bindAll(@, 'add_model')
      _.bindAll(@, 'add_all_models')

      # events
      # window.userlist.bind 'add', @add_model, @ # optional 'this' param
      window.userlist.bind 'add', @add_model
      window.userlist.bind 'reset', @add_all_models

    render: ->
      @$el.html Handlebars.getTemplate 'user-list'
      @

    add_model: (model) ->
      view = new UserListItemView {model: model}
      html = view.render().el
      @$el.append html

    add_all_models: (model) ->
      @$el.html('')
      window.userlist.each @add_model, @

  module.exports = UserListView
