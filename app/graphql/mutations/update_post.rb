# frozen_string_literal: true

module Mutations
  class UpdatePost < Mutations::BaseMutation
    argument :post_id, ID, required: true
    argument :title, String, required: false
    argument :content, String, required: true

    field :post, Types::ObjectTypes::PostType, null: true

    def resolve(post_id:, title:, content:)
      @post = Post.find_by(id: post_id)

      if @post.nil?
        raise GraphQL::ExecutionError, "Post not found"
      end

      if @post.author != current_user
        raise GraphQL::ExecutionError, "You are not the author of this post"
      end

      if @post.update(title:, content:)
        { post: @post.to_react_params, errors: {} }
      else
        { post: nil, errors: @post.errors.to_hash.transform_values(&:first) }
      end
    end
  end
end
