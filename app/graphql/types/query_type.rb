# frozen_string_literal: true
require_relative '../graphql_helpers'
module Types
  class QueryType < Types::BaseObject
    include GraphqlHelpers

    field :posts, [Types::ObjectTypes::PostType], null: false

    def posts
      Post.order(created_at: :desc).map { |p| p.to_react_params.merge(current_user_is_post_author?(p, current_user)) }
    end
  end
end
