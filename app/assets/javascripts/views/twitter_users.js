var TwitterUsersView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addOne: function(twitterUser) {
    var twitterUserView = new TwitterUserView({model: twitterUser});
    twitterUserView.render();

    $("#one-degree-container").append(twitterUserView.el);
  },

  addAll: function() {
    $("#one-degree-container").empty();
    return this.collection.each(function(twitterUser) {
      return this.addOne(twitterUser);
    }, this);
  }
});
