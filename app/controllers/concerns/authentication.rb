module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :current_user
    helper_method :current_user
    helper_method :user_signed_in?
  end

  def login(user)
    reset_session
    session[:current_user_id] = user.id
  end

  def logout
    reset_session
  end

  def redirect_if_authenticated
    if user_signed_in?
      if current_user.profile.setup?
        redirect_to root_path, alert: "You have already signed in"
      else
        redirect_to profile_path
      end
    end
  end

  private

  def current_user
    Current.user ||= session[:current_user_id] && User.find(session[:current_user_id])
  end

  def user_signed_in?
    Current.user.present?
  end
end