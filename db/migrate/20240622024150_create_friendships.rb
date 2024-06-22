class CreateFriendships < ActiveRecord::Migration[7.1]
  def change
    create_table :friendships do |t|
      t.references :first_user, null: false, foreign_key: { to_table: :users }
      t.references :second_user, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end

    add_index :friendships, [:first_user_id, :second_user_id], unique: true
  end
end
