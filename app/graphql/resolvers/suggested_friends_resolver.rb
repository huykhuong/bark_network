class Resolvers::SuggestedFriendsResolver < Resolvers::BaseResolver
  def resolve
    excluding_ids = [context[:current_user].id]
    excluding_ids += FriendRequest.where(requester_id: context[:current_user].id).where(status: ['accepted', 'pending']).pluck(:receiver_id)

    suggested_friends = User.includes(:profile).where.not(id: excluding_ids)

    suggested_friends.map do |fr|
      {
        id: fr.id,
        profile: fr.profile.to_react_params
      }
    end
  end
end
