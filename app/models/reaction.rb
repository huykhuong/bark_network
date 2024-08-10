class Reaction < ApplicationRecord
  VALID_REACTIONS = %w(like heart haha wow sad angry).freeze

  belongs_to :user
  belongs_to :post
  has_one :profile, through: :user, source: :profile, strict_loading: true

  # Validations
  # --------------------------------
  validates :name, presence: true, inclusion: { in: VALID_REACTIONS, message: 'is not included in the list' }
  validates :user, presence: true
  validates :user_id, uniqueness: { scope: :post_id }

  # Scopes
  # --------------------------------
  scope :for_post, ->(post_id) { where(post_id: post_id) }
  scope :for_user_post, ->(user_id, post_id) { where(user_id: user_id, post_id: post_id) }

  # Methods
  # --------------------------------
  def to_react_params(user_id)
    {
      id:,
      name:,
      is_current_user_reaction: self.user_id == user_id.to_s,
    }
  end
end
