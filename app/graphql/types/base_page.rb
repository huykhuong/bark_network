# A generic page type

module Types
  class BasePage < Types::BaseObject
    def self.create(node_class)
      Class.new(self) do
        graphql_name("#{node_class.graphql_name}Page")
        field :nodes, [node_class], null: false
      end
    end

    field :has_previous_page, Boolean, null: false
    field :has_next_page, Boolean, null: false
    field :pages_count, Integer, null: false
    field :nodes_count, Integer, null: false
  end
end
