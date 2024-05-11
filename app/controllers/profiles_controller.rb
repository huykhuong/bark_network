class ProfilesController < ApplicationController
  before_action :redirect_if_not_authenticated, only: [:edit]
  before_action :raise_if_not_authenticated, only: [:update, :update_avatar]
  before_action :get_profile, only: [:update, :update_avatar]

  def update
    @profile.skip_avatar_presence_validation = true
    if @profile.update(profile_params)
      if @profile.setup?
        render json: { data: { message: t('setup', scope: "controllers.profiles.update") } }
      else
        @profile.update(setup: true)
        render json: { data: { message: t('not_setup', scope: "controllers.profiles.update"), redirect: '/', timeout: 3000 } }
      end
    else
      render json: { errors: @profile.to_errors}, status: :unprocessable_entity
    end
  end

  def update_avatar
    if @profile.avatar.attach(profile_params[:avatar])
      render json: { data: { message: t('avatar', scope: "controllers.profiles.update_avatar") } }
    else
      render json: { errors: @profile.to_errors}, status: :unprocessable_entity
    end
  end

  private

  def get_profile
    @profile ||= current_user.profile
  end

  def profile_params
    params.require(:profile).permit(:display_name, :gender, :bio, :date_of_birth, :avatar)
  end
end
