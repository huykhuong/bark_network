class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :display_name
      t.text :bio
      t.string :gender
      t.datetime :last_signed_in
      t.date :date_of_birth
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end

  def up
    execute <<-SQL
      ALTER TABLE profiles
      ADD CONSTRAINT check_gender
      CHECK (gender IN ('male', 'female', 'undisclosed'))
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE profiles
      DROP CONSTRAINT IF EXISTS check_gender
    SQL
  end
end
