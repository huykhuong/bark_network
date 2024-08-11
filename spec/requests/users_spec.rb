require 'rails_helper'

RSpec.describe "Users", type: :request do
  let (:params) { { user: attributes_for(:user, email: 'yo@email.com') } }

  describe "GET /register" do
    specify 'Render account registration page' do
      get '/register'
      expect(response).to be_successful
      expect(response).to render_template('new')
    end
  end

  describe "GET /users/:username" do
    specify 'Render user profile page' do
      user = create(:confirmed_user, username: 'huyk')
      login user

      get '/huyk'

      expect(response).to be_successful
      expect(response).to render_template('show')
      expect(response.body).to include('strawberrycookie')
      expect(assigns(:can_edit)).to eq(true)
    end

    specify 'Render user profile page when not logged in' do
      create(:confirmed_user, username: 'huyk')
      get '/huyk'

      expect(response).to be_successful
      expect(assigns(:can_edit)).to eq(false)
    end

    specify 'Render 404 page when user not found' do
      get '/unknown'

      expect(response).to have_http_status(:not_found)
      expect(response.parsed_body).to eq('Not Found')
    end
  end

  describe "POST /register" do
    context 'Successful registration' do
      specify do
        post '/register', params:;
        expect(response).to be_successful
        expect(response.parsed_body[:data][:message]).to eq("Please check your email for confirmation instructions to activate your account.")
      end

      specify 'Confirmation email is sent' do
        expect { post '/register', params: }.to change { ActionMailer::Base.deliveries.size }.by(1)
        last_email = ActionMailer::Base.deliveries.last
        expect(last_email.to).to eq(["yo@email.com"])
        expect(last_email.subject).to eq("Confirmation Instructions")
        expect(last_email.body.encoded).to include("This is your account confirmation email")
      end
    end

    context 'Failed registration' do
      specify 'Missing username and password' do
        params[:user][:username] = ''
        params[:user][:password] = ''
        post '/register', params:;
        expect(response).to_not be_successful
        expect(response.parsed_body[:errors][:username]).to be_present
        expect(response.parsed_body[:errors][:username]).to eq("Please provide a username.")
        expect(response.parsed_body[:errors][:password]).to be_present
        expect(response.parsed_body[:errors][:password]).to eq("Please provide a password.")
      end

      specify 'Username already exists' do
        create(:duplicated_user)
        params[:user][:username] = 'huyk'
        post '/register', params:;
        expect(response).to_not be_successful
        expect(response.parsed_body[:errors][:username]).to be_present
        expect(response.parsed_body[:errors][:username]).to eq("This username is not available.")
      end
    end

    context 'Already logged in' do
      let (:user) { create(:confirmed_user) }

      before do
        login user
      end

      specify 'Go to user registration screen when logged in should be redirected' do
        get '/register'
        expect(response).to have_http_status(302)
      end

      specify 'Cannot perform user registration when already logged in' do
        expect { post '/register', params: }.to raise_error(RuntimeError, 'You cannot perform this action when logged in')
      end
    end
  end
end
