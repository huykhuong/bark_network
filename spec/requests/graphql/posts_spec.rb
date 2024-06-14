require 'rails_helper'

post_fields_fragment = <<~GRAPHQL
  fragment PostFields on Post {
    id
    title
    content
    createdAt
    edited
    authorProfile {
      id
      displayName
      avatar
    }
    authorUsername
  }
GRAPHQL

RSpec.describe "Posts", type: :request do
  let(:user) { create(:user) }
  let(:user2) { create(:user, email: 'anotheruser@email.com', username: 'user2') }

  before do
    login(user)
  end

  context "createPost mutation" do
    let(:post_data) { response.parsed_body['data']['createPost']['post'] }

    specify "Should create a new post" do
      graphql_query = <<~GRAPHQL.squish
        mutation {
          createPost(title: "Test Title", content: "Test Content") {
            post {
              id
              title
              content
              createdAt
              edited
              authorProfile {
                id
                displayName
                avatar
              }
              authorUsername
            }
          }
        }
      GRAPHQL

      post '/graphql', params: { query: graphql_query }
      expect(response).to be_successful
      expect(post_data['authorProfile']['displayName']).to eq(user.profile.display_name)
      expect(post_data['title']).to eq("Test Title")
      expect(post_data['content']).to eq("Test Content")
      expect(post_data['edited']).to be false
      expect(post_data['createdAt']).to be_present
      expect(Post.count).to eq(1)
    end
  end


  context "getPost query" do
    let(:created_post) { create(:post, author: user) }

    let(:first_post) { response.parsed_body['data']['posts']['nodes'].first }
    let(:post_page) { response.parsed_body['data']['posts'] }

    specify "Should return a post" do
      created_post # This line will eagerly create the new post.

      graphql_query = <<~GRAPHQL.squish
        query getPosts {
          posts(page: 1, perPage: 11) {
            nodes {
              id
              title
              content
              createdAt
              edited
              authorProfile {
                id
                displayName
                avatar
              }
              authorUsername
            }
            hasPreviousPage
            hasNextPage
            pagesCount
            nodesCount
          }
        }
      GRAPHQL

      post '/graphql', params: { query: graphql_query }

      expect(response).to be_successful
      expect(post_page['nodesCount']).to eq(1)
      expect(post_page['pagesCount']).to eq(1)
      expect(post_page['hasPreviousPage']).to be false
      expect(post_page['hasNextPage']).to be false

      expect(first_post['authorProfile']['displayName']).to eq(user.profile.display_name)
      expect(first_post['title']).to eq(created_post.title)
      expect(first_post['content']).to eq(created_post.content)
      expect(first_post['edited']).to be false
      expect(first_post['createdAt']).to eq(convert_to_graphql_time(created_post.created_at))
    end
    
    context "Get posts with user id" do
      let(:new_post) { create(:post, author: user2) }

      specify do
        new_post

        new_graphql_query = <<~GRAPHQL.squish
          #{post_fields_fragment}

          query getPosts {
            posts(page: 1, perPage: 11, authorId: #{user2.id}) {
              nodes {
                ...PostFields
              }
              hasPreviousPage
              hasNextPage
              pagesCount
              nodesCount
            }
          }
        GRAPHQL
  
        post '/graphql', params: { query: new_graphql_query }
  
        expect(response).to be_successful
        expect(post_page['nodesCount']).to eq(1)
        expect(post_page['pagesCount']).to eq(1)
        expect(post_page['hasPreviousPage']).to be false
        expect(post_page['hasNextPage']).to be false

        expect(first_post['authorUsername']).to eq(user2.username)
      end
    end
  end
end
