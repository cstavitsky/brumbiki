$(document).ready(function() {

  var keywords = [];
  var tweet = "";

  var tweets = new TweetsCollection();
  var tweetsView = new TweetsView({ collection: tweets });

  var emptyContainers = function() {
    $('#target-container').find('*').not('.type-text-left').remove();
    $('#primary-container').find('*').not('.type-text-right').remove();
    $('#secondary-container').find('*').not('.type-text-left').remove();
    $('#tertiary-container').find('*').not('.type-text-right').remove();
  };

  $(".type-containers").hover(function() {
    $(this).children(".type-text-right").css("background-color", "#D93240");
    $(this).children(".type-text-left").css("background-color", "#D93240");
  }, function() {
    $(".type-text-right").css("background-color", "#242464");
    $(".type-text-left").css("background-color", "#242464");
  });

  $("#keyword-search-container").hide();

  $("form").on("submit", function(event) {
    event.preventDefault();

    // $("#pointer-arrow").fadeOut("slow");
    $("#loading-text").html("Loading...")
    $("#loading-container").show();
    $("#one-degree-button-container").fadeOut("slow");
    $("#one-degree-drawing-container").fadeOut("slow");
    emptyContainers();
    $("#search-results-container").find("*").not("#keyword-container, .keyword-tracker").remove();
    $("#keyword-container").empty();
    $("#tweets-container").empty();

    $("#content-container").show();
    $("#welcome-container").fadeOut("slow");
    $("#top-container").animate({ height: "35%" }, 2500);
    $("#bottom-container").animate({ top: "35%", height: "65%" }, 2500);

    var twitterHandle = $("#search-bar").val();

    tweets.fetch({
      reset: true,
      data: $.param({ handle: twitterHandle }),
      success: function(){
        $("#loading-container").hide();
      },
      error: function(){
        $("#loading-text").html("You searched for someone who doesn't exist in Twitter's database. Check your spelling and try again!")
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
    $("#top-container").animate({ height: "70%" }, 1000);
    $("#bottom-container").animate({ top: "70%", height: "30%" }, 1000);

    var twitterUsers = new TwitterUsersCollection();
    var twitterUsersView = new TwitterUsersView({ collection: twitterUsers });

    twitterUsers.fetch({
      reset: true
    });
  })

  $("#tweets-container").delegate(".keyword", "mouseover", function(event) {
    event.preventDefault();
    $(this).toggleClass("active-keyword-lite", 200);
  }).delegate(".keyword", "mouseout", function(){
    $(this).toggleClass("active-keyword-lite", 200);
  });

  $("#minimize-button").on("click", function(event) {
    event.preventDefault();

    $("#one-degree-drawing-container").hide();
    emptyContainers();

    $("#welcome-container").fadeOut("slow");
    $("#top-container").animate({ height: "35%" }, 2500);
    $("#bottom-container").animate({ top: "35%", height: "65%" }, 2500, "swing", function() {
      $("#one-degree-button-container").fadeIn("slow");
    });
  });

  $("#nav-brumbiki").on("click", function(event) {
    event.preventDefault();

    location = "/";
  });

});
