# frozen_string_literal: true
module Types
  class QueryType < Types::BaseObject
    paginated_field :posts, Types::ObjectTypes::PostType, null: false, resolver: Resolvers::PostsResolver
    field :post_comments, Types::ObjectTypes::PostCommentPayloadType, null: false, resolver: Resolvers::PostCommentsResolver
    field :suggested_friends, [Types::ObjectTypes::UserType], null: false, resolver: Resolvers::SuggestedFriendsResolver
    field :sent_friend_requests, [Types::ObjectTypes::FriendRequestType], null: false, resolver: Resolvers::SentFriendRequestsResolver
    field :received_friend_requests, [Types::ObjectTypes::FriendRequestType], null: false, resolver: Resolvers::ReceivedFriendRequestsResolver
    field :users, [Types::ObjectTypes::UserType], null: true, resolver: Resolvers::UsersResolver, description: 'Returns a list of users' do
      argument :search_query, String, required: false
    end
    field :reactions, [Types::ObjectTypes::ReactionType], null: false, resolver: Resolvers::ReactionsResolver, description: 'Returns a list of reactions for a post' do
      argument :post_id, ID, required: true
    end
  end
end
