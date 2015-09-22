var TwitterUsersView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addOne: function(twitterUser) {
    var twitterUserView = new TwitterUserView({model: twitterUser});
    twitterUserView.render();

    var twitterUserType = twitterUser.attributes.user_type;

    if (twitterUserType === "target") {
      $("#target-container").append(twitterUserView.el);
    } else if (twitterUserType === "primary") {
      $("#primary-container").append(twitterUserView.el);
    } else if (twitterUserType === "secondary") {
      $("#secondary-container").append(twitterUserView.el);
    } else if (twitterUserType === "tertiary") {
      $("#tertiary-container").append(twitterUserView.el);
    }

    $("#one-degree-drawing-container").fadeIn("slow");
  },

  addAll: function() {
    return this.collection.each(function(twitterUser) {
      return this.addOne(twitterUser);
    }, this);
  }
});
