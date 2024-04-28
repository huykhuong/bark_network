# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :posts, [Types::ObjectTypes::PostType], null: false

    def posts
      Post.all.map { |p| p.to_react_params }
    end
  end
end
