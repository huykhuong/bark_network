class ApplicationController < ActionController::Base
  include Authentication
  include Render

  # rescue_from ActiveRecord::RecordNotFound, with: :render404
end
