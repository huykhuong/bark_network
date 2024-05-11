# frozen_string_literal: true

require_relative '../graphql_helpers'

module Types
  class QueryType < Types::BaseObject
    include GraphqlHelpers

    field :posts, [Types::ObjectTypes::PostType], null: false

    def posts
      Post.order(created_at: :desc).map(&:to_react_params)
    end
  end
end
