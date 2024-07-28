# frozen_string_literal: true

module Mutations
  class DeleteComment < Mutations::BaseMutation
    argument :comment_id, ID, required: true

    field :success, Boolean, null: false

    def resolve(comment_id:)
      Comment.for_user(current_user.id).find(comment_id).destroy!

      { success: true }
    end
  end
end
