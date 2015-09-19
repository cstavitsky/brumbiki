var SearchResultsView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addOne: function(result) {
    var search_result_view = new SearchResultView({model: result});
    search_result_view.render();

    $("#search-results-container").append(search_result_view.el)
  },

  addAll: function(){
    return this.collection.each(function(result) {
      return this.addOne(result);
    }, this);
  }
});
