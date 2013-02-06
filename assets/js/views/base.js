(function() {
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
