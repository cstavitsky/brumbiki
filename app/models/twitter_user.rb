class TwitterUser
  include Clientable

  attr_reader :name, :uid

  def initialize(attributes)
    @uid = attributes[:uid]
    @handle = attributes[:handle]
    @name = attributes[:name]
    @profile_image = attributes[:profile_image]
    @user_type = attributes.fetch(:user_type, "current")
    @description = attributes[:description]
  end

  def self.locate_target(tweets)
    tweet = tweets.first

    TwitterUser.new(uid: tweet.target_id, handle: tweet.target_handle, name: tweet.target_name, profile_image: tweet.target_profile_image_url, description: tweet.target_description, user_type: "target")
  end

  def self.mention_ids(tweets)
    tweets.map do |tweet|
      tweet.user_mentions.map { |mention| mention.id }
    end
  end

  def self.ids_to_twitter_users(ids, user_types)
    Clientable.client.users(ids).map.with_index do |user, index|
      TwitterUser.new(uid: user.id, handle: user.screen_name, name: user.name, profile_image: user.profile_image_url.to_s, user_type: user_types[index], description: user.description)
    end
  end

  def self.connections(tweets, current_twitter_user, target_twitter_user)
    mention_ids = self.mention_ids(tweets).flatten!

    primary_ids = self.primary_connections(mention_ids, current_twitter_user)
    user_types = ["primary"] * primary_ids.length

    secondary_ids = self.secondary_connections(current_twitter_user, target_twitter_user)
    user_types += ["secondary"] * secondary_ids.length

    tertiary_ids = self.tertiary_connections(mention_ids)
    user_types += ["tertiary"] * tertiary_ids.length

    ids = primary_ids + secondary_ids + tertiary_ids

    self.ids_to_twitter_users(ids, user_types)
  end

  def self.primary_connections(mention_ids, current_twitter_user)
    follower_ids = Clientable.client.follower_ids(current_twitter_user.uid.to_i).to_h[:ids]
    primary_connection_ids = mention_ids.select{ |mention_id| follower_ids.include?(mention_id) }
    primary_connection_ids
  end

  def self.secondary_connections(current_twitter_user, target_twitter_user)
    # Find User's twitter followers
    # Find all users the Target is followING
    # Pull out any matches whom a) follow the User, and b) the Target follows
    user_follower_ids = Clientable.client.follower_ids(current_twitter_user.uid.to_i)
    target_following_ids = Clientable.client.friend_ids(target_twitter_user.uid.to_i)
    secondary_connection_ids = user_follower_ids.select{ |follower_id| target_following_ids.include?(follower_id) }
    secondary_connection_ids
  end

  def self.tertiary_connections(mention_ids)
    frequency = {}

    mention_ids.each do |id|
      frequency[id] = mention_ids.count(id) unless frequency[id]
    end

    top_three_mentions_ids = frequency.keys

    if frequency.values.length > 3
      top_three = frequency.sort_by { |id, count| count }.last(3)
      top_three_mentions_ids = Hash[top_three].keys
    end

    top_three_mentions_ids
  end
end
