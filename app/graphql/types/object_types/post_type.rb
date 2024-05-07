module Types
  module ObjectTypes
  class PostType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: true
      field :content, String, null: false
      field :edited, Boolean, null: false
      field :created_at, String, null: false
      field :author_name, String, null: false
      field :is_author, Boolean, null: false
    end
  end
end