module SessionHelper
  def login(user, profile_set_up: true)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
    allow(user.profile).to receive(:setup?).and_return(profile_set_up)
  end
end