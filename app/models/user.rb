class User < ApplicationRecord
  include Rails.application.routes.url_helpers

  CONFIRMATION_TOKEN_EXPIRATION = 10.minutes
  PASSWORD_RESET_TOKEN_EXPIRATION = 5.minutes

  MAILER_FROM_EMAIL = 'no-reply@example.com'

  has_secure_password

  # Callbacks
  # --------------------------------
  before_save :downcase_email  

  # Associations
  # --------------------------------
  has_one :profile, dependent: :destroy
  has_many :posts, foreign_key: 'author_id', dependent: :destroy
  has_many :friend_requests_received, foreign_key: 'received_id', class_name: 'FriendRequest', inverse_of: 'receiver', dependent: :destroy
  has_many :friend_requests_sent, foreign_key: 'requester_id', class_name: 'FriendRequest', inverse_of: 'requester', dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, length: { maximum: 30 }, presence: true, uniqueness: true

  def confirm!
    update_columns(confirmed_at: Time.now)
  end

  def confirmed?
    confirmed_at.present?
  end

  def unconfirmed?
    !confirmed?
  end

  def generate_confirmation_token
    signed_id expires_in: CONFIRMATION_TOKEN_EXPIRATION, purpose: :confirm_email
  end

  def genereate_password_token
    signed_id expires_in: PASSWORD_RESET_TOKEN_EXPIRATION, purpose: :reset_password
  end

  def send_confirmation_email!
    confirmation_token = generate_confirmation_token
    UserMailer.confirmation(self, confirmation_token).deliver_now
  end

  def send_password_reset_email
    password_reset_token = genereate_password_token
    UserMailer.password_reset(self, password_reset_token).deliver_now
  end

  def to_react_params
    {
      avatar: profile.avatar.attached? ? rails_blob_path(profile.avatar, only_path: true) : '',
      username:,
      email:,
    }
  end

  private

  def downcase_email
    email.downcase
  end
end
