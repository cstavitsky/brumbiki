class BingResultsController < ApplicationController

  def index
    render json: BingResult.all_results(params[:query], params[:handle])
  end

end
