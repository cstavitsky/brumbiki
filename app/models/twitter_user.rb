class TwitterUser
  include Clientable

  attr_reader :name

  def initialize(attributes)
    @uid = attributes[:uid]
    @handle = attributes[:handle]
    @name = attributes[:name]
    @profile_image = attributes[:profile_image]
    @user_type = attributes.fetch(:user_type, "current")
  end

  def self.locate_target(tweets)
    tweet = tweets.first

    TwitterUser.new(uid: tweet.target_id, handle: tweet.target_handle, name: tweet.target_name, profile_image: tweet.target_profile_image_url, user_type: "target")
  end

  def self.top_three_mentions(tweets)
    mentions_ids = tweets.map do |tweet|
      tweet.user_mentions.map { |mention| mention.id }
    end

    frequency = {}

    mentions_ids.flatten!.each do |id|
      frequency[id] = mentions_ids.count(id) unless frequency[id]
    end

    top_three_mentions_ids = frequency.keys

    if frequency.values.length > 3
      top_three = frequency.sort_by { |id, count| count }.last(3)
      top_three_mentions_ids = Hash[top_three].keys
    end

    Clientable.client.users(top_three_mentions_ids).map do |user|
      TwitterUser.new(uid: user.id, handle: user.screen_name, name: user.name, profile_image: user.profile_image_url, user_type: "tertiary")
    end
  end

end
