module Types
  module ObjectTypes
    class ReactionType < Types::BaseObject
      field :id, ID, null: false
      field :is_current_user_reaction, Boolean, null: false
      field :name, String, null: false
      field :user_display_name, String, null: false

      def is_current_user_reaction
        if object.is_a?(Reaction)
          return object.user_id.to_s == current_user.id.to_s
        end
        
        object[:is_current_user_reaction]
      end

      def user_display_name
        if object.is_a?(Reaction)
          return object&.user.display_name
        end

        object.dig(:user_display_name)
      end
    end
  end
end