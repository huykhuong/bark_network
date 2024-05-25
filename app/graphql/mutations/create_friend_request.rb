# frozen_string_literal: true

module Mutations
  class CreateFriendRequest < Mutations::BaseMutation 
    argument :receiver_profile_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def resolve(receiver_profile_id:)
      receiver_id = Profile.find(receiver_profile_id).user.id

      params = { receiver_id:, requester_id: current_user.id }

      @friend_request = FriendRequest.find_by(**params) || FriendRequest.new(**params) 

      error_message = nil

      error_message = 'You cannot send a friend request to yourself' if current_user.id == receiver_id
      error_message ='You have already sent a friend request to this user' if @friend_request.persisted? && @friend_request.pending?      
      error_message= 'No user found with this ID' unless @friend_request.valid?

      if @friend_request.persisted? && @friend_request.declined?
        @friend_request.resend!
      elsif @friend_request.save
      else
        { errors: 'A problem occured when sending a friend request.' }
      end

      { errors: error_message }
    end
  end
end
