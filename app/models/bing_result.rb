require 'highscore'

class BingResult
  attr_reader :title, :description, :url, :keywords, :handle

  def initialize(attributes)
    @title = attributes[:title]
    @description = attributes[:description]
    @url = attributes[:url]
    @handle = attributes[:handle]
  end

  def self.all_results(query, handle)
    BingSearch.account_key = ENV['BING_ACCOUNT_KEY']
    results = []
    bing_search = BingSearch.web(query)
    10.times do |count|
      title = bing_search[count].title
      description = bing_search[count].description
      url = bing_search[count].url
      results << BingResult.new(title: title, description: description, url: url, handle: handle)
    end
    results
  end


end
