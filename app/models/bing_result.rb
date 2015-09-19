require 'highscore'

class BingResult
  attr_accessor :title, :description, :url, :keywords

  def initialize(attributes)
    @title = attributes[:title]
    @description = attributes[:description]
    @url = attributes[:url]
    @keywords = attributes[:keywords]
  end

  def self.all_results(query)
    BingSearch.account_key = ENV['BING_ACCOUNT_KEY']
    results = []
    bing_search = BingSearch.web(query)
    10.times do |count|
      p title = bing_search[count].title
      description = bing_search[count].description
      url = bing_search[count].url
      results << BingResult.new(title: title, description: description, url: url)
    end
    p results
  end


end
