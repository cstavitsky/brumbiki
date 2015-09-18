$(document).ready(function() {

  $("#search-button").on("click", function(event) {
    event.preventDefault();

    var twitterHandle = $("#search-bar").val();
    var tweets = new TweetsCollection();
    var input = {handle: twitterHandle};

    tweets.fetch({ data: $.param(input) });
    console.log(tweets[0])
    // $.ajax({
    //   method: "GET",
    //   url: "/tweets",
    //   data: input
    // })
    // .done(function(response) {
    //   response.forEach(function(tweet) {
    //     var jstweet = new Tweet(tweet);
    //     tweets.add(jstweet)
    //   })
    // })
  });

});
