class AddLockedToUsers < ActiveRecord::Migration[7.1]
  def up
    add_column :users, :locked, :boolean, default: false, null: false
  end

  def down
    remove_column :users, :locked
  end
end
