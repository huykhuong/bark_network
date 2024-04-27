class ProfilesController < ApplicationController
  def update
    profile = current_user.profile

    if profile.update(profile_params)
      if profile.setup?
        render json: { data: { message: t('setup', scope: "controllers.profiles.update") } }
      else
        profile.update(setup: true)
        render json: { data: { message: t('not_setup', scope: "controllers.profiles.update"), redirect: '/', timeout: 3000 } }
      end
    else
      render json: { errors: profile.errors.to_hash.transform_keys{ |k| k.to_s.camelize(:lower) }.transform_values(&:first)}, status: :unprocessable_entity
    end
  end

  private
  def profile_params
    params.require(:profile).permit(:display_name, :gender, :bio, :date_of_birth)
  end
end
