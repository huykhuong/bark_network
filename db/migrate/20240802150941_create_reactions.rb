class CreateReactions < ActiveRecord::Migration[7.1]
  def change
    create_table :reactions do |t|
      t.string :name
      t.text :user_id
      t.string :post_id

      t.timestamps
    end
    add_index :reactions, [:user_id, :post_id], unique: true
  end

  def up
    execute <<-SQL
      ALTER TABLE reactions
      ADD CONSTRAINT check_reaction
      CHECK (name IN ('like', 'heart', 'sad', 'wow', 'haha', 'angry'))
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE reactions
      DROP CONSTRAINT IF EXISTS check_reaction
    SQL
  end
end
