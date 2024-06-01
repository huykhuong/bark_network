require 'rails_helper'

RSpec.describe FriendRequest, type: :model do
  let (:user1) { create(:user) }
  let (:user2) { create(:user, email: 'someone@email.com', username: 'otherone') }

  subject(:friend_request) { build(:friend_request, requester: user1, receiver: user2) }

  describe "validations" do
    context 'Passed validations' do
      specify do
        expect(friend_request).to be_valid
      end
    end

    context 'Failed validations' do
      specify 'No status assigned' do
        friend_request.status = nil
        expect(friend_request).to_not be_valid
        expect(friend_request.errors[:status]).to include("A friend request must have a status.")
      end

      specify 'Invalid status assigned' do
        friend_request.status = 'hello'
        expect(friend_request).to_not be_valid
        expect(friend_request.errors[:status]).to include("hello is not a valid status.")
      end

      specify 'No requester assigned' do
        friend_request.requester = nil
        expect(friend_request).to_not be_valid
        expect(friend_request.errors[:requester]).to include("A friend request must have a requester.")
      end

      specify 'No receiver assigned' do
        friend_request.receiver = nil
        expect(friend_request).to_not be_valid
        expect(friend_request.errors[:receiver]).to include("A friend request must have a receiver.")
      end

      specify 'Requester and receiver are the same' do
        friend_request.receiver = friend_request.requester
        expect(friend_request).to_not be_valid
        expect(friend_request.errors[:base]).to include("You can't send a friend request to yourself.")
      end

      specify 'Duplicate friend request' do
        friend_request.requester = user1
        friend_request.receiver = user2
        friend_request.save
        duplicate_friend_request = friend_request.dup
        expect(duplicate_friend_request).to_not be_valid
        expect(duplicate_friend_request.errors[:base]).to include("You have already sent a friend request to this user.")
      end
    end
  end
end