var TweetView = Backbone.View.extend({
  template: JST["templates/tweet"],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
