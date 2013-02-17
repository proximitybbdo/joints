(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'jquery', 'module', 'handlebars', 'views/base', 'views/user-list', 'collections/userlist', 'models/base'], function(Backbone, $, module, Handlebars, BaseView, UserListView, UserList, BaseModel) {
    var DetailView;
    DetailView = (function(_super) {

      __extends(DetailView, _super);

      function DetailView() {
        return DetailView.__super__.constructor.apply(this, arguments);
      }

      DetailView.template = null;

      DetailView.userlist = null;

      DetailView.prototype.events = {
        "keypress #add": "add_user"
      };

      DetailView.prototype.initialize = function() {
        var _ref;
        if ((_ref = window.userlist) == null) {
          window.userlist = new UserList;
        }
        window.userlist.fetch();
        return this.template = Handlebars.getTemplate('detail');
      };

      DetailView.prototype.render = function() {
        this.$el.html(this.template);
        this.userlist = new UserListView({
          el: this.$el.find('#userlist')
        });
        this.$el.append(this.userlist.render().el);
        return this;
      };

      DetailView.prototype.on_kill = function() {
        return this.userlist.remove();
      };

      DetailView.prototype.add_user = function(e) {
        if (e.which !== 13 || !$('#add').val().trim()) {
          return;
        }
        window.userlist.create({
          username: this.$el.find('#add').val()
        });
        return this.$el.find('#add').val('');
      };

      return DetailView;

    })(BaseView);
    return module.exports = DetailView;
  });

}).call(this);
