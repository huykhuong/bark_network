class ConfirmationsController < ApplicationController
  def create
    user = User.find_by(email: current_user.email)

    if user.present? && user.unconfirmed?
      user.send_confirmation_email!
      redirect_to new_confirmation_path, notice: 'We have sent you an email, please check confirmation instructions in it.'
    else
      render json: { errors: { invalid: 'Sorry, we could not find a user with this email address.' } }
    end
  end

  def edit
    user = User.find_signed(params[:confirmation_token], purpose: :confirm_email)

    if user.present?
      user.confirm!

      login user

      user.create_profile(gender: 'undisclosed', setup: false)
      redirect_to profile_path
    else
      render json: { message: 'Your account has not been confirmed' }
    end
  end

  def new; end
end
