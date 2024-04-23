class ConfirmationsController < ApplicationController
  before_action :redirect_if_authenticated, only: [:create, :new]

  def create
    user = User.find_by(email: resend_confirmation_email_params.downcase)

    if user.present? && user.unconfirmed!
      @user.send_confirmation_email!
      render json: { message: 'We have sent you an email, please check confirmation instructions in it.' }
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
      render json: { message: 'Your account has been confirmed' }
    else
      render json: { message: 'Your account has not been confirmed' }
    end
  end

  def new; end

  private

  def resend_confirmation_email_params
    params.require(:user).permit(:email)
  end
end
