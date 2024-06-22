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
  validates :requester_id, :receiver_id, presence: true, numericality: { only_integer: true }
  validates :status, presence: true, inclusion: { in: VALID_STATUSES }

  validate :accepted_friend_request
  validate :send_friend_request_to_self
  validate :duplicate_friend_request

  # Scopes
  # --------------------------------
  scope :friend_request_sent, ->() { where(requester_id: current_user) }

  # Methods
  # --------------------------------
  def accept!
    Friendship.create!(first_user: requester, second_user: receiver)
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
  
  def send_friend_request_to_self
    if requester_id == receiver_id
      errors.add(:base, :sent_to_self)
    end
  end

  def duplicate_friend_request
    if FriendRequest.exists?(requester_id: requester_id, receiver_id: receiver_id, status: 'pending')
      errors.add(:base, :duplicate)
    end
  end

  def accepted_friend_request
    if FriendRequest.exists?(requester_id: requester_id, receiver_id: receiver_id, status: 'accepted')
      errors.add(:base, :accepted)
    end
  end
end
