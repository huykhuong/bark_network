FactoryBot.define do
  factory :comment do
    comment { "Hello World" }
    edited { false }
    association :commenter, factory: :user
    association :post
  end
end
