class Resolvers::ReceivedFriendRequestsResolver < Resolvers::BaseResolver
  def resolve
    requests = FriendRequest.includes(requester: :profile).where(receiver_id: context[:current_user].id, status: 'pending')

    requests.map do |fr|
      {
        id: fr.id,
        user_profile: fr.requester.profile.to_react_params
      }
    end
  end
end
