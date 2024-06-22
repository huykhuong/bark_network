class UsersController < ApplicationController
  before_action :redirect_if_authenticated, only: [:new]
  before_action :raise_if_authenticated, only: [:create]

  def show
    if current_user.present? && current_user.username == params[:username]
      @user = {
        account: current_user.to_react_params,
        profile: current_user.profile.to_react_params,
      }
      @can_edit = true
    else
      user = User.find_by(username: params[:username])
      render404 and return if user.nil?
      @user = {
        account: user.to_react_params,
        profile: user.profile.to_react_params,
      }
      @can_edit = false
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_confirmation_email!
      render json: { data: { message: "Please check your email for confirmation instructions to activate your account." } }
    else
      render json: { errors: @user.errors.to_hash.transform_values(&:first) }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end
end
