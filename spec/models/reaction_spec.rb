require 'rails_helper'

RSpec.describe Reaction, type: :model do
  describe 'constants' do
    specify 'has a list of valid reactions' do
      expect(Reaction::VALID_REACTIONS).to eq(%w(like heart haha wow sad angry))
    end
  end

  describe "validations" do
    let(:new_user) { create(:user) }
    let(:new_post) { create(:post) }
    let(:reaction) { create(:reaction, user: new_user, post: new_post) }
    let (:duplicated_reaction) { build(:reaction, user: new_user, post: new_post) }

    specify "is valid with valid attributes" do
      expect(reaction).to be_valid
    end

    specify "is not valid without a name" do
      reaction.name = nil
      expect(reaction).to be_invalid
    end

    specify "is not valid with an invalid name" do
      reaction.name = 'invalid'
      expect(reaction).to be_invalid
    end

    specify "is not valid without a user" do
      reaction.user = nil
      expect(reaction).to be_invalid
    end

    specify "is not valid without a post" do
      reaction.post = nil
      expect(reaction).to be_invalid
    end

    specify "is not valid with a duplicate user and post" do
      reaction
      duplicated_reaction.save
      expect(duplicated_reaction).to be_invalid
    end
  end
end
