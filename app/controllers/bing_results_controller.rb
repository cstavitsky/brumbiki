class BingResultsController < ApplicationController

  def index
    p render json: BingResult.all_results(params[:query])
    # BingResult.all_results(params[:query]).each do |result|
    #   p result.title
    #   p result.description
    # end
  end

end
