class Resolvers::PostsResolver < Resolvers::BaseResolver
  argument :author_id, ID, required: false

  def resolve(author_id: nil)
    if author_id
      Post.where(author_id:).order(created_at: :desc)
    else
      Post.order(created_at: :desc)
    end
  end
end