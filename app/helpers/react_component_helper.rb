module ReactComponentHelper
  def react_component_with_context(path, props = nil)
    react_component path, { props:, context: }, camelize_props: true
  end

  def screen_component(path, props = nil)
    react_component_with_context "screens/#{path}", props
  end

  private

  def context
    return {} unless user_signed_in?

    {
      user: current_user.to_react_params
    }
  end
end
