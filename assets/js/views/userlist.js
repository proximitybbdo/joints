(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base'], function(Backbone, $, module, Handlebars, BaseView) {
    var UserListView;
    UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        return UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.userlist = null;

      UserListView.prototype.initialize = function() {
        window.userlist.bind('add', this.add_model);
        window.userlist.bind('reset', this.add_all_models);
        return console.log(window.userlist);
      };

      UserListView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('user-list-item'));
        return this;
      };

      UserListView.prototype.add_model = function(model) {
        var view;
        console.log('add model');
        view = new UserListItemView({
          model: model
        });
        return this.$el.append(view.render().el);
      };

      UserListView.prototype.add_all_models = function(model) {
        this.$el.html('');
        return window.userlist.each(this.add_model, this);
      };

      return UserListView;

    })(BaseView);
    return module.exports = UserListView;
  });

}).call(this);
