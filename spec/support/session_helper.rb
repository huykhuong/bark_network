module SessionHelper
  def login(user, profile_set_up: true)
    allow_any_instance_of(ApplicationController).to receive_messages(current_user: user, user_signed_in?: true)
    allow(user.profile).to receive(:setup?).and_return(profile_set_up)
  end
end