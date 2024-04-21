require 'rails_helper'

RSpec.describe "Feeds", type: :request do
  describe "GET /index" do
    specify('renders the index template') do
      get '/'
      expect(response).to be_successful
      expect(response).to render_template("index")
    end
  end
end
