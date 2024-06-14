class UsersController < ApplicationController
  before_action :redirect_if_authenticated, only: [:new]
  before_action :raise_if_authenticated, only: [:create]

  def show
    user = User.find_by(username: params[:username])
  
    render404 if user.nil?
  
    @can_edit = current_user == user
  
    @user = {
      account: user.to_react_params,
      profile: user.profile.to_react_params,
    }
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
