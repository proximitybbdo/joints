(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'views/home', 'views/detail'], function(Backbone, $, module, HomeView, DetailView) {
    var AppRouter;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.current_view = null;

      AppRouter.prototype.routes = {
        '': 'home',
        'detail': 'detail'
      };

      AppRouter.prototype.initialize = function() {
        return this;
      };

      AppRouter.prototype.home = function() {
        return this.show(new HomeView);
      };

      AppRouter.prototype.detail = function() {
        return this.show(new DetailView);
      };

      AppRouter.prototype.show = function(view) {
        if (!!this.current_view) {
          this.current_view.remove();
        }
        this.current_view = view;
        return $('#app').html(this.current_view.render().el);
      };

      return AppRouter;

    })(Backbone.Router);
    return module.exports = AppRouter;
  });

}).call(this);
