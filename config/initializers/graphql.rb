Rails.application.config.graphql.tap do |config|
  config.max_depth = 10
end