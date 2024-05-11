module Types
  module ObjectTypes
  class PostType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: true
      field :content, String, null: false
      field :edited, Boolean, null: false
      field :created_at, String, null: false
      field :author_username, String, null: false
      field :author_profile, Types::ObjectTypes::UserProfileType, null: false 
    end
  end
end