require 'rails_helper'

RSpec.describe "Users", type: :request do
  let (:params) { { user: attributes_for(:user) } }

  describe "GET /register" do
    specify 'Render account registration page' do
      get '/register'
      expect(response).to be_successful
      expect(response).to render_template('new')
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
        expect(last_email.to).to eq(["test@email.com"])
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
        params[:user][:username] = 'huyk'
        post '/register', params:;
        expect(response).to_not be_successful
        expect(response.parsed_body[:errors][:username]).to be_present
        expect(response.parsed_body[:errors][:username]).to eq("This username is not available.")
      end
    end
  end
end