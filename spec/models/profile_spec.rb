require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe 'Validation on update and Callbacks' do
    let (:profile) { create(:profile, display_name: '') }

    specify do
      expect(profile.display_name).to eq('huytest')
    end

    context 'when date_of_birth is invalid' do
      before do
        profile.update(date_of_birth: Date.today + 1)
        profile.valid?
      end

      specify do
        expect(profile).to_not be_valid
        expect(profile.errors[:date_of_birth]).to include("Date of birth can't be in the future")
      end
    end

    context 'when date_of_birth is nil' do
      before do
        profile.update(date_of_birth: nil)
        profile.valid?
      end

      specify do
        expect(profile).to_not be_valid
        expect(profile.errors[:date_of_birth]).to include("Please provide your date of birth.")
      end
    end
  end

  describe "Validations" do
    context 'Passed valiations' do
      let (:profile) { build(:profile) }

      specify do
        expect(profile).to be_valid
        expect(profile.date_of_birth).to be < Date.today
      end
    end

    context 'Failed validations' do
      let (:profile) { build(:profile, display_name: 'huy space', date_of_birth: Date.today + 1, gender: 'binary') }

      specify 'Display name contain white spaces' do
        profile.valid?
        expect(profile.errors[:display_name]).to include("Display name can't contain white spaces.")
      end

      specify 'Invalid gender' do
        expect(profile).to_not be_valid
        expect(profile.errors[:gender]).to include("binary is not a valid gender.")
      end
    end
  end

  describe "Associations" do
    let (:user) { create(:user) }
    let (:profile) { build(:profile) }

    specify do
      expect(user.profile.display_name).to eq(profile.display_name)
    end
  end
end
