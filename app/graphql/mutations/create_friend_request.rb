# frozen_string_literal: true

module Mutations
  class CreateFriendRequest < Mutations::BaseMutation
    class NoUserFoundError < StandardError; end

    argument :receiver_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def resolve(receiver_id:)
      begin
        find_user(receiver_id)

        params = { receiver_id: @receiver_id, requester_id: current_user.id }

        @friend_request = FriendRequest.find_by(**params) || FriendRequest.new(**params)

        if @friend_request.persisted? && @friend_request.declined?
          @friend_request.resend!
          return { errors: nil }
        end

        if @friend_request.save
          return { errors: nil }
        else
        { errors: @friend_request.errors.full_messages.first }
      end
      rescue => e
        { errors: e.message }
      end
    end

    private

    def find_user(receiver_id)
      found_user = User.find_by(id: receiver_id)

      raise NoUserFoundError.new 'No user found with the provided ID' if found_user.nil?

      @receiver_id = found_user.id
    end
  end
end
