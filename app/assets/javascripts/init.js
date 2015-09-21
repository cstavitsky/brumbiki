$(document).ready(function() {
  var keywords = []
  var tweet = ""
  var tweets = new TweetsCollection();
  var tweetsView = new TweetsView({ collection: tweets });

  $("#keyword-search-container").hide();

  $("form").on("submit", function(event) {
    event.preventDefault();

    $("#current-target-container").empty();
    $("#third-degree-container").empty();
    $("#welcome-container").fadeOut("slow");
    $("#top-container").animate({ height: "250" }, 2500);

    var twitterHandle = $("#search-bar").val();

    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle })
    });
    $("#search-results-container").empty();
  });

  // $("#link-search-button").on("click", function(event){
  //   event.preventDefault();
  //
  //   var query = $("#link-search-bar").val();
  //   var results = new SearchResultsCollection();
  //   var resultsCollectionView = new SearchResultsView({ collection: results});
  //
  //   results.fetch({
  //     reset: true,
  //     data: $.param({ query: query })
  //   });
  // });

 function toggleKeyword (keywordButton){
  if($(keywordButton).closest(".tweet")[0] != tweet[0]){
      keywords = []
      console.log($(keywordButton))
      $(".keyword").removeClass("active-keyword")
    }
  };

  function removeKeyword(keywordButton) {
    tweet = $(keywordButton).closest(".tweet")
      var value = $(keywordButton).val();
      if(keywords.indexOf(value) > -1){
        var index = keywords.indexOf(value);
        keywords.splice(index, 1)
        $(keywordButton).removeClass("active-keyword")
        if(keywords.length === 0 || keywords.first === ""){
        $("#search-results-container").empty();
      }
      } else {
        $(keywordButton).addClass("active-keyword");
        keywords.push(value);
      }
    }

  $("#tweets-container").on("click", ".keyword", function(event){
      event.preventDefault();
    var twitterHandle = $("#search-bar").val();
    toggleKeyword(this)
    removeKeyword(this)
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

    $("#top-container").animate({ height: "500" }, 1000);

    var twitterUsers = new TwitterUsersCollection();
    var twitterUsersView = new TwitterUsersView({ collection: twitterUsers });

    twitterUsers.fetch({
      reset: true
    });
  })

});
