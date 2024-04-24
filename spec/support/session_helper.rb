module SessionHelper
  def login(user)
    allow_any_instance_of(FeedsController).to receive(:current_user).and_return(user)
    allow(user.profile).to receive(:setup?).and_return(true)
  end
end