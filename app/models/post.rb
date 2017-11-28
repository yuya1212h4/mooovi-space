class Post < ApplicationRecord
  has_many :post_users
  has_many :users, through: :post_users

  mount_uploader :movie_url, VideoUploader
end
