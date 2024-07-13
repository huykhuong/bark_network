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
        redirect_to edit_profile_path
      end
    end
  end

  def redirect_if_not_confirmed
    if user_signed_in? && current_user.unconfirmed?
      redirect_to new_confirmation_path
    end
  end

  def redirect_if_not_authenticated
    redirect_to root_path, alert: "You need to sign in or sign up before continuing." if !user_signed_in?
  end

  def raise_if_not_authenticated
    raise "Not authenticated" unless user_signed_in?
  end

  def raise_if_authenticated
    raise "You cannot perform this action when logged in" if user_signed_in?
  end

  private

  def current_user
    Current.user ||= session[:current_user_id] && User.find(session[:current_user_id])
  end

  def user_signed_in?
    Current.user.present?
  end
end