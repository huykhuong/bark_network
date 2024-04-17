class SessionsController < ApplicationController
  def create
    @user = User.find(params[:user][:username])

    if @user
      if @user.unconfirmed?
        render json: { errors: { unconfirmed: "Please confirm your account's email before logging in." } }
      elsif @user.authenticate(params[:user][:password])
        redirect_to root_path, notice: "You have signed in successfully"
      else
        render json: { errors: { unconfirmed: "Invalid email or password." } }, status: :unprocessable_entity
      end
    else
      render json: { errors: { unconfirmed: "Invalid email or password." } }, status: :unprocessable_entity
    end
  end

  def destroy
    logout
    redirect_to new_sessions_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end