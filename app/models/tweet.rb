class Tweet

  def initialize(attributes)
    @created_at = attributes[:created_at]
    @urls = attributes[:urls]
    # @user_mentions = attributes[:user_mentions]
    @text = attributes[:text]
    @user_profile_image_url = attributes[:user_profile_image_url]
    @link_titles = attributes[:link_titles]
    @keywords = attributes[:keywords]
    @title_keywords = attributes[:title_keywords]
  end

  def self.all_tweets(handle)
    self.client.user_timeline(handle, { count: 75, include_rts: false }).map do |tweet|
      created_at = tweet.created_at
      urls = self.expanded_urls(tweet)
      link_titles = self.scrape_urls_for_titles(urls)
      text = tweet.text
      # put an if statement here to account for tweets without links
      p title = link_titles[0].grab_title
      title_keywords = title.keywords
      keywords = text.keywords
      keywords = keywords.rank.map { |word| word.text }
      title_keywords = title_keywords.rank.map { |word| word.text }
      user_profile_image_url = tweet.user.profile_image_url.to_s
      Tweet.new(created_at: created_at, urls: urls, text: text, user_profile_image_url: user_profile_image_url, link_titles: link_titles, keywords: keywords, title_keywords: title_keywords)
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
