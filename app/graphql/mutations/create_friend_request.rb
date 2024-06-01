# frozen_string_literal: true

module Mutations
  class CreateFriendRequest < Mutations::BaseMutation
    argument :receiver_profile_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def resolve(receiver_profile_id:)
      @receiver_id = Profile.find(receiver_profile_id).user.id

      params = { receiver_id: @receiver_id, requester_id: current_user.id }

      @friend_request = FriendRequest.find_by(**params) || FriendRequest.new(**params)

      error_message = check_errors
      return { errors: error_message } if error_message

      if @friend_request.persisted? && @friend_request.declined?
        @friend_request.resend!
        return { errors: nil }
      end

      if @friend_request.save
        return { errors: nil }
      else
        { errors: 'A problem occured when sending a friend request.' }
      end
    end

    private

    def check_errors
      return 'You cannot send a friend request to yourself' if current_user.id == @receiver_id
      return 'You have already sent a friend request to this user' if @friend_request.persisted? && @friend_request.pending?      
      return 'Friend request is invalid' unless @friend_request.valid?
      return 'No user found with the provided ID' unless Profile.exists?(user_id: @receiver_id)
    end
  end
end
