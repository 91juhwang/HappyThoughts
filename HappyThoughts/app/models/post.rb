class Post < ActiveRecord::Base
	belongs_to :user
	validates :body,
		presence: true,
		length: { minimum: 20 }
end
