class Friendship < ApplicationRecord
  # Callbacks
  # --------------------------------
  before_save :sort_user_ids

  # Associations
  # --------------------------------
  belongs_to :first_user, class_name: 'User', foreign_key: 'first_user_id'
  belongs_to :second_user, class_name: 'User', foreign_key: 'second_user_id'

  # Valudations
  # --------------------------------
  validates :first_user, presence: true
  validates :second_user, presence: true
  validates :first_user_id, uniqueness: { scope: :second_user_id }
  validates :first_user_id, :second_user_id, presence: true, numericality: { only_integer: true }

  private

  def sort_user_ids
    self.first_user_id, self.second_user_id = [first_user_id, second_user_id].sort
  end
end
