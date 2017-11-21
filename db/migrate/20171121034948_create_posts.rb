class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :movie_url
      t.text :description, null: false

      t.timestamps
    end
  end
end
