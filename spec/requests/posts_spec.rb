require 'rails_helper'

RSpec.describe "Posts", type: :request do
  let(:user) { create(:user) }

  before do
    login(user)
  end

  context "createPost mutation" do
    let(:post_data) { response.parsed_body['data']['createPost']['post'] }

    specify "Should create a new post" do
      graphql_query = <<~GRAPHQL
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
end
