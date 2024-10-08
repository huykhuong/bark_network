# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_comment, mutation: Mutations::CreateComment
    field :delete_comment, mutation: Mutations::DeleteComment
    field :create_friend_request, mutation: Mutations::CreateFriendRequest
    field :create_post, mutation: Mutations::CreatePost
    field :handle_friend_request, mutation: Mutations::HandleFriendRequest
    field :lock_account, mutation: Mutations::ToggleLockAccount
    field :remove_friend, mutation: Mutations::RemoveFriend
    field :update_post, mutation: Mutations::UpdatePost
    field :add_reaction, mutation: Mutations::AddReaction
    field :remove_reaction, mutation: Mutations::RemoveReaction
  end
end
