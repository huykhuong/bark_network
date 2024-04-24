class FeedsController < ApplicationController
  def index
    redirect_to profile_path unless current_user.profile.setup?
  end
end
