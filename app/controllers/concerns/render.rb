module Render
  extend ActiveSupport::Concern

  def render404
    render file: "#{Rails.root}/public/404.html", status: :not_found
  end
end