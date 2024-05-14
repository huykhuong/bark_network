# frozen_string_literal: true

module Mutations
  class CreateFriendRequest < Mutations::BaseMutation 
    argument :receiver_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def params
      { receiver_id:, request_id: current_user.id }
    end

    def resolve(receiver_id:)
      @friend_request = FriendRequest.find_by(**params) || FriendRequest.new(**params)

      if @friend_request.persisted?
        @friend_request.resend!
      elsif @friend_request.save
        { errors: nil }
      else
        { errors: @friend_request.errors.to_hash.transform_values(&:first) }
      end
    end
  end
end
