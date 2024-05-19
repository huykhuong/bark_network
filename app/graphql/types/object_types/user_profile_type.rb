module Types
  module ObjectTypes
    class UserProfileType < Types::BaseObject
        field :id, ID, null: false
        field :display_name, String, null: false
        field :avatar, String, null: true
        field :bio, String, null: true
        field :gender, String, null: true
        field :date_of_birth, GraphQL::Types::ISO8601Date, null: true
      end
  end
end
