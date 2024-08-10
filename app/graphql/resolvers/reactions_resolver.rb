class Resolvers::ReactionsResolver < Resolvers::BaseResolver
  def resolve(post_id: nil)
    raise GraphQL::ExecutionError, 'No post ID provided' if post_id.blank?

    reactions = Reaction.for_post(post_id).includes(:profile)

    reactions.map do |reaction|
      {
        **reaction.to_react_params(current_user.id),
        user_display_name: reaction.profile.display_name,
      }
    end
  end
end
