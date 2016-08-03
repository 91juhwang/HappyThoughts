class PostsController < ApplicationController
	def index
		@posts = Post.all
		@post = Post.new
		@user = User.find(current_user.id)
		@quote_api_key = Rails.application.secrets.quote_api_key
		@response = Unirest.post "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
														  headers:{
														    "X-Mashape-Key" => @quote_api_key,
														    "Content-Type" => "application/x-www-form-urlencoded",
														    "Accept" => "application/json"
														  }
		data = @response.body
		@daily_quote = data["quote"]
		@author = data["author"]
	end

	def create
		@user = User.find(current_user.id)
		@posts = Post.all
		@post = Post.new(post_params)
		if @post.save
			redirect_to "/posts"
		else
			render "index"
		end
	end

	def destroy
		@post = Post.find(params[:id])
		@post.destroy
		redirect_to "/posts"
	end

	private
		def post_params
			params.require(:post).permit(:body, :user_id, :image)
		end

end
