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
    mentions_ids = tweets.map do |tweet|
      tweet.user_mentions.map { |mention| mention.id }
    end
  end

  def self.ids_to_twitter_users(ids, user_type)
    Clientable.client.users(ids).map do |user|
      TwitterUser.new(uid: user.id, handle: user.screen_name, name: user.name, profile_image: user.profile_image_url.to_s, user_type: user_type, description: user.description)
    end
  end

  def self.primary_connections(mention_ids, current_twitter_user)
    # Goal: find those twitter users that were a) mentioned by Target and b) follow the User
    # take list of mention_ids (the list of ALL ids for users that Target has mentioned recently, not just top 3)
    # follower_ids = Request list of follower IDs for User from API
    # mention_ids.each { |id| #check if follower_ids includes id}
    mention_ids.flatten!
    follower_ids = Clientable.client.follower_ids(current_twitter_user.uid.to_i).to_h[:ids]
    p primary_connection_ids = mention_ids.select{ |mention_id| follower_ids.include?(mention_id) }

    ids_to_twitter_users(primary_connection_ids, "primary")
  end

  def self.secondary_connections(current_twitter_user, target_twitter_user)
    # Find User's twitter followers
    # Find all users the Target is followING
    # Pull out any matches whom a) follow the User, and b) the Target follows
    user_follower_ids = Clientable.client.follower_ids(current_twitter_user.uid.to_i)
    target_following_ids = Clientable.client.friend_ids(target_twitter_user.uid.to_i)
    secondary_connection_ids = user_follower_ids.select{ |follower_id| target_following_ids.include?(follower_id) }

    ids_to_twitter_users(secondary_connection_ids, "secondary")
  end

  def self.tertiary_connections(mention_ids)
    frequency = {}

    mention_ids.flatten!.each do |id|
      frequency[id] = mention_ids.count(id) unless frequency[id]
    end

    top_three_mentions_ids = frequency.keys

    if frequency.values.length > 3
      top_three = frequency.sort_by { |id, count| count }.last(3)
      top_three_mentions_ids = Hash[top_three].keys
    end

    ids_to_twitter_users(top_three_mentions_ids, "tertiary")

  end
end
