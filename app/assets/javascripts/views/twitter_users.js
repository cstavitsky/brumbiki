var TweetsView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addOne: function(tweet) {
    var tweet_view = new TweetView({model: tweet});
    tweet_view.render();

    $("#temporary-container").append(tweet_view.el);
  },

  addAll: function() {
    $("#one-degree-container").css("display", "block")

    $("#temporary-container").empty();
    return this.collection.each(function(tweet) {
      return this.addOne(tweet);
    }, this);
  }
});
