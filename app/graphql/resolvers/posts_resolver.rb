class Resolvers::PostsResolver < Resolvers::BaseResolver
  def resolve
    Post.order(created_at: :desc).map(&:to_react_params)
  end
end