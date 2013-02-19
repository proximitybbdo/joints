(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'module', 'models/base'], function(Backbone, module, BaseModel) {
    var UserList;
    UserList = (function(_super) {

      __extends(UserList, _super);

      function UserList() {
        return UserList.__super__.constructor.apply(this, arguments);
      }

      UserList.prototype.url = '/api/users';

      UserList.prototype.model = BaseModel;

      return UserList;

    })(Backbone.Collection);
    return module.exports = UserList;
  });

}).call(this);
