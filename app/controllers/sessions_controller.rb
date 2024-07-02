class SessionsController < ApplicationController
  before_action :redirect_if_authenticated, only: [:new]
  before_action :raise_if_authenticated, only: [:create]
  before_action :require_username_and_password, only: [:create]

  def create
    @user = User.find_by(username: user_params[:username])

    if @user
      login @user
      if @user.unconfirmed?
        render json: { data: { redirect: '/confirmations/new' } }
      elsif @user.authenticate(user_params[:password])
        flash[:notice] = "You have signed in successfully"
        render json: { data: { redirect: current_user.profile.setup? ? '/' : '/profile' } }
      else
        respond_failed_authentication
      end
    else
      respond_failed_authentication
    end
  end

  def destroy
    logout
    redirect_to login_path
  end

  private

  def require_username_and_password
    errors = {}

    if user_params[:username].blank?
      errors[:username] = I18n.t('controllers.sessions.missing_username')
    end

    if user_params[:password].blank?
      errors[:password] = I18n.t('controllers.sessions.missing_password')
    end

    render json: { errors: }, status: :bad_request unless errors.blank?
  end

  def respond_failed_authentication
    render json: { errors: { authentication: I18n.t('controllers.sessions.authentication') } }, status: :unprocessable_entity
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end