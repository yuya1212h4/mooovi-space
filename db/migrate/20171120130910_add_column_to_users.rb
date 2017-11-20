class AddColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :nickname, :string, null: false
    add_column :users, :image, :string
    add_column :users, :description, :text, null: false
  end
end
