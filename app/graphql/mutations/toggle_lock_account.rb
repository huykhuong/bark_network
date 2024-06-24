# frozen_string_literal: true

module Mutations
  class ToggleLockAccount < Mutations::BaseMutation
    def resolve
      current_user.toggle_lock_user_account

      { errors: nil }
    end
  end
end
