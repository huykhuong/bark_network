# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    def errors(obj)
      obj.errors.to_hash.transform_values(&:first)
    end
  end
end
