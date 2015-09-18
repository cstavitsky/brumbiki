class TweetsController < ApplicationController

  def index
    render json: Tweet.all(params[:handle])
  end

end
