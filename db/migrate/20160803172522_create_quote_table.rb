class CreateQuoteTable < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
    	t.string :quotes
    	t.string :author
    	t.references :user, :users
    	t.timestamps null: false
    end
  end
end
