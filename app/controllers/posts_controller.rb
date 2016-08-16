require "json"
class PostsController < ApplicationController
	before_action :user_redirect

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

		# counting words section
		thoughts = []
		@user.posts.each do |p| 
			thoughts.push(p.body.split)
		end
		
		@thoughts_flatten = thoughts.flatten 
		@thoughts_hash = counted_words(@thoughts_flatten) #function to count flattened words
		# Changing above hash to this format: [{word => "df", count => 1}, {word => "s", count => 4}]
		@thoughts_arry = change_counted_word_format(@thoughts_hash) 
		@thoughts_json = @thoughts_arry.to_json #tansfering data to json
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

		def user_redirect
			if !current_user
				flash[:error] = "You must be logged in to access this page"
				redirect_to "/"
			end
		end

		def counted_words(arry)
			count_words = {}
			arry.each do |word| 
				if count_words.has_key?(word)
					value = count_words.fetch(word)
					count_words[word] = value + 1
				else
					count_words[word] = 1
				end
			end
			return count_words
		end

		def change_counted_word_format(hash)
			arry = []
			hash.each do |k, v|
				arry << {"word" => k, "count" => v}
			end
			return arry
		end
end
