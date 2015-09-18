var TweetsCollection = Backbone.Collection.extend({
  url: "/tweets",
  model: Tweet
});
