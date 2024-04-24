FactoryBot.define do
  factory :profile do
    id { 1 }
    display_name { "MyString" }
    bio { "MyText" }
    last_signed_in { "2024-04-22 19:58:00" }
    gender { 'male' }
    date_of_birth { "2024-04-22" }
    setup { true }

    association :user, factory: :user
  end
end
