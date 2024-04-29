FactoryBot.define do
  factory :post do
    title { 'Test Title' }
    content { "Test Content" }

    association :author, factory: :user, create_profile: false
  end
end
