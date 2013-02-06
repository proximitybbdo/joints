(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user-list-item'], function(Backbone, $, module, Handlebars, BaseView, UserListItemView) {
    var UserListView;
    UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        return UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.userlist = null;

      UserListView.prototype.initialize = function() {
        _.bindAll(this, 'add_model');
        _.bindAll(this, 'add_all_models');
        window.userlist.bind('add', this.add_model);
        return window.userlist.bind('reset', this.add_all_models);
      };

      UserListView.prototype.render = function() {
        this.$el.html(Handlebars.getTemplate('user-list'));
        return this;
      };

      UserListView.prototype.add_model = function(model) {
        var html, view;
        view = new UserListItemView({
          model: model
        });
        html = view.render().el;
        return this.$el.append(html);
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
