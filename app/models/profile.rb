class Profile < ApplicationRecord
  before_save :set_default_display_name

  belongs_to :user

  validates :bio, length: { maximum: 250 }, allow_nil: true
  validates :display_name, format: {  without: /\s/ }, allow_nil: true
  validates :gender, inclusion: { in: %w(male female undisclosed) }

  private

  def set_default_display_name
    display_name = user.username if display_name.blank?
  end
end
