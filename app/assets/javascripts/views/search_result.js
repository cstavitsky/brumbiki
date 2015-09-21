var SearchResultView = Backbone.View.extend({
  template: JST["templates/search_result"],
  className: "search_result",
  events: {
    "click #twitter-button" : "twitterButton"
  },

   render: function(){
    this.$el.html(this.template(this.model.attributes));
  },

  // twitterButton: function(event){
  //    event.preventDefault();
  //   var twitterHandle = $("#search-bar").val();
  //   var href = $("#twitter-button").attr('href')
  //   if (twitterHandle.match(/^[^@]/)){
  //     twitterHandle = "@" + twitterHandle
  //   }
  //   href.concat(twitterHandle)
  // }

});
