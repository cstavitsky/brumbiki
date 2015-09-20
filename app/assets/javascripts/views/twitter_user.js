var TwitterUserView = Backbone.View.extend({
  template: JST["templates/twitter_user"],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
