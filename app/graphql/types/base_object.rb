# frozen_string_literal: true

module Types
  class BaseObject < GraphQL::Schema::Object
    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)
    field_class Types::BaseField

    class << self
      def paginated_field(name, node_class, **options)
        options[:extensions] ||= []
        options[:extensions] << Extensions::PaginationExtension
        field name, node_class.create_page_type, **options
      end

      protected

      def create_page_type
        Types::BasePage.create(self)
      end
    end
  end
end
