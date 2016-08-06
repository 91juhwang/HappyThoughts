class RandomQuotesController < ApplicationController

	def new
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
		
		respond_to do |format|
			format.js
		end
	end

	# calling in JSON data as url 
	def d3_data
		@posts = Post.all
		@user = User.find(current_user.id)

		# counting words section
		thoughts = []
		@user.posts.each do |p| 
			thoughts.push(p.body.split)
		end

		@thoughts_flatten = thoughts.flatten 
		@thoughts_hash = counted_words(@thoughts_flatten) #function to count flattened words
		@thoughts_json = @thoughts_hash.to_json #tansfering data to json
		render(json: @thoughts_json)
	end

	private
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
end
