require 'rails_helper'

RSpec.describe "Users", type: :request do
  graphql_query = Proc.new do |search_query|
      <<~GRAPHQL.squish
      query getUsers {
        users(searchQuery: "#{search_query}") {
          id
          username
          profile {
            id
            displayName
          }
        }
      }
    GRAPHQL
  end

  before do
    login(user)
  end

  context "Users query" do
    let(:user) do
      user = create(:user)
      user.profile.update(display_name: 'Huy')
      user
    end
  
    let!(:user2) do
      user = create(:user, email: 'anotheruser@email.com', username: 'huybark')
      user
    end

    specify "Should return a list of users" do
      post '/graphql', params: { query: graphql_query.call("huy") }
      expect(response).to be_successful
      users = response.parsed_body['data']['users']
      expect(users.count).to eq(2)
      expect(users[0]['username']).to eq(user.username)
      expect(users[1]['username']).to eq(user2.username)
      expect(users[0]['profile']['displayName']).to eq('strawberrycookie')
      expect(users[1]['profile']['displayName']).to eq('strawberrycookie')
    end

    specify "Should return nil when no search query is provided" do
      post '/graphql', params: { query: graphql_query.call }
      expect(response).to be_successful
      users = response.parsed_body['data']['users']
      expect(users).to eq(nil)
    end
  end
end
