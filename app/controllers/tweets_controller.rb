class TweetsController < ApplicationController

  def index
    tweets = Tweet.all_tweets(params[:handle])
    current_user.update_attributes(target_tweets: tweets)
    render json: tweets
  end

end
