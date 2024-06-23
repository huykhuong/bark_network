class Resolvers::SuggestedFriendsResolver < Resolvers::BaseResolver
  def resolve
    excluding_ids = FriendRequest
                      .where(requester_id: current_user.id, status: ['accepted', 'pending'])
                      .or(FriendRequest.where(receiver_id: current_user.id, status: ['accepted', 'pending']))
                      .pluck(:receiver_id, :requester_id).flatten.uniq
                      
    excluding_ids << current_user.id

    suggested_friends = User.includes(:profile).where.not(id: excluding_ids).limit(3)

    suggested_friends.map do |fr|
      {
        id: fr.id,
        profile: fr.profile.to_react_params
      }
    end
  end
end
