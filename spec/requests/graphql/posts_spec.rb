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

graphql_query = <<~GRAPHQL.squish
  #{post_fields_fragment}

  query getPosts($authorId: ID) {
    posts(page: 1, perPage: 11, authorId: $authorId) {
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

RSpec.describe "Posts", type: :request do
  let(:user) { create(:user) }
  let(:user2) { create(:user, email: 'anotheruser@email.com', username: 'user2') }

  before do
    login(user)
  end

  context "createPost mutation" do
    let(:post_data) { response.parsed_body['data']['createPost']['post'] }

    specify "Should create a new post" do
      mutation_graphql_query = <<~GRAPHQL.squish
        #{post_fields_fragment}

        mutation {
          createPost(title: "Test Title", content: "Test Content") {
            post {
              ...PostFields
            }
          }
        }
      GRAPHQL

      post '/graphql', params: { query: mutation_graphql_query }
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

    specify "Should return all posts" do
      created_post # This line will eagerly create the new post.
      create(:post, author: user2)

      post '/graphql', params: { query: graphql_query }

      expect(response).to be_successful
      expect(post_page['nodesCount']).to eq(2)
      expect(post_page['pagesCount']).to eq(1)
      expect(post_page['hasPreviousPage']).to be false
      expect(post_page['hasNextPage']).to be false

      expect(first_post['authorProfile']['displayName']).to eq(user.profile.display_name)
      expect(first_post['title']).to eq(created_post.title)
      expect(first_post['content']).to eq(created_post.content)
      expect(first_post['edited']).to be false
      expect(first_post['createdAt']).to eq(convert_to_graphql_time(created_post.created_at))
    end

    specify "Should return posts from not locked users" do
      created_post # This line will eagerly create the new post.
      user2.update(locked: true)
      create(:post, author: user2)

      post '/graphql', params: { query: graphql_query }

      expect(response).to be_successful
      expect(post_page['nodesCount']).to eq(1)
    end

    context "Return posts for locked user" do
      specify "Should return posts for current user even when locked" do
        created_post # This line will eagerly create the new post.
        user.update(locked: true)
  
        post '/graphql', params: { query: graphql_query }
  
        expect(response).to be_successful
        expect(post_page['nodesCount']).to eq(1)
      end

      specify "Should not return any posts for other locked users" do
        user2.update(locked: true)
        create(:post, author: user2)
  
        post '/graphql', params: { query: graphql_query }
  
        expect(response).to be_successful
        expect(post_page['nodesCount']).to eq(0)
      end
    end
    
    context "Get posts with user id" do
      let(:new_post) { create(:post, author: user2) }

      specify do
        new_post
  
        post '/graphql', params: { query: graphql_query, variables: { authorId: user2.id } }.to_json,
                         headers: { 'Content-Type' => 'application/json' }
  
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
