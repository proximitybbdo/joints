(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module'], function(Backbone, module) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView(options) {
        this.bindings = [];
        BaseView.__super__.constructor.call(this, options);
      }

      BaseView.prototype.remove = function() {
        if (this.on_kill) {
          this.on_kill();
        }
        this.unbind_all;
        this.undelegateEvents();
        return this.$el.empty();
      };

      BaseView.prototype.bind = function(model, event, callback) {
        model.bind(event, callback, this);
        return this.bindings.push({
          model: model,
          event: event,
          callback: callback
        });
      };

      BaseView.prototype.unbind_all = function() {
        _.each(this.bindings, function(binding) {
          return binding.model.unbind(binding.event, binding.callback);
        });
        return this.bindings = [];
      };

      return BaseView;

    })(Backbone.View);
    return module.exports = BaseView;
  });

}).call(this);
