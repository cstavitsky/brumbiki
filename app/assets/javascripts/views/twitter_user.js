var TwitterUserView = Backbone.View.extend({
  // tagName: "td",
  className: "twitter-user",
  template: JST["templates/twitter_user"],

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
