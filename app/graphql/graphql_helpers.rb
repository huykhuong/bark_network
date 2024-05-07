module GraphqlHelpers
  def current_user_is_post_author?(post, current_user)
    {
      is_author: post.author == current_user
    }
  end
end