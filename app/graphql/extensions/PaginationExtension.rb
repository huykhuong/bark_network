module Extensions
  class PaginationExtension < GraphQL::Schema::FieldExtension
    def apply
      field.argument(:page, Integer, required: false, default_value: 1)
      field.argument(:per_page, Integer, required: false)
    end

    def resolve(object:, arguments:, **rest)
      cleaned_arguments = arguments.dup
      page = cleaned_arguments.delete(:page)
      per_page = cleaned_arguments.delete(:per_page)
      # Yield is used here to call the original resolver and pass the copied arguments to it.
      resolved_items = yield(object, cleaned_arguments, **rest)
      # Resolved_items is actually the full list of items that the original resolver would return, without any pagination yet.
      Types::Customs::Page.new(resolved_items, page:, per_page:)
    end
  end
end