module Types
  module ObjectTypes
    class FriendRequestType < Types::BaseObject
        field :id, ID, null: false
        field :receiver_profile, Types::ObjectTypes::UserProfileType, null: false
      end
  end
end
