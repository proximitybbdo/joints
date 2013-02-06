(function() {
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
