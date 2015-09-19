class BingResult
  attr_accessor :title, :description, :url

  def initialize(attributes)
    @title = attributes[:title]
    @description = attributes[:description]
    @url = attributes[:url]
  end

  def self.all_results(query)
    BingSearch.account_key = ENV['BING_ACCOUNT_KEY']
    results = []
    bing_search = BingSearch.web(query)
    num_results = BingSearch.web(query).length
    10.times do |count|
      title = bing_search[count].title
      description = bing_search[count].description
      url = bing_search[count].url
      results << BingResult.new(title: title, description: description, url: url)
    end
    p results
  end


end
