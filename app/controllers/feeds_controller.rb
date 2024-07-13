class FeedsController < ApplicationController
  def index
    redirect_if_not_confirmed
  end
end
