module Types
  module Enums
    class FriendRequestStatusEnums < Types::BaseEnum
      value "pending", "Friend request is pending"
      value "accepted", "Friend request is accepted"
      value "declined", "Friend request is declined"
    end

    class FriendRequestActionEnums < Types::BaseEnum
      value "accept", "Friend request is accepted"
      value "declined", "Friend request is declined"
    end
  end
end
