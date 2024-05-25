class FriendRequest < ApplicationRecord
  # Callbacks
  # --------------------------------
  after_initialize :set_default_status

  VALID_STATUSES = %w[pending accepted declined]

  # Associations
  # --------------------------------
  belongs_to :receiver, class_name: 'User', foreign_key: 'receiver_id'
  belongs_to :requester, class_name: 'User', foreign_key: 'requester_id'

  # Validations
  # --------------------------------
  validates :receiver, presence: true
  validates :requester, presence: true
  validates :receiver_id, uniqueness: { scope: :requester_id }
  validates :status, presence: true, inclusion: { in: VALID_STATUSES }

  # Scopes
  # --------------------------------
  scope :friend_request_sent, ->() { where(requester_id: current_user) }

  # Methods
  # --------------------------------
  def accept!
    update_columns(status: 'accepted')
  end

  def decline!
    update_columns(status: 'declined')
  end

  def resend!
    update_columns(status: 'pending')
  end

  def pending?
    status == 'pending'
  end

  def declined?
    status == 'declined'
  end

  def to_react_params
    {
      id:
    }
  end  

  private

  def set_default_status
    self.status ||= 'pending'
  end
end
