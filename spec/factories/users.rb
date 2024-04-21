FactoryBot.define do
  factory :user do
    username { "StrawberryCookie" }
    email { "test@email.com" }
    password { "testpassword" }

    factory :confirmed_user do
      confirmed_at { "Wed, 17 Apr 2024 15:24:31.395409000 UTC +00:00" }
    end

    factory :duplicated_user do
      username { 'strawberrycookie' }
      email { 'huy@email.com' }
    end
  end
end
