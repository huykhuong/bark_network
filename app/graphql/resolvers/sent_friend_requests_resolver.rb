class Resolvers::SentFriendRequestsResolver < Resolvers::BaseResolver
  def resolve
    friend_requests = FriendRequest.includes(receiver: :profile).where(requester_id: context[:current_user].id, status: 'pending')
    friend_requests.map do |fr|
      {
        id: fr.id,
        receiver_profile: fr.receiver.profile.to_react_params
      }
    end
  end
end