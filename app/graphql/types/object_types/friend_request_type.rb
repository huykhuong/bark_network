module Types
  module ObjectTypes
    class FriendRequestType < Types::BaseObject
        field :id, ID, null: false
        field :status, Types::Enums::FriendRequestStatusEnum, null: false
      end
  end
end
