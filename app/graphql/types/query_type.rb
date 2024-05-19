# frozen_string_literal: true

require_relative '../graphql_helpers'

module Types
  class QueryType < Types::BaseObject
    include GraphqlHelpers

    field :posts, [Types::ObjectTypes::PostType], null: false
    field :suggested_friends, [Types::ObjectTypes::UserType], null: false

    def posts
      Post.order(created_at: :desc).map(&:to_react_params)
    end

    def suggested_friends
      User.suggested_friend_profiles(current_user).includes(:profile).map { |user| { id: user.id, profile: user.profile.to_react_params } }
    end
  end
end
