require 'rails_helper'

comment_query = <<~GRAPHQL.squish
  query getPostComments($postId: ID!) {
    postComments(postId: $postId, offset: 0) {
      comments {
        id
        comment
        edited
        createdAt
        commenterAvatarUrl
        commenterDisplayName
      }
      hasMoreComments
    }
  }
GRAPHQL

comment_mutation = <<~GRAPHQL
  mutation createComment($postId: ID!, $comment: String!, $commentId: ID) {
    createComment(postId: $postId, comment: $comment, commentId: $commentId ) {
      errors
      postComment {
        id
        comment
        edited
        createdAt
      }
    }
  }
GRAPHQL

RSpec.describe "Comments", type: :request do
  let(:commenter) { create(:user) }
  let(:created_post) { create(:post, author: commenter) }

  before do
    login commenter
  end

  subject(:result) { response.parsed_body }

  describe "Comment query" do
    specify "Should return a list of comments for a post" do
      create(:comment, post: created_post, commenter: commenter)

      post '/graphql', params: { query: comment_query, variables: { postId: created_post.id } }
      
      expect(response).to be_successful
      expect(result.count).to eq(1)
      expect(result['data']['postComments']['comments'][0]['comment']).to eq("Hello World")
      expect(result['data']['postComments']['comments'][0]['edited']).to eq(false)
      expect(result['data']['postComments']['comments'][0]['commenterDisplayName']).to eq("strawberrycookie")
    end

    specify "Should return an error if post is not found" do
      post "/graphql", params: { query: comment_query, variables: { postId: 999 } }
      expect(response).to be_successful
      expect(response.parsed_body['errors'][0]['message']).to eq("Post not found")
    end
  end

  describe "Comment mutation" do
    let(:comment) { create(:comment, post: created_post, commenter: commenter) }

    specify "Should create a new comment" do
      post '/graphql', params: { query: comment_mutation, variables: { postId: created_post.id,
                                                                       comment: "New Comment",
                                                                       commentId: nil } }
      
      expect(response).to be_successful
      expect(result['data']['createComment']['postComment']['comment']).to eq("New Comment")
      expect(result['data']['createComment']['postComment']['edited']).to eq(false)
    end

    specify "Should return an error if post is not found" do
      post "/graphql", params: { query: comment_mutation, variables: { postId: 999,
                                                                       comment: "Hello World",
                                                                       commentId: nil } }
      expect(response).to be_not_found
      expect(response.parsed_body).to eq('Not Found')
    end

    specify 'Should update a comment' do
      post '/graphql', params: { query: comment_mutation, variables: { postId: created_post.id,
                                                                        comment: "Edited Comment",
                                                                        commentId: comment.id } }

      expect(response).to be_successful
      expect(result['data']['createComment']['postComment']['comment']).to eq("Edited Comment")
      expect(result['data']['createComment']['postComment']['edited']).to eq(true)
    end

    specify 'Should not allow a user to edit another user\'s comment' do
      other_user = create(:user)
      other_comment = create(:comment, post: created_post, commenter: other_user)

      post '/graphql', params: { query: comment_mutation, variables: { postId: created_post.id,
                                                                        comment: "Edited Comment",
                                                                        commentId: other_comment.id } }

      expect(response).to be_not_found
      expect(response.parsed_body).to eq('Not Found')
    end
  end

  describe "Comment deletion" do
    let(:another_user) { create(:user) }
    let(:comment) { create(:comment, post: created_post, commenter: commenter) }
    let(:delete_comment_mutation) do
      <<~GRAPHQL
        mutation deleteComment($commentId: ID!) {
          deleteComment(commentId: $commentId) {
            success
          }
        }
      GRAPHQL
    end

    specify "Should delete a comment" do
      post '/graphql', params: { query: delete_comment_mutation, variables: { commentId: comment.id } }

      expect(response).to be_successful
      expect(result['data']['deleteComment']['success']).to eq(true)
    end

    specify "Should return an error if comment is not found" do
      post '/graphql', params: { query: delete_comment_mutation, variables: { commentId: 999 } }

      expect(response).to be_not_found
      expect(result).to eq('Not Found')
    end

    specify "Should not allow a user to delete another user's comment" do
      login another_user

      post '/graphql', params: { query: delete_comment_mutation, variables: { commentId: comment.id } }

      expect(response).to be_not_found
      expect(result).to eq('Not Found')
    end

    specify "Should be error when no comment Id is provided" do
      post '/graphql', params: { query: delete_comment_mutation, variables: { commentId: nil } }

      expect(response).to be_successful
      expect(result['errors']).to_not be_empty
    end
  end
end
