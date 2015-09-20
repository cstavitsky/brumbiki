class TwitterUsersController < ApplicationController

  def index
    attributes = { uid: current_user.uid, name: current_user.name, profile_image: current_user.profile_image }
    current_twitter_user = TwitterUser.new(attributes)
    target_twitter_user = TwitterUser.locate_target(current_user.target_tweets)
    tertiary_twitter_users = TwitterUser.top_three_mentions(current_user.target_tweets)
    everything = [current_twitter_user, target_twitter_user] + tertiary_twitter_users

    render json: everything
  end

end
