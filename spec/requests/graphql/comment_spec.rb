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
  mutation createComment($postId: ID!, $commenterId: ID!, $comment: String!) {
    createComment(postId: $postId, commenterId: $commenterId, comment: $comment) {
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
  let(:created_post) { create(:post) }
  let(:commenter) { create(:user) }

  subject(:result) { response.parsed_body['data']['postComments']['comments'] }

  describe "Comment query" do 
    specify "Should return a list of comments for a post" do
      create(:comment, post: created_post, commenter: commenter)

      post '/graphql', params: { query: comment_query, variables: { postId: created_post.id } }
      
      expect(response).to be_successful
      expect(result.count).to eq(1)
      expect(result[0]['comment']).to eq("Hello World")
      expect(result[0]['edited']).to eq(false)
      expect(result[0]['commenterDisplayName']).to eq("strawberrycookie")
    end

    specify "Should return an error if post is not found" do
      post "/graphql", params: { query: comment_query, variables: { postId: 999 } }
      expect(response).to be_successful
      expect(response.parsed_body['errors'][0]['message']).to eq("Post not found")
    end
  end

  describe "Comment mutation" do 
    subject(:result) { response.parsed_body['data']['createComment']['postComment'] }

    specify "Should create a new comment" do
      post '/graphql', params: { query: comment_mutation, variables: { postId: created_post.id,
                                                                       commenterId: commenter.id, 
                                                                       comment: "New Comment" } }
      
      expect(response).to be_successful
      expect(result['comment']).to eq("New Comment")
      expect(result['edited']).to eq(false)
    end

    specify "Should return an error if post is not found" do
      post "/graphql", params: { query: comment_mutation, variables: { postId: 999,
                                                                       commenterId: commenter.id, 
                                                                       comment: "Hello World" } }
      expect(response).to be_successful
      expect(response.parsed_body['errors'][0]['message']).to eq("Post not found")
    end
  end
end
