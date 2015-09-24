$(document).ready(function() {

  var keywords = [];
  var tweet = "";

  var tweets = new TweetsCollection();
  var tweetsView = new TweetsView({ collection: tweets });
  $("#loading-container").hide();

  var emptyContainers = function() {
    $('#target-container').find('*').not('.type-text-left').remove();
    $('#primary-container').find('*').not('.type-text-right').remove();
    $('#secondary-container').find('*').not('.type-text-left').remove();
    $('#tertiary-container').find('*').not('.type-text-right').remove();
  };

  $(".type-containers").hover(function() {
    $(this).children(".type-text-right").css("background-color", "#A32200");
    $(this).children(".type-text-left").css("background-color", "#A32200");
  }, function() {
    $(".type-text-right").css("background-color", "#004567");
    $(".type-text-left").css("background-color", "#004567");
  });

  $("#keyword-search-container").hide();

  $("form").on("submit", function(event) {
    event.preventDefault();

    // $("#pointer-arrow").fadeOut("slow");
    $("#loading-container").fadeIn("slow");
    $("#one-degree-button-container").fadeOut("slow");
    $("#one-degree-drawing-container").fadeOut("slow");
    emptyContainers();
    $("#search-results-container").find("*").not("#keyword-container, .keyword-tracker").remove();
    $("#keyword-container").empty();
    $("#tweets-container").empty();

    $("#welcome-container").fadeOut("slow");
    $("#top-container").animate({ height: "250" }, 2500);

    var twitterHandle = $("#search-bar").val();

    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle }),
      success: function(){
        $("#loading-container").fadeOut('slow');
      }
    });
  });

  function tweetFor(keywordButton) {
    return $(keywordButton).parent().parent().find(".tweet-container")
  }

  function toggleKeyword(keywordButton) {
    if(tweetFor(keywordButton)[0] != tweet[0]){
      keywords = []
      $(".keyword").removeClass("active-keyword")
      $("#keyword-container").empty();
    }
  };

  function removeKeyword(keywordButton) {
    tweet = tweetFor(keywordButton);
    var value = $(keywordButton).val();
    var index = keywords.indexOf(value);
    if (index > -1) {
      keywords.splice(index, 1)
      $(keywordButton).removeClass("active-keyword")
      if(keywords.length === 0 || keywords.first === "") {
        $("#search-results-container").find("*").not("#keyword-container, .keyword-tracker").remove();
      }
    }
    else {
      $(keywordButton).addClass("active-keyword");
      keywords.push(value);
    }
  }

  $("#tweets-container").on("click", ".keyword", function(event) {
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
    }
  });

  $("#tweets-container").on("click", ".keyword", function(event) {
    event.preventDefault();

    var text = $(this).val()
    if($(this).hasClass("active-keyword")) {
      var text = $(this).val()
      $("#keyword-container").append("<input class='keyword-tracker' type='submit' value=" + text + ">")
    }
    else {
      $('.keyword-tracker').filter(function() {
        return $(this).val() === text;
      }).css("display", "none");
    }
  });

  $("body").on("click", ".keyword-tracker", function(event) {
    event.preventDefault();
    var twitterHandle = $("#search-bar").val();
    $(this).remove();
    var text = $(this).val()
    removeKeyword($('.keyword').filter(function() {
      return $(this).val() === text
    }));
    var query = keywords.join(' ')
    var results = new SearchResultsCollection();
    var resultsCollectionView = new SearchResultsView({ collection: results});
    if (query.length > 0) {
      results.fetch({
        reset: true,
        data: $.param({ query: query, handle: twitterHandle })
      });
    }
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

  $("#minimize-button").on("click", function(event) {
    event.preventDefault();

    $("#one-degree-drawing-container").hide();
    emptyContainers();

    $("#top-container").animate({ height: "250" }, 2500);
    $("#one-degree-button-container").fadeIn("slow")
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
