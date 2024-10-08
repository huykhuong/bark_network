require 'rails_helper'

RSpec.describe "FriendRequests", type: :request do
  subject(:receiver) { create(:user, username: 'huyk', email: 'huyk@email.com') }
  let(:user) { create(:user) }
  
  before do
    login(user)
  end

  describe "createFriendRequest mutation" do
    let(:graphql_query) do
      Proc.new do |receiver_id|
        <<~GRAPHQL.squish
          mutation {
            createFriendRequest(receiverId: #{receiver_id}) {
              errors
            }
          }
        GRAPHQL
      end
    end

    subject(:friend_request_data) { response.parsed_body['data']['createFriendRequest'] }

    context 'Successful request' do
      specify do
        post '/graphql', params: { query: graphql_query.call(receiver.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to be_nil
        expect(FriendRequest.count).to eq(1)
      end
    end

    context 'Unsuccessful request' do
      specify 'Friend request sent to self' do
        post '/graphql', params: { query: graphql_query.call(user.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq("You can't send a friend request to yourself.")
        expect(FriendRequest.count).to eq(0)
      end

      specify 'Friend request has already existed' do
        create(:friend_request, requester: user, receiver: receiver)
        post '/graphql', params: { query: graphql_query.call(receiver.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq('You have already sent a friend request to this user.')
        expect(FriendRequest.count).to eq(1) 
      end

      specify 'Friend request is invalid' do
        post '/graphql', params: { query: graphql_query.call("string") }
        expect(response).to be_successful
        expect(FriendRequest.count).to eq(0) 
      end

      specify 'Invalid user in friend request' do
        post '/graphql', params: { query: graphql_query.call(9999) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq('No user found with the provided ID')
        expect(FriendRequest.count).to eq(0)
      end

      specify 'Friend request is accepted' do
        create(:friend_request, :accepted, requester: user, receiver: receiver)
        post '/graphql', params: { query: graphql_query.call(receiver.id) }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq('You have already accepted this friend request. Unfollow the user to remove them from your friends list.')
        expect(FriendRequest.count).to eq(1)
      end
    end
  end

  describe "Update an existing friend request" do
    let!(:friend_request) { create(:friend_request, requester: user, receiver: receiver) }
    let(:graphql_mutation) do
      Proc.new do |id, action|
        <<~GRAPHQL.squish
          mutation {
            handleFriendRequest(friendRequestId: #{id}, friendRequestAction: #{action}) {
              errors
              friendRequestId
            }
          }
        GRAPHQL
      end
    end

    subject(:friend_request_data) { response.parsed_body['data']['handleFriendRequest'] }

    context 'Successful request' do
      specify 'Accept friend request' do
        post '/graphql', params: { query: graphql_mutation.call(friend_request.id, "accept") }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to be_nil
        expect(friend_request.reload.status).to eq('accepted')
      end

      specify 'Decline friend request' do
        post '/graphql', params: { query: graphql_mutation.call(friend_request.id, "decline") }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to be_nil
        expect(friend_request.reload.status).to eq('declined')
      end
    end

    context 'Unsuccessful request' do
      specify 'Unknown friend request id' do
        post '/graphql', params: { query: graphql_mutation.call(1, "decline") }
        expect(response).to be_successful
        expect(friend_request_data['errors']).to eq('Friend request not found.')
      end

      specify 'Unknown action' do
        post '/graphql', params: { query: graphql_mutation.call(friend_request.id, "unknown") }
        expect(response).to be_successful
        expect(response.parsed_body['errors'][0]['message']).to eq("Argument 'friendRequestAction' on Field 'handleFriendRequest' has an invalid value (unknown). Expected type 'FriendRequestActionEnums!'.")
      end
    end
  end
end
