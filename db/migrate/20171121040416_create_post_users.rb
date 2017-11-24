class CreatePostUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :post_users do |t|
      t.references :user
      t.references :post
      t.timestamps
    end
  end
end
