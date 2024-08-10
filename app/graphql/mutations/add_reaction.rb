# frozen_string_literal: true

module Mutations
  class AddReaction < Mutations::BaseMutation
    argument :post_id, ID, required: true
    argument :name, String, required: true
    argument :update, Boolean, required: true

    field :reaction, Types::ObjectTypes::ReactionType
    field :errors, [String]

    def resolve(post_id:, name:, update:)
      if update
        existing_reaction = Reaction.find_by(post_id: post_id, user_id: current_user.id)

        if existing_reaction
          existing_reaction.update_columns(name:)
          return { reaction: existing_reaction, errors: [] }
        end
      end

      post = Post.find(post_id)

      reaction = Reaction.find_or_create_by!(
        post:,
        user: current_user,
        name: name
      )
    rescue ActiveRecord::RecordInvalid => e
      { reaction: nil, errors: e.record.errors.full_messages }
    else
      { reaction:, errors: [] }
    end
  end
end

