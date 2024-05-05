class Profile < ApplicationRecord
  # Callbacks
  # --------------------------------
  before_save :set_default_display_name

  # Associations
  # --------------------------------
  belongs_to :user

  # Validations
  # --------------------------------
  validates :bio, length: { maximum: 250 }, allow_nil: true
  validates :display_name, format: {  without: /\s/, message: :format }, allow_nil: true
  validates :date_of_birth, presence: true, on: :update
  validates :gender, presence: true, inclusion: { in: %w(male female undisclosed) }

  # Custom Validations
  # --------------------------------
  validate :is_valid_date_of_birth, on: :update

  # Methods
  # --------------------------------
  def to_react_params
    {
      bio: ,display_name:,
      date_of_birth:, last_signed_in:,
      gender:,
      setup: setup?
    }
  end

  private

  def set_default_display_name
    self.display_name = user.username if display_name.blank?
  end

  def is_valid_date_of_birth
    if date_of_birth.present? && date_of_birth > Date.today
      errors.add(:date_of_birth, :invalid)
    end
  end
end
