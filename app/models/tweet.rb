class Tweet
  include Clientable

  attr_reader :target_id, :target_handle, :target_name, :user_mentions, :target_profile_image_url

  def initialize(attributes)
    @embedded_tweet = attributes[:embedded_tweet]
    @target_id = attributes[:target_id]
    @target_handle = attributes[:handle]
    @target_name = attributes[:target_name]
    @created_at = attributes[:created_at]
    @user_mentions = attributes[:user_mentions]
    @text = attributes[:text]
    @target_profile_image_url = attributes[:target_profile_image_url]
    @links = attributes[:links]
    @text_keywords = attributes[:text_keywords]
    @title_keywords = attributes[:title_keywords]
  end

  def self.all_tweets(handle)
    Clientable.client.user_timeline(handle, { count: 40, include_rts: false }).map do |tweet|
      Tweet.new(self.tweet_info(tweet))
    end
  end

  protected

  def self.tweet_info(tweet)
    text = self.tweet_text(tweet)
    links = self.tweet_links(tweet)

    {
      embedded_tweet: self.client.oembed("#{tweet.id}").html,
      target_id: tweet.user.id,
      target_handle: tweet.user.screen_name,
      target_name: tweet.user.name,
      created_at: tweet.created_at,
      user_mentions: tweet.user_mentions,
      text: text,
      target_profile_image_url: self.profile_image_url(tweet),
      links: links,
      text_keywords: self.text_keywords(text),
      title_keywords: self.title_keywords(links)
    }
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

  def self.text_keywords(text)
    text.keywords.rank.map { |word| word.text }
  end

  def self.title_keywords(links)
    title_keywords = links.map do |link|
      link.title.keywords.rank.map { |word| word.text }
    end
    title_keywords.flatten
  end

end
