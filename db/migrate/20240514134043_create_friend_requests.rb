class CreateFriendRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :friend_requests do |t|
      t.references :receiver, null: false, foreign_key: { to_table: :users }
      t.references :requester, null: false, foreign_key: { to_table: :users }
      t.string :status

      t.timestamps
    end

    add_index :friend_requests, [:receiver_id, :requester_id], unique: true
  end

  def up
    execute <<-SQL
      CREATE TYPE friend_request_status AS ENUM ('pending', 'accepted', 'declined');
    SQL
    change_column :friend_requests, :status, :friend_request_status
  end

  def down
    change_column :friend_requests, :status, :string
    execute <<-SQL
      DROP TYPE friend_request_status;
    SQL
  end
end
