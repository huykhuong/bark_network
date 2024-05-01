require 'rails_helper'

RSpec.describe "Posts", type: :request do
  let(:user) { create(:user) }

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
              authorName
              title
              content
              edited
              createdAt
            }
          }
        }
      GRAPHQL

      post '/graphql', params: { query: graphql_query }
      expect(response).to be_successful
      expect(post_data['authorName']).to eq(user.profile.display_name)
      expect(post_data['title']).to eq("Test Title")
      expect(post_data['content']).to eq("Test Content")
      expect(post_data['edited']).to be false
      expect(post_data['createdAt']).to be_present
      expect(Post.count).to eq(1)
    end
  end


  context "getPost query" do
    let!(:created_post) { create(:post, author: user) }
    let(:posts) { response.parsed_body['data']['posts'].first }

    specify "Should return a post" do
      graphql_query = <<~GRAPHQL.squish
        query {
          posts {
            authorName
            title
            content
            edited
            createdAt
          }
        }
      GRAPHQL

      post '/graphql', params: { query: graphql_query }

      expect(response).to be_successful
      expect(response.parsed_body['data']['posts'].count).to eq(1)
      expect(posts['authorName']).to eq(user.profile.display_name)
      expect(posts['title']).to eq(created_post.title)
      expect(posts['content']).to eq(created_post.content)
      expect(posts['edited']).to be false
      expect(posts['createdAt']).to eq(convert_to_graphql_time(created_post.created_at))
    end
  end
end
