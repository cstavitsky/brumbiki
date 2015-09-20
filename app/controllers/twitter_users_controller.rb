class TwitterUsersController < ApplicationController

  def index
    attributes = { uid: current_user.uid, name: current_user.name, profile_image: current_user.profile_image }
    current_twitter_user = TwitterUser.new(attributes)

    # render json: TwitterUser.xxxxxxx.to_json
  end

end
