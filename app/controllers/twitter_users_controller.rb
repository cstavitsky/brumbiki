class TwitterUsersController < ApplicationController

  def index
    attributes = {  uid: current_user.uid,
                    handle: current_user.handle,
                    name: current_user.name,
                    profile_image: current_user.profile_image,
                    description: current_user.description  }

    current_twitter_user = TwitterUser.new(attributes)
    target_twitter_user = TwitterUser.locate_target(current_user.target_tweets)
    connected_twitter_users = current_twitter_user.connections(current_user.target_tweets, target_twitter_user)

    render json: [current_twitter_user, target_twitter_user] + connected_twitter_users
  end

end
