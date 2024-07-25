class Comment < ApplicationRecord
  # Callbacks
  # --------------------------------
  before_save :sanitize_text_input

  # Associations
  # --------------------------------
  belongs_to :commenter, class_name: 'User', foreign_key: 'commenter_id'
  belongs_to :post

  # Scopes
  # --------------------------------
  scope :for_user, lambda { |user_id| joins(:commenter, :post).where(users: { id: user_id }, posts: { author_id: user_id }) }

  # Validations
  # --------------------------------
  validates :comment, length: { maximum: 300 }, presence: true
  validates :commenter, presence: true
  validates :post, presence: true

  # Methods
  # --------------------------------
  def edited?
    updated_at != created_at
  end

  def to_react_params
    {
      id:,
      comment:,
      created_at:,
      edited: edited?
    }
  end

  private

  def sanitize_text_input
    self.comment = ActionController::Base.helpers.sanitize(comment)
  end
end
