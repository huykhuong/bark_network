class Resolvers::PostsResolver < Resolvers::BaseResolver
  def resolve
    Post.order(created_at: :desc)
  end
end