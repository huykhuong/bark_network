class Resolvers::PostCommentsResolver < Resolvers::BaseResolver
  argument :post_id, ID, required: true
  argument :offset, Integer, required: false, default_value: 0 

  def resolve(post_id: nil, offset: nil)
    post = Post.find_by(id: post_id)

    if post.present?
      total_count = post.comments.count
      
      comments_with_preloaded_data = post
                                        .comments
                                        .order(created_at: :desc)
                                        .limit(5)
                                        .offset(offset)
                                        .includes(commenter: :profile)

      comment_data = comments_with_preloaded_data.map do |comment|
        {
          **comment.to_react_params,
          commenter_avatar_url: comment.commenter.profile.avatar_url,
          commenter_display_name: comment.commenter.profile.display_name,
          editable: comment.editable?(current_user)
        }

      end
      
      has_more_comments = offset + 5 < total_count

      { comments: comment_data, has_more_comments:, total_count: }
    else
      raise GraphQL::ExecutionError, 'Post not found'
    end
  end
end