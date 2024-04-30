class Post < ApplicationRecord
  # Callbacks
  # --------------------------------
  before_save :sanitize_text_input

  # Associations
  # --------------------------------
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
  has_one :profile, through: :author

  # Validations
  # --------------------------------
  validates :title, length: { maximum: 255 }, allow_nil: true
  validates :content, length: { maximum: 1000 }, presence: true
  validates :author, presence: true

  # Methods
  # --------------------------------
  def edited?
    updated_at != created_at
  end

  def to_react_params
    {
      id:,
      title:,
      content:,
      created_at:,
      edited: edited?,
      author_name: profile.display_name
    }
  end

  private

  def sanitize_text_input
    self.title = ActionController::Base.helpers.sanitize(title)
    self.content = ActionController::Base.helpers.sanitize(content)
  end
end
