var TwitterUsersView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addOne: function(twitterUser) {
    var twitterUserView = new TwitterUserView({model: twitterUser});
    twitterUserView.render();

    if (twitterUser.attributes.user_type === "user") {
      $("#current-container").append(twitterUserView.el);
    } else if (twitterUser.attributes.user_type === "target") {
      $("#target-container").append(twitterUserView.el);
    } else if (twitterUser.attributes.user_type === "primary") {
      $("#primary-container").append(twitterUserView.el);
    } else if (twitterUser.attributes.user_type === "secondary") {
      $("#secondary-container").append(twitterUserView.el);
    } else {
      $("#tertiary-container").append(twitterUserView.el);
    }

    $("#one-degree-drawing-container").css("display", "block");
  },

  addAll: function() {
    $("#one-degree-button-container").css("display", "none");

    return this.collection.each(function(twitterUser) {
      return this.addOne(twitterUser);
    }, this);
  }
});
