# require 'rails_helper'
#
# RSpec.describe Tweet, type: :model do
#   before :each do
#     @tweet = Tweet.new(tweet_id: "644251147579072518", target_id: 14375110, target_handle: "fogus", target_name: "Fogus", target_description: target_description="Contributor to Clojure and ClojureScript. The Joy of Clojure / Functional JavaScript (co+) author. Absurdist. Abstract strategist. Reader. Cognitect. Infonaut.", created_at: "September 16, 2015", user_mentions: [], text: "", text_keywords: [], title_keywords: [])
#   end
#
#   describe '.all_tweets' do
#     it 'should return some integer number of tweets from a valid user timeline using the Twitter API' do
#       expect(Tweet.all_tweets("fogus").length).to be_a(Integer);
#     end
#
#     it 'should return a failure if method is called on a nonexistent user' do
#       expect(Tweet.all_tweets("boojokjokjoskjdfokjokjfdsdfsa")).to eq("failure")
#     end
#
#     it 'should create instances of Tweet objects' do
#       expect(Tweet.all_tweets("fogus").last).to be_instance_of(Tweet)
#       expect(Tweet.all_tweets("fogus").first).to be_instance_of(Tweet)
#     end
#   end
#
#   # describe '.tweet_info' do
#   #   tweet = Tweet.all_tweets("fogus").first
#   #   it 'should return a hash of attributes that contains tweet_id' do
#   #     expect(Tweet.tweet_info(tweet)).to include(tweet_id)
#   #   end
#   # end
# end
