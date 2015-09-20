var TwitterUsersCollection = Backbone.Collection.extend({
  url: "/twitter_users",
  model: TwitterUser
});
