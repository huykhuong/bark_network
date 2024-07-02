class Resolvers::PostsResolver < Resolvers::BaseResolver
  argument :author_id, ID, required: false

  def resolve(author_id: nil)
    if author_id
      Post
        .joins(:author)
        .where("users.id = ? AND users.locked = false", author_id)
        .order(created_at: :desc)
    else
      Post.user_not_locked(current_user.id)
    end
  end
end