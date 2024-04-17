class UserMailer < ApplicationMailer

  default from: User::MAILER_FROM_EMAIL

  def confirmation(user, confirmation_token)
    @confirmation_token = confirmation_token

    mail to: user.email, subject: "Confirmation Instructions"
  end

  def password_reset(user, reset_token)
    @reset_token = reset_token

    mail to: user.email, subject: "Password Reset Intructions"
  end
end
