require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    let(:user) { build(:user) }

    context 'Passed validations' do
      specify 'a valid user' do
        expect(user).to be_valid
      end
    end

    context 'Failed validations' do
      specify 'not a valid user without password' do
        user.password = nil
        expect(user).to_not be_valid
      end

      specify 'not a valid user with too long username' do
        user.username = 'a' * 31
        expect(user).to_not be_valid
      end

      specify 'duplicated username' do
        create(:user)
        user2 = build(:user)

        expect(user2).not_to be_valid
        expect(user2.errors[:username]).to include("This username is not available.")
      end
    end
  end
end