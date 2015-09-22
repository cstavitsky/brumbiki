var TwitterUsersView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addOne: function(twitterUser) {
    var twitterUserView = new TwitterUserView({model: twitterUser});
    twitterUserView.render();

    var twitterUserType = twitterUser.attributes.user_type;
    // var primaryIntro = "<div>Duke blah blah blah</div>";

    if (twitterUserType === "target") {
      $("#target-container").append(twitterUserView.el);
    } else if (twitterUserType === "primary") {
      // $("#primary-container").append(primaryIntro);
      $("#primary-container").append(twitterUserView.el);
    } else if (twitterUserType === "secondary") {
      $("#secondary-container").append(twitterUserView.el);
    } else if (twitterUserType === "tertiary") {
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
