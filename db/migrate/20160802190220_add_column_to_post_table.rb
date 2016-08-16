class AddColumnToPostTable < ActiveRecord::Migration
  def change
  	add_column :posts, :user_id, :integer, references: :users
  end
end
