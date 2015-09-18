$(document).ready(function() {

  $("#search-button").on("click", function(event) {
    event.preventDefault();

    var twitterHandle = $("#search-bar").val();
    var tweets = new TweetsCollection();
    var tweetsView = new TweetsView({ collection: tweets });

    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle })
    });

    // $.ajax({
    //   method: "GET",
    //   url: "/tweets",
    //   data: { handle: twitterHandle }
    // })
    // .done(function(response) {
    //   console.log(response);
    //   response.forEach(function(tweet) {
    //     var jstweet = new Tweet(tweet);
    //     tweets.add(jstweet)
    //   })
    // })
  });

});
