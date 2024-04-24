class AddSetupToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :setup, :boolean
  end
end
