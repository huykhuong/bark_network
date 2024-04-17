module TestPasswordHelper
  DEFAULT_PASSWORD = 'password'

  def default_password_digest
    BCrypt::Password.create(DEFAULT_PASSWORD, cost: 4)
  end
end