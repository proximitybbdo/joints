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

      UserListItemView.prototype.tagName = 'li';

      UserListItemView.prototype.$input = null;

      UserListItemView.prototype.events = {
        'click a.edit': 'edit',
        'click a.delete': 'delete',
        'keypress .edit input': 'update'
      };

      UserListItemView.prototype.initialize = function() {
        this.template = Handlebars.getTemplate('user-list-item');
        this.bind(this.model, 'change', this.render);
        return this.bind(this.model, 'destroy', this.remove);
      };

      UserListItemView.prototype.render = function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      };

      UserListItemView.prototype.edit = function(e) {
        e.preventDefault();
        $('div.edit', this.$el).show();
        $('div.show', this.$el).hide();
        return $('input', this.$el).val(this.model.get('username'));
      };

      UserListItemView.prototype.update = function(e) {
        if (e.which !== 13 || !$('input', this.$el).val().trim()) {
          return;
        }
        this.model.save({
          'username': $('input', this.$el).val().trim()
        });
        $('div.edit', this.$el).hide();
        return $('div.show', this.$el).show();
      };

      UserListItemView.prototype["delete"] = function(e) {
        e.preventDefault();
        return this.model.destroy();
      };

      UserListItemView.prototype.on_kill = function() {
        return console.log('UserListItemView::on_kill');
      };

      return UserListItemView;

    })(BaseView);
    return module.exports = UserListItemView;
  });

}).call(this);
