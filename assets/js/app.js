(function() {

  window.KickerApp = {
    Models: {},
    Collections: {},
    Views: {},
    init: function() {
      KickerApp.router = new KickerApp.Router;
      return Backbone.history.start({
        pushState: true
      });
    }
  };

  $(document).ready(function() {
    $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + KickerApp.config.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
    return KickerApp.init();
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router'], function(Backbone, $, AppRouter) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + '';
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  KickerApp.config = {
    root: '/'
  };

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router'], function(Backbone, $, AppRouter) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + '';
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  AppConfig.config = {
    root: '/'
  };

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router'], function(Backbone, $, AppRouter) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + '';
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  AppConfig.config({
    root: '/'
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router'], function(Backbone, $, AppRouter) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + '';
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  AppConfig({
    root: '/'
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + '';
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  AppConfig({
    root: '/'
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  AppConfig({
    root: '/'
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  ({
    AppConfig: {
      root: '/'
    }
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {
  var AppConfig;

  AppConfig = {
    root: '/'
  };

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {
  var AppConfig;

  AppConfig = {
    root: '/'
  };

  modules["export"] = AppConfig;

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(modules) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return modules["export"] = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['modules'], function(modules) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return modules["export"] = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Home = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('home'));
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {

  define(['backbone', 'modules', 'views/base'], function(Backbone, modules, BaseView) {
    var HomeView;
    return HomeView = BaseView.extend({
      initialize: function() {
        return this;
      },
      render: function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      }
    });
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'views/base'], function(Backbone, modules, BaseView) {
    var HomeView;
    return HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    return HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module'], function(Backbone, $, module) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = KickerApp.Views.home = new KickerApp.Views.Home();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.Base = Backbone.View.extend({
    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      return this;
    }
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules'], function(Backbone, modules) {
    var BaseView;
    return BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules'], function(Backbone, modules) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return modules["export"] = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return modules["export"] = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'modules', 'handlebars', 'views/base'], function(Backbone, modules, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return modules["export"] = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  Handlebars.getTemplate = function(name) {
    if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
      $.ajax({
        url: '/public/templates/' + name + '.handlebars',
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

  Handlebars.registerHelper('agree_button', function() {
    return new Handlebars.SafeString("<button>I agree.</button>");
  });

}).call(this);
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

  define(['jquery', 'handlebars'], function($, Handlebars) {
    Handlebars.getTemplate = function(name) {
      if (!(Handlebars.templates != null) || !(Handlebars.templates[name] != null)) {
        $.ajax({
          url: '/public/templates/' + name + '.handlebars',
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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home'], function(Backbone, $, module, HomeView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game', 'views/user'], function(Backbone, $, module, HomeView, NewGameView, ActiveGameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game', 'views/user'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {

  KickerApp.Views.NewGame = KickerApp.Views.Base.extend({
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    }
  });

  KickerApp.Views.ActiveGame = KickerApp.Views.Base.extend({
    time_start: 0,
    time_end: 0,
    user_view: null,
    initialize: function() {
      this.time_start = new Date();
      return this.user_view = new KickerApp.Views.GameUser({
        model: new KickerApp.Models.User()
      });
    },
    render: function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      console.log(this.user_view.render().$el.html());
      return this;
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    return ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new KickerApp.Views.GameUser({
          model: new KickerApp.Models.User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    return ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {

  KickerApp.Views.GameUser = KickerApp.Views.Base.extend({
    initialize: function() {
      return this;
    },
    render: function() {
      var tpl;
      tpl = Handlebars.getTemplate('game/partials/user');
      console.log(tpl(this.options.model.toJSON()));
      this.$el.html(tpl(this.options.model));
      this.$el.html(tpl(this.options.model));
      j;

      this;

      return $(this.el).html(Handlebars.getTemplate('naam'));
    }
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    return ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {

  KickerApp.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'JeroenB',
      goals: 1
    }
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    return User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module["export"] = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'model/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'models/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        console.log(this.user_view.render().$el.html());
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'models/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        this;

        return $(this.el).html(Handlebars.getTemplate('naam'));
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'models/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        return this;
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'models/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        return this;
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {



}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        username: 'JeroenB',
        goals: 1
      };

      return User;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'models/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user', 'models/user'], function(Backbone, $, module, Handlebars, BaseView, GameUserView, User) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'handlebars', 'views/base'], function(Backbone, module, Handlebars, BaseView) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        return this;
      };

      HomeView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('home'));
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var GameUserView;
    GameUserView = (function(_super) {

      __extends(GameUserView, _super);

      function GameUserView() {
        return GameUserView.__super__.constructor.apply(this, arguments);
      }

      GameUserView.prototype.initialize = function() {
        return this;
      };

      GameUserView.prototype.render = function() {
        var tpl;
        tpl = Handlebars.getTemplate('game/partials/user');
        console.log(tpl(this.options.model.toJSON()));
        this.$el.html(tpl(this.options.model));
        this.$el.html(tpl(this.options.model));
        return this;
      };

      return GameUserView;

    })(BaseView);
    return module.exports = GameUserView;
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {
    var ActiveGameView, NewGameView;
    NewGameView = (function(_super) {

      __extends(NewGameView, _super);

      function NewGameView() {
        return NewGameView.__super__.constructor.apply(this, arguments);
      }

      NewGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/new'));
        return this;
      };

      return NewGameView;

    })(BaseView);
    ActiveGameView = (function(_super) {

      __extends(ActiveGameView, _super);

      function ActiveGameView() {
        return ActiveGameView.__super__.constructor.apply(this, arguments);
      }

      ActiveGameView.prototype.time_start = 0;

      ActiveGameView.prototype.time_end = 0;

      ActiveGameView.prototype.user_view = null;

      ActiveGameView.prototype.initialize = function() {
        this.time_start = new Date();
        return this.user_view = new GameUserView({
          model: new User()
        });
      };

      ActiveGameView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('game/active'));
        return this;
      };

      return ActiveGameView;

    })(BaseView);
    return module.exports = {
      NewGameView: NewGameView,
      ActiveGameView: ActiveGameView
    };
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/new'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('app'));
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var ActiveGameView, NewGameView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, NewGameView = (function(_super) {

    __extends(NewGameView, _super);

    function NewGameView() {
      return NewGameView.__super__.constructor.apply(this, arguments);
    }

    NewGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return NewGameView;

  })(BaseView), ActiveGameView = (function(_super) {

    __extends(ActiveGameView, _super);

    function ActiveGameView() {
      return ActiveGameView.__super__.constructor.apply(this, arguments);
    }

    ActiveGameView.prototype.time_start = 0;

    ActiveGameView.prototype.time_end = 0;

    ActiveGameView.prototype.user_view = null;

    ActiveGameView.prototype.initialize = function() {
      this.time_start = new Date();
      return this.user_view = new GameUserView({
        model: new User()
      });
    };

    ActiveGameView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('game/active'));
      return this;
    };

    return ActiveGameView;

  })(BaseView), module.exports = {
    NewGameView: NewGameView,
    ActiveGameView: ActiveGameView
  });

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Base;
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        return Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.defaults = {
        foo: 'bar'
      };

      return Base;

    })(Backbone.Model);
    return module.exports = User;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/home', 'views/game'], function(Backbone, $, module, HomeView, GameView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'game/new': 'new_game',
        'game/active': 'active_game'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      new_game: function() {
        this.current_view = new GameView.NewGameView();
        return this.show(this.current_view);
      },
      active_game: function() {
        this.current_view = new GameView.ActiveGameView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'about': 'about'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new HomeView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'about': 'about'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'about': 'about'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      current_view: null,
      routes: {
        '': 'home',
        'about': 'about'
      },
      initialize: function() {
        return this.bind('all', this.on_route, this);
      },
      on_route: function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      },
      home: function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      },
      show: function(view) {
        return $('#app').html(view.render().$el.html());
      }
    });
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        console.log('home');
        this.current_view = new AppView();
        return this.show(this.current_view);
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Bla;
    Bla = (function(_super) {

      __extends(Bla, _super);

      function Bla() {
        return Bla.__super__.constructor.apply(this, arguments);
      }

      Bla.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return Bla;

    })(Backbone.View);
    return module.exports = Bla;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Bla;
    Bla = (function(_super) {

      __extends(Bla, _super);

      function Bla() {
        return Bla.__super__.constructor.apply(this, arguments);
      }

      Bla.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return Bla;

    })(Backbone.View);
    return module.exports = Bla;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var Bla;
    Bla = (function(_super) {

      __extends(Bla, _super);

      function Bla() {
        return Bla.__super__.constructor.apply(this, arguments);
      }

      Bla.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return Bla;

    })(Backbone.View);
    return module.exports = Bla;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
;(function() {

  require.config({
    baseUrl: "/assets/js",
    paths: {
      jquery: 'vendor/jquery',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      handlebars: 'vendor/handlebars'
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      },
      lodash: {
        exports: "_"
      },
      backbone: {
        deps: ['lodash', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  define(['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], function(Backbone, $, AppRouter, AppConfig) {
    new AppRouter;
    Backbone.history.start({
      pushState: true
    });
    return $(document).on("click", "a[href]:not([data-bypass])", function(e) {
      var href, root;
      href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      root = location.protocol + "//" + location.host + AppConfig.root;
      if (href.prop.slice(0, root.length) === root) {
        e.preventDefault();
        return Backbone.history.navigate(href.attr, true);
      }
    });
  });

}).call(this);
;(function() {

  define(['module'], function(module) {
    var AppConfig;
    AppConfig = {
      root: '/'
    };
    return module.exports = AppConfig;
  });

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/app'], function(Backbone, $, module, AppView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'about': 'about'
      };

      AppRouter.prototype.initialize = function() {
        return this.bind('all', this.on_route, this);
      };

      AppRouter.prototype.on_route = function(ref) {
        if (!!this.current_view) {
          this.current_view.remove();
          return this.current_view = null;
        }
      };

      AppRouter.prototype.home = function() {
        return console.log('home');
      };

      AppRouter.prototype.show = function(view) {
        return $('#app').html(view.render().$el.html());
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
;(function() {

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
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseModel;
    BaseModel = (function(_super) {

      __extends(BaseModel, _super);

      function BaseModel() {
        return BaseModel.__super__.constructor.apply(this, arguments);
      }

      BaseModel.prototype.defaults = {
        foo: 'bar'
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(BaseView), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var AppView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, Bla) {}, AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.template = null;

    AppView.detail_view = null;

    AppView.prototype.initialize = function() {
      this.template = Handlebars.getTemplate('app');
      return this;
    };

    AppView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return AppView;

  })(Bla), module.exports = AppView);

}).call(this);
;(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.remove = function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
;(function() {
  var DetailView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {}, DetailView = (function(_super) {

    __extends(DetailView, _super);

    function DetailView() {
      return DetailView.__super__.constructor.apply(this, arguments);
    }

    DetailView.prototype.render = function() {
      this.$el.html(Handlebars.getTemplate('detail'));
      return this;
    };

    return DetailView;

  })(BaseView), module.exports = DetailView);

}).call(this);
