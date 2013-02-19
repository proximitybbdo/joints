define ['backbone', 'jquery', 'module', 'handlebars',
  'views/base',
  'models/base',
  'collections/userlist'], (Backbone, $, module, Handlebars, BaseView, BaseModel, UserList) ->

  class UserListItemView extends BaseView
    tagName: 'li'

    events:
      'click a.edit': 'edit'
      'click a.delete': 'delete'
      'keypress .edit input': 'update'

    initialize: ->
      @template = Handlebars.getTemplate 'user-list-item'

      @bind @model, 'change', @render
      @bind @model, 'destroy', @remove

    render: ->
      @$el.html @template @model.toJSON()
      @

    edit: (e) ->
      e.preventDefault()

      $('div.edit', @$el).show()
      $('div.show', @$el).hide()

      $('input', @$el).val @model.get 'username'

    update: (e) ->
      if(e.which != 13 || !$('input', @$el).val().trim())
        return

      @model.save {'username': $('input', @$el).val().trim()}

      $('div.edit', @$el).hide()
      $('div.show', @$el).show()

    delete: (e) ->
      e.preventDefault()

      @model.destroy()

  module.exports = UserListItemView
