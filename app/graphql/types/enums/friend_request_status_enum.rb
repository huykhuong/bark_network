module Types
  module Enums
    class FriendRequestStatusEnum < Types::BaseEnum
      value "pending", value: "pending"
      value "accepted", value: "accepted"
      value "declined", value: "declined"
    end
  end
end