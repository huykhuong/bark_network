class Resolvers::PostsResolver < Resolvers::BaseResolver
  argument :author_id, ID, required: false

  def resolve(author_id: nil)
    if author_id
      if current_user.id.to_s == author_id
        Post.where(author_id: author_id).order(created_at: :desc)
      else
        Post
          .joins(:author)
          .where("users.id = ? AND users.locked = false", author_id)  
          .order(created_at: :desc)
      end
    else
      Post.user_not_locked(current_user.id)
    end
  end
end