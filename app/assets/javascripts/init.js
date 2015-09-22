$(document).ready(function() {
  var keywords = []
  var tweet = ""

  $("#keyword-search-container").hide();

  var tweets = new TweetsCollection();
  var tweetsView = new TweetsView({ collection: tweets });

  $("#keyword-search-container").hide();

  $("form").on("submit", function(event) {
    event.preventDefault();

    $("#one-degree-drawing-container").fadeOut("slow");

    $('#target-container').find('*').not('.type-text-left').remove();
    $('#primary-container').find('*').not('.type-text-right').remove();
    $('#secondary-container').find('*').not('.type-text-left').remove();
    $('#tertiary-container').find('*').not('.type-text-right').remove();

    $("#tweets-container").empty();
    $("#welcome-container").fadeOut("slow");
    $("#top-container").animate({ height: "250" }, 2500);

    var twitterHandle = $("#search-bar").val();

    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle })
    });
    $("#search-results-container").empty();
  });

 function toggleKeyword(keywordButton) {
  if($(keywordButton).closest(".tweet")[0] != tweet[0]){
      keywords = []
      $(".keyword").removeClass("active-keyword")
      $("#keyword-container").empty();
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
    };

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

  $("#tweets-container").on("click", ".keyword", function(event){
      event.preventDefault();
    var text = $(this).val()
    if($(this).hasClass("active-keyword")){
    var text = $(this).val()
    $("#keyword-container").append("<input class='keyword-tracker' type='submit' value="+ text +">")
    }
    else{
      $('.keyword-tracker').filter(function() {
        return $(this).val() === text;
      }).css("display", "none");
    }
  });

  $("body").on("click", ".keyword-tracker", function(event){
      event.preventDefault();
      var twitterHandle = $("#search-bar").val();
      $(this).remove();
      var text = $(this).val()
      $('.keyword').filter(function() {
        return $(this).val() === text;
      }).removeClass("active-keyword");
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

    $("#one-degree-button-container").fadeOut("slow");
    $("#top-container").animate({ height: "500" }, 1000);

    var twitterUsers = new TwitterUsersCollection();
    var twitterUsersView = new TwitterUsersView({ collection: twitterUsers });

    twitterUsers.fetch({
      reset: true
    });
  })

  $("#tweets-container").delegate(".keyword", "mouseover", function(event) {
    event.preventDefault();
    $(this).toggleClass("active-keyword-lite", 300);
  }).delegate(".keyword", "mouseout", function(){
    $(this).toggleClass("active-keyword-lite", 300);
  });

  // $("#tertiary-container").on("mouseenter", ".twitter-user", function(event){
  //   event.preventDefault();
  //   $(this).find("#twitter-user-description").css("display", "inline-block")
  // })
  //
  // $("#tertiary-container").on("mouseleave", ".twitter-user", function(event){
  //   event.preventDefault();
  //   $(this).find("#twitter-user-description").css("display", "none")
  // })
  //
  //  $("#tertiary-container").on("click", ".profile-circles", function(event){
  //   event.preventDefault()
  //   $(".twitter-user").draggable();
  // })

});
