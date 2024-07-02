require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let (:user) { create(:confirmed_user) }
  let (:params) { { user: { username: user.username, password: user.password } } }

  describe "GET /login" do
    specify 'Render login form' do
      get '/login'
      expect(response).to be_successful
      expect(response).to render_template('new')
    end
  end

  describe "POST /login" do
    context 'Successful login' do
      specify do
        post '/login', params:;
        expect(response).to be_successful
        expect(response.parsed_body[:data][:redirect]).to eq('/')
        expect(flash[:notice]).to be_present
        expect(flash[:notice]).to eq('You have signed in successfully')
      end
    end

    context 'Failed login' do
      context 'Missing credentials' do
        specify 'Missing username' do
          post '/login', params: { user: { password: user.password } }
          expect(response).to_not be_successful
          expect(response.parsed_body[:errors][:username]).to eq('You must provide a username.')
        end

        specify 'Missing password' do
          post '/login', params: { user: { username: user.username } }
          expect(response).to_not be_successful
          expect(response.parsed_body[:errors][:password]).to eq('You must provide a password.')
        end

        specify 'Unconfirmed account' do
          user.update(confirmed_at: nil)
          post '/login', params:;
          expect(response.parsed_body[:data][:redirect]).to eq('/confirmations/new')
        end

        specify 'Wrong credentials' do
          post '/login', params: { user: { username: user.username, password: 'wrong' } }
          expect(response).to_not be_successful
          expect(response.parsed_body[:errors][:authentication]).to eq('Invalid email or password.')
        end
      end
    end

    context 'Already logged in' do
      before do
        login user
      end

      specify 'Go to login screen when logged in should be redirected' do
        get '/login'
        expect(response).to have_http_status(302)
        expect(flash[:alert]).to eq('You have already signed in')
      end

      specify 'Cannot log in again when already logged in' do
        expect { post '/login', params: }.to raise_error(RuntimeError, 'You cannot perform this action when logged in')
      end
    end
  end
end
