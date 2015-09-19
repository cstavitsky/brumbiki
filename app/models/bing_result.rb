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
      # p text = Highscore::Content.new "foo bar"
      keywords = title.keywords
      p keywords = keywords.rank.map { |word| word.text }
      results << BingResult.new(title: title, description: description, url: url, keywords: keywords)
    end
    p results
  end


end
