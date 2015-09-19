var SearchResultView = Backbone.View.extend({
  template: JST["templates/search_result"],

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});
