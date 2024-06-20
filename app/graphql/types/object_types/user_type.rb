module Types
  module ObjectTypes
    class UserType < Types::BaseObject
      field :id, ID, null: false
      field :username, String, null: false
      field :profile, Types::ObjectTypes::UserProfileType, null: false
    end
  end
end
