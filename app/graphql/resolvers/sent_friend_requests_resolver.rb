class Resolvers::SentFriendRequestsResolver < Resolvers::BaseResolver
  extras [:lookahead]

  def resolve(lookahead:)
    scope = FriendRequest.where(requester_id: current_user.id, status: 'pending')

    scope = scope.includes(receiver: :profile) if lookahead.selects?(:user_profile)

    scope.map do |fr|
      result = { id: fr.id }
      result[:user_profile] = fr.receiver.profile if lookahead.selects?(:user_profile)
      result
    end
  end
end
