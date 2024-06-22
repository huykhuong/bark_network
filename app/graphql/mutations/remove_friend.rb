# frozen_string_literal: true

module Mutations
  class RemoveFriend < Mutations::BaseMutation 
    argument :friendship_id, ID, required: true

    field :errors, GraphQL::Types::JSON, null: true

    def resolve(friendship_id:)      
      friendship = Friendship.find_by(id: friendship_id)

      return { errors: 'Friendship not found.' } if friendship.nil?

      friendship.destroy

      { errors: nil }
    end
  end
end
