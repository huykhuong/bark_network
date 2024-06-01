FactoryBot.define do
  factory :friend_request do
    association :requester, factory: :user
    association :receiver, factory: :user

    trait :accepted do
      status { 'accepted' }
    end

    trait :declined do
      status { 'declined' }
    end
  end
end
