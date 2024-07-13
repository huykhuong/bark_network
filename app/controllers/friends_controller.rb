class FriendsController < ApplicationController
  def index
    redirect_if_not_confirmed and return
    redirect_if_not_authenticated and return
  end
end
