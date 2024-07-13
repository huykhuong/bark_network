# frozen_string_literal: true

module Mutations
  class CreateComment < Mutations::BaseMutation
    argument :comment, String, required: true
    argument :post_id, ID, required: true
    argument :commenter_id, ID, required: true

    field :post_comment, Types::ObjectTypes::PostCommentType, null: true
    field :errors, [String], null: true

    def resolve(comment:, commenter_id:, post_id:)
      if Comment.create
        
      else
      end
    end
  end
end