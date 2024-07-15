# frozen_string_literal: true

module Mutations
  class CreateComment < Mutations::BaseMutation
    argument :comment, String, required: true
    argument :post_id, ID, required: true
    argument :commenter_id, ID, required: true

    field :post_comment, Types::ObjectTypes::PostCommentType, null: true
    field :errors, [String], null: true

    def resolve(comment:, commenter_id:, post_id:)
      set_post(post_id)

      new_comment = @post.comments.build(comment: comment, commenter_id: commenter_id)

      if new_comment.save        
        { post_comment: new_comment.to_react_params, errors: nil }
      else
        { post_comment: nil, errors: new_comment.errors.full_messages }
      end
    end

    private

    def set_post(post_id)
      @post = Post.find_by(id: post_id)

      raise GraphQL::ExecutionError, 'Post not found' if @post.nil?
    end
  end
end