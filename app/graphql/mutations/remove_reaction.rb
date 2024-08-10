# frozen_string_literal: true

module Mutations
  class RemoveReaction < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :post_id, ID, required: true
    argument :user_id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:, post_id:, user_id:)
      reaction = Reaction.for_user_post(user_id, post_id).find(id)

      if reaction.destroy!
        { success: true }
      else
        { success: false }
      end
    end      
  end
end

