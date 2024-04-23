FactoryBot.define do
  factory :profile do
    display_name { "MyString" }
    bio { "MyText" }
    last_signed_in { "2024-04-22 19:58:00" }
    gender { "MyString" }
    date_of_birth { "2024-04-22" }
  end
end
