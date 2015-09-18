require 'twitter'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = Rails.application.secrets.twitter_api_key
  config.consumer_secret     = Rails.application.secrets.twitter_api_secret
end

client.user_timeline("").each do |tweet|
  tweet.urls.each do |url|
    p url.expanded_url
  end
end
