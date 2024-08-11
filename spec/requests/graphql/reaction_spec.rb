require 'rails_helper'

RSpec.describe Reaction, type: :request do
  subject(:json) { response.parsed_body }
  let(:user) { create(:user) }
  let(:bark_post) { create(:post) }

  before do
    login(user)
  end

  describe 'addReaction mutation' do
    let(:graphql_query) do
      <<~GRAPHQL
        mutation addReaction($postId: ID!, $name: String!, $update: Boolean!) {
          addReaction(postId: $postId, name: $name, update: $update) {
            reaction {
              id
              name
              userDisplayName
            }
            errors
          }
        }
      GRAPHQL
    end

    context 'Successful request' do
      specify 'a user adds a new reaction for a post' do
        post '/graphql', params: { query: graphql_query, variables: variables(postId: bark_post.id, name: 'like', update: false) }
  
        expect(response).to be_successful
        expect(json['data']['addReaction']['reaction']['name']).to eq('like')
        expect(json['data']['addReaction']['reaction']['userDisplayName']).to eq(user.display_name)
        expect(Reaction.count).to eq(1)
      end

      specify 'a user updates an existing reaction for a post' do
        create(:reaction, post: bark_post, user: user, name: 'like')
        post '/graphql', params: { query: graphql_query, variables: variables(postId: bark_post.id, name: 'like', update: true) }
  
        expect(response).to be_successful
        expect(json['data']['addReaction']['reaction']['name']).to eq('like')
        expect(json['data']['addReaction']['reaction']['userDisplayName']).to eq(user.display_name)
        expect(Reaction.count).to eq(1)
      end
    end

    context 'Unsuccessful request' do
      specify 'when post is not found' do
        post '/graphql', params: { query: graphql_query, variables: variables(postId: 999, name: 'like', update: false) }
  
        expect(response).to be_not_found
        expect(json).to eq('Not Found')
        expect(Reaction.count).to eq(0)
      end

      specify 'when reaction name is invalid' do
        post '/graphql', params: { query: graphql_query, variables: variables(postId: bark_post.id, name: 'invalid', update: false) }
      
        expect(response).to be_successful
        expect(json['data']['addReaction']['errors']).to eq(['Name is not included in the list'])
        expect(Reaction.count).to eq(0)
      end
    end
  end

  describe 'removeReaction mutation' do
    before do
      create(:reaction, post: bark_post, user: user, name: 'like')
    end
    let (:graphql_mutation) do
      <<~GRAPHQL
        mutation removeReaction($id: ID!, $postId: ID!, $userId: ID!) {
          removeReaction(id: $id, postId: $postId, userId: $userId) {
            success
          }
        }
      GRAPHQL
    end

    context 'Successful request' do
      specify 'when user removes a reaction' do
        expect(Reaction.count).to eq(1)
        post '/graphql', params: { query: graphql_mutation, variables: { id: Reaction.first.id, postId: bark_post.id, userId: user.id } }
        expect(response).to be_successful
        expect(json['data']['removeReaction']['success']).to eq(true)
        expect(Reaction.count).to eq(0)
      end
    end

    context 'Unsuccessful request' do
      specify 'when post is not found' do
        post '/graphql', params: { query: graphql_mutation, variables: { id: Reaction.first.id, postId: 999, userId: user.id } }
        expect(response).to be_not_found
        expect(json).to eq('Not Found')
        expect(Reaction.count).to eq(1)
      end

      specify 'when reaction is not found' do
        post '/graphql', params: { query: graphql_mutation, variables: { id: 999, postId: bark_post.id, userId: user.id } }
        expect(response).to be_not_found
        expect(json).to eq('Not Found')
        expect(Reaction.count).to eq(1)
      end

      specify 'when user is not found' do
        post '/graphql', params: { query: graphql_mutation, variables: { id: Reaction.first.id, postId: bark_post.id, userId: 999 } }
        expect(response).to be_not_found
        expect(json).to eq('Not Found')
        expect(Reaction.count).to eq(1)
      end

      specify 'when user is not the owner of the reaction' do
        post '/graphql', params: { query: graphql_mutation, variables: { id: Reaction.first.id, postId: bark_post.id, userId: create(:user).id } }
        expect(response).to be_not_found
        expect(json).to eq('Not Found')
        expect(Reaction.count).to eq(1)
      end
    end
  end

  describe 'query reactions' do
    let(:graphql_query) do
      <<~GRAPHQL
        query reactions {
          reactions(postId: "#{bark_post.id}") {
            id
            isCurrentUserReaction
            name
            userDisplayName
          }
        }
      GRAPHQL
    end

    context 'Successful request' do
      specify do
        create(:reaction, post: bark_post, user: user, name: 'like')
        post '/graphql', params: { query: graphql_query }
  
        expect(response).to be_successful
        expect(json['data']['reactions'].size).to eq(1)
        expect(json['data']['reactions'][0]['name']).to eq('like')
        expect(json['data']['reactions'][0]['userDisplayName']).to eq(user.display_name)
        expect(json['data']['reactions'][0]['isCurrentUserReaction']).to eq(true)
      end
    end

    context 'Unsuccessful request' do
      specify 'when post is not found' do
        post '/graphql', params: { query: graphql_query.gsub(bark_post.id.to_s, '999') }
  
        expect(response).to be_successful
        expect(json['data']['reactions'].size).to eq(0)
      end
    end
  end
end