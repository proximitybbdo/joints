(function() {

  define(['jquery', 'handlebars', 'config'], function($, Handlebars, AppConfig) {
    Handlebars.getTemplate = function(name) {
      if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
        $.ajax({
          url: AppConfig.root + 'assets/templates/' + name + '.handlebars',
          success: function(data) {
            if (!(Handlebars.templates != null)) {
              Handlebars.templates = {};
            }
            return Handlebars.templates[name] = Handlebars.compile(data);
          },
          async: false
        });
      }
      return Handlebars.templates[name];
    };
    return Handlebars.registerHelper('agree_button', function() {
      return new Handlebars.SafeString("<button>I agree.</button>");
    });
  });

}).call(this);
