# frozen_string_literal: true

module Mutations
  class CreateComment < Mutations::BaseMutation
    argument :comment, String, required: true
    argument :post_id, ID, required: true
    argument :comment_id, ID, required: false

    field :post_comment, Types::ObjectTypes::PostCommentType, null: true
    field :errors, [String], null: true

    def resolve(comment_id:, comment:, post_id:)
      post = Post.find(post_id)

      if comment_id.nil?
        post_comment = post.comments.find_or_create_by!(comment: comment, commenter_id: current_user.id)
      else
        post_comment = Comment.for_user(current_user.id).find(comment_id.to_i)
        post_comment.update(comment:, edited: true)
      end

      { post_comment:, errors: post_comment.errors.full_messages }
    end
  end
end
