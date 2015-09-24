require 'highscore'

class BingResult

  attr_reader :url, :title, :description, :keywords, :handle

  def initialize(attributes)
    @url = attributes[:url]
    @title = attributes[:title]
    @description = attributes[:description]
    @handle = attributes[:handle]
  end

  def self.all_results(query, handle)
    BingSearch.account_key = ENV['BING_ACCOUNT_KEY']
    BingSearch.web(query, limit: 10).map do |search_result|
      BingResult.new(url: search_result.url, title: search_result.title, description: search_result.description, handle: handle)
    end
  end

end
