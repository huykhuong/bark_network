FactoryBot.define do
  factory :user do
    username { "huytest" }
    email { "test@email.com" }
    password { "testpassword" }
    locked { false }

    transient do
      create_profile { true }
    end

    after(:create) do |user, evaluator|
      create(:profile, user:) if evaluator.create_profile
    end

    factory :confirmed_user do
      confirmed_at { "Wed, 17 Apr 2024 15:24:31.395409000 UTC +00:00" }
    end

    factory :duplicated_user do
      username { 'huyk' }
      email { 'anotherhuy@email.com' }
    end
  end
end
