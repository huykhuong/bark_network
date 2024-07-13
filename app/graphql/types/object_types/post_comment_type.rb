module Types
  module ObjectTypes
    class PostCommentType < Types::BaseObject
      field :id, ID, null: false
      field :comment, String, null: false
      field :edited, Boolean, null: false
      field :created_at, String, null: false
      field :commenter_avatar_url, String, null: false
      field :commenter_display_name, String, null: false
    end
  end
end