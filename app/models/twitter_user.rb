class TwitterUser

  include Clientable

  attr_reader :uid, :name

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

  def connections(tweets, target_twitter_user)
    mentioned_ids = self.mentioned_ids(tweets).flatten!
    current_user_follower_ids = Clientable.client.follower_ids(self.uid.to_i)

    primary_ids = self.primary_connections(mentioned_ids, current_user_follower_ids) - [target_twitter_user.uid]
    user_types = ["primary"] * primary_ids.length

    secondary_ids = self.secondary_connections(target_twitter_user, current_user_follower_ids) - primary_ids - [target_twitter_user.uid]
    user_types += ["secondary"] * secondary_ids.length

    tertiary_ids = self.tertiary_connections(mentioned_ids - primary_ids - secondary_ids  - [target_twitter_user.uid])
    user_types += ["tertiary"] * tertiary_ids.length

    ids = primary_ids + secondary_ids + tertiary_ids

    connection_ids = Hash[ids.zip(user_types)]

    self.ids_to_twitter_users(connection_ids)
  end

  def mentioned_ids(tweets)
    tweets.map do |tweet|
      tweet.user_mentions.map { |mention| mention.id }
    end
  end

  def primary_connections(mentioned_ids, current_user_follower_ids)
    primary = mentioned_ids.select{ |mention_id| current_user_follower_ids.include?(mention_id) }

    primary.count > 3 ? primary[0..4] : primary
  end

  def secondary_connections(target_twitter_user, current_user_follower_ids)
    target_following_ids = Clientable.client.friend_ids(target_twitter_user.uid.to_i)
    secondary = current_user_follower_ids.select{ |follower_id| target_following_ids.include?(follower_id) }

    secondary.count > 3 ? secondary[0..4] : secondary
  end

  def tertiary_connections(mentioned_ids)
    frequency = {}

    mentioned_ids.each do |id|
      frequency[id] = mentioned_ids.count(id) unless frequency[id]
    end

    top_three_mentioned_ids = frequency.keys

    if frequency.values.length > 3
      top_three = frequency.sort_by { |id, count| count }.last(3)
      top_three_mentioned_ids = Hash[top_three].keys
    end

    top_three_mentioned_ids
  end

  def ids_to_twitter_users(connection_ids)
    Clientable.client.users(connection_ids.keys).map do |user|
      TwitterUser.new(uid: user.id, handle: user.screen_name, name: user.name, profile_image: user.profile_image_url.to_s, user_type: connection_ids[user.id], description: user.description)
    end
  end

end
