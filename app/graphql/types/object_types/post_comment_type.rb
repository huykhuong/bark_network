module Types
  module ObjectTypes
    class PostCommentType < Types::BaseObject
      field :id, ID, null: false
      field :comment, String, null: false
      field :editable, Boolean, null: false
      field :edited, Boolean, null: false
      field :created_at, String, null: false
      field :commenter_avatar_url, String
      field :commenter_display_name, String
    end

    class PostCommentPayloadType < Types::BaseObject
      field :comments, [Types::ObjectTypes::PostCommentType], null: false
      field :has_more_comments, Boolean, null: false
      field :total_count, Integer, null: false
    end
  end
end
