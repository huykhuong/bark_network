FactoryBot.define do
  factory :profile do
    sequence(:id, 2) { |n| n }
    display_name { "strawberrycookie" }
    bio { "xdd" }
    last_signed_in { "2024-04-22 19:58:00" }
    gender { 'male' }
    date_of_birth { "2024-04-22" }
    setup { true }

    association :user, factory: :user
  end
end
