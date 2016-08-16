class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
    	t.string :quotes
    	t.string :author
    	t.references :users, :user_id, :integer

      t.timestamps null: false
    end
  end
end
