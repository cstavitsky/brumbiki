var SearchResultView = Backbone.View.extend({
  template: JST["templates/search_result"],

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});
