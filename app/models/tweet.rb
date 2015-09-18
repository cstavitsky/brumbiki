# require 'twitter'

class Tweet

  def self.all(handle)
    self.client.user_timeline(handle).map { |tweet| tweet.to_h }
  end

  protected

  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.secrets.twitter_api_key
      config.consumer_secret     = Rails.application.secrets.twitter_api_secret
    end
  end

end
