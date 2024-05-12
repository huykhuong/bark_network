require 'rails_helper'

RSpec.describe "Profiles", type: :request do
  let (:user) { create(:user) }

  before do |test|
    login user unless test.metadata[:skip_before]
  end

  describe "GET /profile" do
    specify 'Logged in' do
      get '/profile'
      expect(response).to be_successful
      expect(controller.action_name).to eq('edit')
      expect(response).to render_template('edit')
    end

    specify 'Not logged in', :skip_before do
      get '/profile'
      expect(response).to have_http_status(302)
      expect(response).to redirect_to(root_path)
      expect(flash[:alert]).to eq('You need to sign in or sign up before continuing.')
    end
  end

  describe "POST /profile" do
    context 'Successful profile post request' do
      let (:params) { {  profile: attributes_for(:profile) } }

      specify 'With setup profile' do
        post '/profile', params:;
        expect(response).to be_successful
        expect(controller.action_name).to eq('update')
        expect(response.parsed_body[:data][:message]).to eq('Your profile has been updated')
      end

      specify 'With profile not yet setup', :skip_before do
        login(user, profile_set_up: false)
        post '/profile', params:;
        expect(response).to be_successful
        expect(controller.action_name).to eq('update')
        expect(response.parsed_body[:data][:message]).to include('you are now ready to join the Bark community')
      end
    end

    context 'Failed profile post request' do
      let (:params) { {  profile: { bio: 'a' * 251 , display_name: 'huy space', gender: 'random', date_of_birth: Date.today + 1} } }
  
      specify 'Invalid params' do
        post '/profile', params:;
        expect(response).to_not be_successful

        expect(response.parsed_body[:errors][:gender]).to eq('random is not a valid gender.')
        expect(response.parsed_body[:errors][:dateOfBirth]).to eq("Date of birth can't be in the future")
        expect(response.parsed_body[:errors][:displayName]).to eq("Display name can't contain white spaces.")
        expect(response.parsed_body[:errors][:bio]).to eq("Bio is too long (maximum is 250 characters).")
      end

      specify 'Missing DOB' do
        params.tap { |p| p[:profile][:date_of_birth] = nil }
        post '/profile', params:;
        expect(response).to_not be_successful
        expect(response.parsed_body[:errors][:dateOfBirth]).to eq("Please provide your date of birth.")
      end

      specify 'Not logged in', :skip_before do
        expect { post '/profile', params: params }.to raise_error(RuntimeError, 'Not authenticated')
      end
    end
  end
end
