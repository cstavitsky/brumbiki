class TweetsController < ApplicationController

  def index
    @tweets = Tweet.all_tweets(params[:handle])
    render json: @tweets
  end

end
