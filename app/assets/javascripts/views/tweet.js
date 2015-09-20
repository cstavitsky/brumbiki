var TweetView = Backbone.View.extend({
  template: JST["templates/tweet"],

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
