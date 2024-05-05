# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :posts, [Types::ObjectTypes::PostType], null: false

    def posts
      Post.order(created_at: :desc).map { |p| p.to_react_params.merge(current_user_is_post_author?(p)) }
    end

    def current_user_is_post_author?(post)
      {
        is_author: post.author == context[:current_user]
      }
    end
  end
end
