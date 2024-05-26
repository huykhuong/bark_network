# frozen_string_literal: true

require_relative '../graphql_helpers'

module Types
  class QueryType < Types::BaseObject
    include GraphqlHelpers

    field :posts, [Types::ObjectTypes::PostType], null: false, resolver: Resolvers::PostsResolver
    field :suggested_friends, [Types::ObjectTypes::UserType], null: false, resolver: Resolvers::SuggestedFriendsResolver
    field :sent_friend_requests, [Types::ObjectTypes::FriendRequestType], null: false, resolver: Resolvers::SentFriendRequestsResolver
    field :received_friend_requests, [Types::ObjectTypes::FriendRequestType], null: false, resolver: Resolvers::ReceivedFriendRequestsResolver
  end
end
