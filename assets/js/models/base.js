(function() {
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
        foo: 'bar',
        count: 1
      };

      return BaseModel;

    })(Backbone.Model);
    return module.exports = BaseModel;
  });

}).call(this);
