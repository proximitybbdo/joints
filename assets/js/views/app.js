(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var AppView;
    AppView = (function(_super) {

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

    })(BaseView);
    return module.exports = AppView;
  });

}).call(this);
