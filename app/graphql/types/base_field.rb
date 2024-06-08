# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    def initialize(**kwargs, &)
      # Call super to perform normal field definition
      super

      return_type = kwargs[:type]
      if return_type.is_a?(Class) && return_type < BasePage
        self.extension(PageWrapperExtension)
      end
    end
  end
  class PageWrapperExtension < GraphQL::Schema::FieldExtension
    def apply
      field.argument(:page, Integer, required: false, default_value: 1)
      field.argument(:per_page, Integer, required: false)
    end

    def resolve(object:, arguments:, **rest)
      copied_arguments = arguments.dup
      page = copied_arguments.delete(:page)
      per_page = copied_arguments.delete(:per_page)
      resolved_items = yield(object, copied_arguments)
      Types::Customs::Page.new(resolved_items, page:, per_page:)
    end
  end
end
