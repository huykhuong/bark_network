require 'rails_helper'

RSpec.describe "Feeds", type: :request do
  let (:user) { create(:user) }
  let (:profile) { create(:profile) }

  before(:each) do
    login user
  end

  describe "GET /index" do
    specify('renders the index template') do
      get '/'
      expect(response).to be_successful
      expect(response).to render_template("index")
    end
  end
end
