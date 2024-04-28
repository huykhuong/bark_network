class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title, null: true, limit: 255
      t.text :content, null: false
      t.references :author, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end

    change_column :posts, :content, :text, limit: 1000
  end
end
