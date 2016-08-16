class Dropcolumnquotes < ActiveRecord::Migration
  def change
  	remove_column :quotes, :users_id
  end
end
