class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.text :description
      t.string :location
      t.string :handle
      t.string :token
      t.string :secret
      t.string :profile_image
      t.text :target_tweets

      t.timestamps null: false
    end
  end
end
