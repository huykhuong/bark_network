class FriendsController < ApplicationController
  def index
    redirect_to login_path unless user_signed_in?
  end
end
