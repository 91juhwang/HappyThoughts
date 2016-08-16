class WelcomeController < ApplicationController
	before_action :user_redirect_welcome

	def index
		@posts = Post.all
	end

	private 
		def user_redirect_welcome
			if current_user
				redirect_to "/posts"
			end
		end

end
