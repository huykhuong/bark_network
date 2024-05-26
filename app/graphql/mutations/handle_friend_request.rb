# frozen_string_literal: true

module Mutations
  class HandleFriendRequest < Mutations::BaseMutation 
    argument :friend_request_id, ID, required: true
    argument :friend_request_action, Types::Enums::FriendRequestActionEnums, required: true

    field :errors, GraphQL::Types::JSON, null: true
    field :friend_request_id, ID, null: false

    def resolve(friend_request_id:, friend_request_action:)
      error_message = nil
      @friend_request = FriendRequest.find(friend_request_id)

      return { errors: 'Friend request not found' } if @friend_request.nil?

      case friend_request_action
      when 'accept'
        @friend_request.accept!
      when 'decline'
        @friend_request.decline!
      else
        { errors: 'Sorry, something went wrong while performing this action.' }
      end

      { errors: error_message, friend_request_id: }
    end
  end
end
