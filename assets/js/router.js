(function() {
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
        '': 'home'
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
