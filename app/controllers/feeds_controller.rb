class FeedsController < ApplicationController
  def index
    redirect_to new_confirmation_path and return if user_signed_in? && current_user.unconfirmed?
    redirect_to profile_path if user_signed_in? && !current_user.profile.setup?
  end
end
