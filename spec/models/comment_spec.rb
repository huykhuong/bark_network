require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "validations" do
    context 'Passed validations' do
      subject (:comment) { build(:comment) }

      specify 'a valid comment' do
        expect(comment).to be_valid
        expect(comment.edited).to be false
      end
    end

    context 'Failed validations' do
      subject (:comment) { build(:comment, comment: nil, commenter: nil, post: nil) }

      specify 'not a valid comment without content' do
        expect(comment).to_not be_valid
        expect(comment.errors[:comment]).to include("can't be blank")
      end

      specify 'not a valid comment without content' do
        expect(comment).to_not be_valid
        expect(comment.errors[:comment]).to include("can't be blank")
      end

      specify 'not a valid comment without a commenter' do
        expect(comment).to_not be_valid
        expect(comment.errors[:commenter]).to include("must exist")
      end

      specify 'not a valid comment without a post' do
        expect(comment).to_not be_valid
        expect(comment.errors[:post]).to include("must exist")
      end
    end
  end

  describe "#edited?" do
    subject (:new_comment) { create(:comment) }

    context 'Unedited comment' do
      specify 'returns false' do
        expect(new_comment.edited?).to be false
      end
    end

    context 'Edited comment' do
      specify 'returns true' do
        new_comment.update(comment: "New Comment")
        expect(new_comment.comment).to eq("New Comment")
        expect(new_comment.edited?).to be true
      end
    end
  end
end
