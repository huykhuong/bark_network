module GraphqlHelper
  def variables(**variables)
    variables.to_json
  end
end