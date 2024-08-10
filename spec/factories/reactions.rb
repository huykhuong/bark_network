FactoryBot.define do
  factory :reaction do
    name { "heart" }
    
    association :user, factory: :user
    association :post, factory: :post
  end
end
