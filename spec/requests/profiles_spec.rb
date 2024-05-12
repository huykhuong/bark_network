require 'rails_helper'

RSpec.describe "Profiles", type: :request do
  let (:user) { create(:user) }
  let (:avatar) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'cutie_seri.jpg'), 'image/jpg') }

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

  describe "PATCH /profile" do
    context 'Successful profile patch request' do
      let (:params) { {  profile: attributes_for(:profile) } }

      specify 'With setup profile' do
        patch '/profile', params:;
        expect(response).to be_successful
        expect(controller.action_name).to eq('update')
        expect(response.parsed_body[:data][:message]).to eq('Your profile has been updated')
      end

      specify 'With profile not yet setup', :skip_before do
        login(user, profile_set_up: false)
        patch '/profile', params:;
        expect(response).to be_successful
        expect(controller.action_name).to eq('update')
        expect(response.parsed_body[:data][:message]).to include('you are now ready to join the Bark community')
      end

      specify 'Successful avatar upload' do
        patch '/profile/avatar', params: { profile: { avatar:} }
        expect(response).to be_successful
        expect(response.parsed_body[:data][:message]).to eq('Your avatar has been updated successfully.')
        expect(user.profile.avatar.attached?).to be true
      end
    end

    context 'Failed profile patch request' do
      let (:params) { {  profile: { bio: 'a' * 251 , display_name: 'huy space', gender: 'random', date_of_birth: Date.today + 1} } }

      before do
        allow_any_instance_of(ActiveStorage::Attached::One).to receive(:attach).and_return(false)
      end
      
      specify 'Invalid params' do
        patch '/profile', params:;
        expect(response).to_not be_successful

        expect(response.parsed_body[:errors][:gender]).to eq('random is not a valid gender.')
        expect(response.parsed_body[:errors][:dateOfBirth]).to eq("Date of birth can't be in the future")
        expect(response.parsed_body[:errors][:displayName]).to eq("Display name can't contain white spaces.")
        expect(response.parsed_body[:errors][:bio]).to eq("Bio is too long (maximum is 250 characters).")
      end

      specify 'Missing DOB' do
        params.tap { |p| p[:profile][:date_of_birth] = nil }
        patch '/profile', params:;
        expect(response).to_not be_successful
        expect(response.parsed_body[:errors][:dateOfBirth]).to eq("Please provide your date of birth.")
      end

      specify 'Not logged in', :skip_before do
        expect { patch '/profile', params: }.to raise_error(RuntimeError, 'Not authenticated')
      end

      specify 'Upload with blank avatar' do
        patch '/profile/avatar', params:;
        expect(response).to_not be_successful
        expect(response.parsed_body[:errors][:avatar]).to eq('Bruh')
        expect(user.profile.avatar.attached?).to be false
      end

      specify 'Failed avatar upload' do
        patch '/profile/avatar', params: { profile: { avatar: } }
        expect(response).to_not be_successful
      end
    end
  end  
end
