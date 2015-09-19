var SearchResultsCollection = Backbone.Collection.extend({
  url: "/bing_results",
  model: SearchResult
})
