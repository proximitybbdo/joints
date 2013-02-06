(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'models/base', 'collections/userlist'], function(Backbone, $, module, Handlebars, BaseView, BaseModel, UserList) {
    var UserListItemView;
    UserListItemView = (function(_super) {

      __extends(UserListItemView, _super);

      function UserListItemView() {
        return UserListItemView.__super__.constructor.apply(this, arguments);
      }

      UserListItemView.prototype.initialize = function() {
        return this.template = Handlebars.getTemplate('user-list-item');
      };

      UserListItemView.prototype.render = function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      };

      return UserListItemView;

    })(BaseView);
    return module.exports = UserListItemView;
  });

}).call(this);
