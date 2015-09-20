var TwitterUserView = Backbone.View.extend({
  template: JST["templates/twitter_user"],

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
