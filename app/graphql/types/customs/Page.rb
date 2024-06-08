module Types
  module Customs
    class Page
      DEFAULT_PAGE_SIZE = 5
      MAX_PAGE_SIZE = 10

      def initialize(all_nodes, page:, per_page:)
        @all_nodes = all_nodes
        # Normalize pagination arguments
        @page = if page.nil? || page < 1
                  1
                else
                  page
                end
        @per_page = if per_page.nil? || per_page < 1
                      DEFAULT_PAGE_SIZE
                    elsif per_page > MAX_PAGE_SIZE
                      MAX_PAGE_SIZE
                    else
                      per_page
                    end
      end

      def has_next_page
          nodes_count > @per_page * @page
      end

      def has_previous_page
        @page > 1
      end

      def pages_count
        (nodes_count.to_f / @per_page).ceil
      end

      def nodes_count
        @nodes_count ||= case @all_nodes
                         when Array
                           @all_nodes.size
                         # Evaluate ActiveRecord::Relation because it can be a result of ActiveRecord's order/all/where methods
                         when ActiveRecord::Relation
                          @all_nodes.unscope(:order).size
                         else
                           @all_nodes.size
                         end
      end

      def nodes
        offset = (@page - 1) * @per_page
        nodes = case @all_nodes
                   when Array
                    @all_nodes[offset, @per_page] || []
                   when ActiveRecord::Relation
                    @all_nodes.offset(offset).limit(@per_page)
                   else
                     raise StandardError, "Unsupported type for pagination"
                   end
        nodes.map(&:to_react_params)
      end
    end
  end
end