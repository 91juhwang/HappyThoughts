class PostsController < ApplicationController
	def index
		@posts = Post.all
		@post = Post.new
		@user = User.find(current_user.id)
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
			params.require(:post).permit(:body, :user_id)
		end

end
