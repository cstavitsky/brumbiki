class Tweet

  def initialize(attributes)
    @created_at = attributes[:created_at]
    @urls = attributes[:urls]
    # @user_mentions = attributes[:user_mentions]
    @text = attributes[:text]
    @user_profile_image_url = attributes[:user_profile_image_url]
    @link_titles = attributes[:link_titles]
    @keywords = attributes[:keywords]
  end

  def self.all_tweets(handle)
    self.client.user_timeline(handle, { count: 40, include_rts: false }).map do |tweet|
      created_at = tweet.created_at
      urls = self.expanded_urls(tweet)
      link_titles = self.scrape_urls_for_titles(urls)
      p text = tweet.text
      keywords = text.keywords
      p keywords = keywords.rank.map { |word| word.text }
      user_profile_image_url = tweet.user.profile_image_url.to_s
      Tweet.new(created_at: created_at, urls: urls, text: text, user_profile_image_url: user_profile_image_url, link_titles: link_titles, keywords: keywords)
    end
  end

  def self.expanded_urls(tweet)
    tweet.urls.map { |url| url.expanded_url.to_s }
  end

  def self.scrape_urls_for_titles(urls)
    urls.map { |url| Link.new(url) }
  end

  protected

  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_KEY']
      config.consumer_secret     = ENV['TWITTER_SECRET']
    end
  end

end
