(function() {

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
