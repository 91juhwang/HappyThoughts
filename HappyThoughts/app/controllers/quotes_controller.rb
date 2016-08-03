class QuotesController < ApplicationController
	def index
		@user = User.find(current_user.id)
		@quotes = Quote.all
	end

	def create
		@quote = Quote.create(quote_params)
		redirect_to "/quotes"
	end

	def destroy
		@quote = Quote.find(params[:id])
		@quote.destroy
		redirect_to "/quotes"
	end

	private
		def quote_params
			params.permit(:quotes, :author, :user_id)
		end

end
