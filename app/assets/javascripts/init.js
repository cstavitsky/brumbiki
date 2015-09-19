$(document).ready(function() {

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
    })

});
