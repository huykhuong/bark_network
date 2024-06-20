class Resolvers::UsersResolver < Resolvers::BaseResolver
  def resolve(search_query: nil)
    return nil if search_query.blank?

    results = User
              .joins(:profile)
              .includes(:profile)
              .where("profiles.display_name LIKE :search OR users.username LIKE :search", search: "%#{search_query}%")
              .limit(10)

    return [] if results.blank?

    results.map do |user|
      {
        id: user.id,
        username: user.username,
        profile: user.profile.to_react_params
      }
    end
  end
end
