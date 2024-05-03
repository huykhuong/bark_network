class FeedsController < ApplicationController
  def index
    redirect_to profile_path if user_signed_in? && current_user.profile.setup?
  end
end
