require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "validations" do
    context 'Passed validations' do
      let(:post) { build(:post) }

      specify 'a valid post' do
        expect(post).to be_valid
      end
    end

    context 'Failed validations' do
      let(:post) { build(:post, author: nil, content: nil, title: "a" * 256) }

      specify 'not a valid post without content' do
        expect(post).to_not be_valid
        expect(post.errors[:content]).to include("You forgot to add some content for the post.")
      end

      specify 'not a valid post with too long title' do
        expect(post).to_not be_valid
        expect(post.errors[:content]).to include("You forgot to add some content for the post.")
      end

      specify 'no author assigned' do
        expect(post).to_not be_valid
        expect(post.errors[:author]).to include("A post must have an author.")
      end
    end

    context 'Post has been edited' do
      let(:post) { create(:post) }

      specify 'post has been edited' do
        post.update(title: "New Title")
        expect(post.edited?).to be true
      end
    end

    context 'Post belongs to an author' do
      let(:user) { build(:user) }
      let(:post) { build(:post) }

      specify do
        expect(post.author).to eq(user)
      end
    end
  end
end
