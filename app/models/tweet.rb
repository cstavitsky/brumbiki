class Tweet

  def initialize(attributes)
    @target_handle = attributes[:handle]
    @target_id = attributes[:target_id]
    @created_at = attributes[:created_at]
    @user_mentions = attributes[:user_mentions]
    @text = attributes[:text]
    @user_profile_image_url = attributes[:user_profile_image_url]
    @links = attributes[:links]
    @text_keywords = attributes[:text_keywords]
    @title_keywords = attributes[:title_keywords]
  end

  def self.all_tweets(handle)
    self.client.user_timeline(handle, { count: 20, include_rts: false }).map do |tweet|
      Tweet.new(self.tweet_info(tweet))
    end
  end

  protected

  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_KEY']
      config.consumer_secret     = ENV['TWITTER_SECRET']
    end
  end

  def self.tweet_info(tweet)
    links = self.tweet_links(tweet)

    {
      target_handle: tweet.user.screen_name,
      target_id: tweet.user.id,
      created_at: tweet.created_at,
      user_mentions: self.mentions(tweet),
      text: self.tweet_text(tweet),
      user_profile_image_url: self.profile_image_url(tweet),
      links: links,
      text_keywords: self.text_keywords(tweet),
      title_keywords: self.title_keywords(links)
    }
  end

  def self.mentions(tweet)
    mentions_ids = tweet.user_mentions.map { |user_mention| user_mention.id }
    self.client.users(mentions_ids).map do |user|
      TwitterUser.new(uid: user.id, handle: user.screen_name, name: user.name, profile_image: user.profile_image_url, user_type: "tertiary")
    end
  end

  def self.expanded_urls(tweet)
    tweet.urls.map { |url| url.expanded_url.to_s }
  end

  def self.tweet_text(tweet)
    words = tweet.text.split(" ")
    words.delete_if { |word| word.match(/^\s*(#|$)|\b(http.*|https.*)\b/) }
    words.join(" ")
  end

  def self.profile_image_url(tweet)
    tweet.user.profile_image_url.to_s
  end

  def self.tweet_links(tweet)
    urls = self.expanded_urls(tweet)
    urls.map { |url| Link.new(url) }
  end

  def self.text_keywords(tweet)
    tweet.text.keywords.rank.map { |word| word.text }
  end

  def self.title_keywords(links)
    title_keywords = links.map do |link|
      link.title.keywords.rank.map { |word| word.text }
    end
    title_keywords.flatten
  end

end
