module Helpers
  module Authorization
    def current_user
      @current_user ||= begin
        if context[:current_user].nil?
          raise GraphQL::ExecutionError, "You need to log in to perform this action."
        end

        context[:current_user]
      end
    end
  end
end