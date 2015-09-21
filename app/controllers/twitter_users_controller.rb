class TwitterUsersController < ApplicationController

  def index
    attributes = { uid: current_user.uid, name: current_user.name, profile_image: current_user.profile_image }
    current_twitter_user = TwitterUser.new(attributes)
    target_twitter_user = TwitterUser.locate_target(current_user.target_tweets)
    target_mention_ids = TwitterUser.mention_ids(current_user.target_tweets)
    tertiary_twitter_users = TwitterUser.tertiary_connections(target_mention_ids)
    secondary_twitter_users = TwitterUser.secondary_connections(current_twitter_user, target_twitter_user)
    primary_twitter_users = TwitterUser.primary_connections(target_mention_ids, current_twitter_user)
    twitter_users = [current_twitter_user, target_twitter_user] + primary_twitter_users + secondary_twitter_users + tertiary_twitter_users

    render json: twitter_users
  end

end
