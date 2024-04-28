# frozen_string_literal: true

module Mutations
  class CreatePost < Mutations::BaseMutation
    argument :title, String, required: false
    argument :content, String, required: true

    field :post, Types::ObjectTypes::PostType, null: true
    field :errors, GraphQL::Types::JSON, null: true

    def resolve(title:, content:)
      @post = current_user.posts.build(title:, content:)

      if @post.save
        { post: @post.to_react_params, errors: {} }
      else
        { post: nil, errors: @post.errors.to_hash.transform_values(&:first) }
      end
    end
  end
end
