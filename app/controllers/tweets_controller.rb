class TweetsController < ApplicationController

  def index
    render json: Tweet.all_tweets(params[:handle]).to_json
  end

end
