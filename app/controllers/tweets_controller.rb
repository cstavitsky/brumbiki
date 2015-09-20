class TweetsController < ApplicationController

  def index
    tweets = Tweet.all_tweets(params[:handle])
    current_user.update_attributes(target_tweets: tweets) if current_user
    render json: tweets
  end

end
