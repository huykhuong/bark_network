# frozen_string_literal: true

module Mutations
  class RemoveFriend < Mutations::BaseMutation 
    argument :friend_request_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def resolve(friend_request_id:)      
      friendship = FriendRequest.find_by(id: friend_request_id)

      return { errors: 'Friendship not found.' } if friendship.nil?

      friendship.update_columns(status: 'declined')

      { errors: nil }
    end
  end
end
