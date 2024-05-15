# frozen_string_literal: true

require_relative '../graphql_helpers'

module Types
  class QueryType < Types::BaseObject
    include GraphqlHelpers

    field :posts, [Types::ObjectTypes::PostType], null: false
    field :profiles, [Types::ObjectTypes::UserProfileType], null: false

    def posts
      Post.order(created_at: :desc).map(&:to_react_params)
    end

    def profiles
      Profile.not_self(current_user).map { |profile| profile.to_react_params.slice(:id, :avatar, :bio, :display_name) }
    end
  end
end
