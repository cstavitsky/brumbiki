$(document).ready(function() {
  var keywords = []
  var tweet = ""
  $("#keyword-search-container").hide();

  var tweets = new TweetsCollection();
  var tweetsView = new TweetsView({ collection: tweets });

  $("#search-button").on("click", function(event) {
    event.preventDefault();

    var twitterHandle = $("#search-bar").val();

    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle })
    });
    $("#search-results-container").empty();
  });

  $("#search-container input").on("keyup", function(event) {
    event.preventDefault();
    var twitterHandle = $("#search-bar").val();
    if (event.which === 13){
    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle })
    });
      $("#search-results-container").empty();
    }
  });

  $("#link-search-button").on("click", function(event){
    event.preventDefault();

    var query = $("#link-search-bar").val();
    var results = new SearchResultsCollection();
    var resultsCollectionView = new SearchResultsView({ collection: results});

    results.fetch({
      reset: true,
      data: $.param({ query: query })
    });
  });

  $("#link-search-button").on("click", function(event){
    event.preventDefault();

    var query = $("#link-search-bar").val();
    var results = new SearchResultsCollection();
    var resultsCollectionView = new SearchResultsView({ collection: results});

    results.fetch({
      reset: true,
      data: $.param({ query: query })
    });
  });

  $("#tweets-container").on("click", ".keyword", function(event){
    event.preventDefault();
    var twitterHandle = $("#search-bar").val();
    if($(this).closest(".tweet")[0] != tweet[0]){
      keywords = []
      $(".keyword").removeClass("active-keyword")
    }
    console.log(tweet)
    tweet = $(this).closest(".tweet")
    var value = $(this).val();
    if(keywords.indexOf(value) > -1){
      var index = keywords.indexOf(value);
      keywords.splice(index, 1)
      $(this).removeClass("active-keyword")
      if(keywords.length === 0 || keywords.first === ""){
      $("#search-results-container").empty();
    }
    } else {
      $(this).addClass("active-keyword");
      keywords.push(value);
    }
    var query = keywords.join(' ')

    var results = new SearchResultsCollection();
    var resultsCollectionView = new SearchResultsView({ collection: results});
    if (query.length > 0){
      results.fetch({
          reset: true,
          data: $.param({ query: query, handle: twitterHandle })
      });
    };
  });

  $("#one-degree-button").on("click", function(event) {
    event.preventDefault();

    var twitterUsers = new TwitterUsersCollection();
    var twitterUsersView = new TwitterUsersView({ collection: twitterUsers });

    twitterUsers.fetch({
      reset: true
    });
  })

  $("#twitter-button").on("click", function(event){
    event.preventDefault();
    var twitterHandle = $("#search-bar").val();
    // if (twitterHandle.match(/^[@]/)){

    // }
    $(this).attr('href').append(twitterHandle)
  });

});
