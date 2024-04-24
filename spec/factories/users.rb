FactoryBot.define do
  factory :user do
    id { 1 }
    username { "huytest" }
    email { "test@email.com" }
    password { "testpassword" }

    after(:create) do |user|
      create(:profile, user:)
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
