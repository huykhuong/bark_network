require 'rails_helper'

RSpec.describe "FriendRequests", type: :request do
  subject(:receiver) { create(:user, username: 'huyk', email: 'huyk@email.com') }
  let(:user) { create(:user) }
  let(:graphql_query) do
    ->(receiver_id) do
      <<~GRAPHQL.squish
        mutation {
          createFriendRequest(receiverProfileId: #{receiver_id}) {
            errors
          }
        }
      GRAPHQL
    end
  end
  
  before do |test|
    login(user)
    create(:friend_request, requester: user, receiver: receiver) if test.metadata[:create_existing_friend_request]
  end

  describe "createFriendRequest mutation" do
    subject(:friend_request_data) { response.parsed_body['data']['createFriendRequest'] }

    context 'Successful request' do
      specify do
        post '/graphql', params: { query: graphql_query.call(receiver.profile.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to be_nil
        expect(FriendRequest.count).to eq(1)
      end
    end

    context 'Unsuccessful request' do
      specify 'Friend request sent to self' do
        post '/graphql', params: { query: graphql_query.call(user.profile.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq('You cannot send a friend request to yourself')
        expect(FriendRequest.count).to eq(0)
      end

      specify 'Friend request has already existed', :create_existing_friend_request do
        post '/graphql', params: { query: graphql_query.call(receiver.profile.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq('You have already sent a friend request to this user')
        expect(FriendRequest.count).to eq(1) 
      end

      specify 'Friend request is invalid' do
        post '/graphql', params: { query: graphql_query.call("string") }
        expect(response).to be_successful
        expect(FriendRequest.count).to eq(0) 
      end

      # specify 'Friend request is invalid' do
      #   post '/graphql', params: { query: graphql_query.call(9999) }
      #   expect(response).to be_successful
      #   expect(friend_request_data['errors']).to eq('No user found with the provided ID')
      #   expect(FriendRequest.count).to eq(0) 
      # end
    end
  end
end