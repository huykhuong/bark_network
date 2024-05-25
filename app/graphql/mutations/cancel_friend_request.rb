# frozen_string_literal: true

module Mutations
  class CancelFriendRequest < Mutations::BaseMutation 
    argument :friend_request_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def resolve(friend_request_id:)
      error_message = nil

      @friend_request = FriendRequest.find(friend_request_id)

      if @friend_request.persisted? && !@friend_request.declined?
        @friend_request.decline!
      else
        { errors: 'An error happens' }
      end

      { errors: error_message }
    end
  end
end
