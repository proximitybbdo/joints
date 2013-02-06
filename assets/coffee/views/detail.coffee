define ['backbone', 'jquery', 'module', 'handlebars',
  'views/base',
  'views/user-list',
  'collections/userlist',
  'models/base'], (Backbone, $, module, Handlebars, BaseView, UserListView, UserList, BaseModel) ->
  class DetailView extends BaseView

    @template: null

    events:
      "keypress #add": "add_user"

    initialize: ->
      window.userlist ?= new UserList

      # window.userlist.fetch()

      @template = Handlebars.getTemplate 'detail'

    render: ->
      @$el.html @template

      # illustrating nested view

      @userlist = new UserListView({el: @$el.find('#userlist')})
      @$el.append @userlist.render().el
      @

    add_user: (e) ->
      if(e.which != 13 || !$('#add').val().trim())
        return

      window.userlist.add {username: @$el.find('#add').val()}
      @$el.find('#add').val('')

  module.exports = DetailView
