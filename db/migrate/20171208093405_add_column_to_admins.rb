class AddColumnToAdmins < ActiveRecord::Migration[5.1]
  def change
    add_column :admins, :nickname, :string, null: false
    add_column :admins, :image, :string
    add_column :admins, :description, :text, null: false
  end
end
