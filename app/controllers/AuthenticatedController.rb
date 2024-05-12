class AuthenticatedController < ApplicationController
  before_action :redirect_if_not_authenticated, except: [:update, :update_avatar]
end