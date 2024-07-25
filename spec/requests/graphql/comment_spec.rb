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
  mutation createComment($postId: ID!, $commenterId: ID!, $comment: String!, $commentId: ID) {
    createComment(postId: $postId, commenterId: $commenterId, comment: $comment, commentId: $commentId ) {
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
    let(:comment) { create(:comment, post: created_post, commenter: commenter) }
    subject(:result) { response.parsed_body['data']['createComment']['postComment'] }


    specify "Should create a new comment" do
      post '/graphql', params: { query: comment_mutation, variables: { postId: created_post.id,
                                                                       commenterId: commenter.id, 
                                                                       comment: "New Comment",
                                                                       commentId: nil } }
      
      expect(response).to be_successful
      expect(result['comment']).to eq("New Comment")
      expect(result['edited']).to eq(false)
    end

    specify "Should return an error if post is not found" do
      post "/graphql", params: { query: comment_mutation, variables: { postId: 999,
                                                                       commenterId: commenter.id, 
                                                                       comment: "Hello World",
                                                                       commentId: nil } }
      expect(response).to be_not_found
      expect(response.parsed_body).to eq('Not Found')
    end

    specify 'Should update a comment' do
      post '/graphql', params: { query: comment_mutation, variables: { postId: created_post.id,
                                                                        commenterId: commenter.id,  
                                                                        comment: "Edited Comment",
                                                                        commentId: comment.id } }

      expect(response).to be_successful
      expect(result['comment']).to eq("Edited Comment")
      expect(result['edited']).to eq(true)
    end
  end
end
