# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    include Helpers::Authorization

    field :errors, GraphQL::Types::JSON, null: true

    def errors(obj)
      obj.errors.to_hash.transform_values(&:first)
    end
  end
end
