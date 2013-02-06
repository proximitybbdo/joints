define ['jquery', 'handlebars', 'config'], ($, Handlebars, AppConfig) ->
  Handlebars.getTemplate = (name) ->
    if not Handlebars.templates? or not Handlebars.templates[name]?
      $.ajax({
        url: AppConfig.root + 'assets/templates/' + name + '.handlebars',
        success: (data) ->
          if not Handlebars.templates?
            Handlebars.templates = {}
          Handlebars.templates[name] = Handlebars.compile data
        async: false
      })
    Handlebars.templates[name]

  Handlebars.registerHelper 'agree_button', ->
    return new Handlebars.SafeString("<button>I agree.</button>")
