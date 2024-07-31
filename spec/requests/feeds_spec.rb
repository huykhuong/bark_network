require 'rails_helper'

RSpec.describe "Feeds", type: :request do
  let (:user) { create(:user) }
  let (:profile) { create(:profile) }

  before(:each) do
    login user
    allow(Excon).to receive(:get).with('https://dummyjson.com/quotes/random').and_return(
      Excon::Response.new(
        body: { quote: 'This is a test quote' }.to_json,
        status: 200
      )
    )
  end

  describe "GET /index" do
    specify('renders the index template') do
      get '/'
      expect(response).to be_successful
      expect(response).to render_template("index")
      expect(response.body).to include('This is a test quote')
    end
  end
end