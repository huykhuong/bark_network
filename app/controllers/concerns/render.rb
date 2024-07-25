module Render
  extend ActiveSupport::Concern

  def render404
    render plain: 'Not Found', status: :not_found
  end
end