class Resolvers::PostCommentsResolver < Resolvers::BaseResolver
  argument :post_id, ID, required: true

  def resolve(post_id: nil)
    post = Post.find_by(id: post_id)

    if post.present?
      comments_with_preloaded_data = post.comments.includes(commenter: :profile)

      comments_with_preloaded_data.map do |comment|
        {
          **comment.to_react_params,
          commenter_avatar_url: comment.commenter.profile.avatar_url,
          commenter_display_name: comment.commenter.profile.display_name
        }
      end
    else
      raise GraphQL::ExecutionError, 'Post not found'
    end
  end
end