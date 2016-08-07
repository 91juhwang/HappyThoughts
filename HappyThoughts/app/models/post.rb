class Post < ActiveRecord::Base
	has_attached_file :image, :styles => { large: "320x320>", thumb: "100x100#"}
	# , :default_url => "images/:styles/missing.png"
	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	
	belongs_to :user
	validates :body,
		presence: true,
		length: { minimum: 20 }
end
