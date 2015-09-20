$(document).ready(function() {
  var keywords = []
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

  $("#temporary-container").on("click", ".keyword", function(event){
    event.preventDefault();
    var value = $(this).val();
    if(keywords.indexOf(value) > -1){
      var index = keywords.indexOf(value);
      keywords.splice(index, 1)
      $(this).removeClass("active-keyword")
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
          data: $.param({ query: query })
      });
    };
  });

  $("#one-degree-container").on("click", function(event) {
    event.preventDefault();

    var twitterUsers = new TwitterUsersCollection();

    twitterUsers.fetch({
      reset: true
    });
  });

});
