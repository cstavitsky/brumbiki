class Tweet

  def initialize(attributes)
    @created_at = attributes[:created_at]
    @urls = attributes[:urls]
    # @user_mentions = attributes[:user_mentions]
    @text = attributes[:text]
    @user_profile_image_url = attributes[:user_profile_image_url]
  end

  def self.all_tweets(handle)
    self.client.user_timeline(handle).map do |tweet|
      created_at = tweet.created_at
      p urls = self.expanded_urls(tweet)
      text = tweet.text
      user_profile_image_url = tweet.user.profile_image_url.to_s
      Tweet.new(created_at: created_at, urls: urls, text: text, user_profile_image_url: user_profile_image_url)
    end
  end

  def self.expanded_urls(tweet)
    tweet.urls.map { |url| url.expanded_url.to_s }
  end

  protected

  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_KEY']
      config.consumer_secret     = ENV['TWITTER_SECRET']
    end
  end

end
