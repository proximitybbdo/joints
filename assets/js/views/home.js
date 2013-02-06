(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, BaseModel) {
    var HomeView;
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.template = null;

      HomeView.prototype.initialize = function() {
        return this.template = Handlebars.getTemplate('home');
      };

      HomeView.prototype.render = function() {
        this.$el.html(this.template);
        return this;
      };

      return HomeView;

    })(BaseView);
    return module.exports = HomeView;
  });

}).call(this);
