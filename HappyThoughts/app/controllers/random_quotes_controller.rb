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
			format.js { render :new }
		end
	end

end
