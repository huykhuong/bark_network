class Resolvers::ReceivedFriendRequestsResolver < Resolvers::BaseResolver
  extras [:lookahead]

  def resolve(lookahead:)
    scope = FriendRequest.where(receiver_id: current_user.id, status: 'pending')

    scope = scope.includes(requester: :profile) if lookahead.selects?(:user_profile)    

    scope.map do |fr|
      result = { id: fr.id }
      result[:user_profile] = fr.requester.profile.to_react_params if lookahead.selects?(:user_profile)
      result
    end
  end
end
