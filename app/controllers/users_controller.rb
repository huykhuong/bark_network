class UsersController < ApplicationController
  before_action :redirect_if_authenticated, only: [:create, :new]

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_confirmation_email!
      render json: { data: { message: "Please check your email for confirmation instructions to activate your account." } }
    else
      render json: { errors: @user.errors.to_hash.transform_values(&:first) }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end
end
