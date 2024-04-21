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
        # This is because of fixture created for mailer test
        user.username = 'huyk'
        expect(user).to_not be_valid
      end
    end
  end
end