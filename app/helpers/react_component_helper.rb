module ReactComponentHelper
  def react_component_with_context(path, props = nil)
    react_component path, { props:, context: }, camelize_props: true
  end

  def screen_component(path, props = nil)
    react_component_with_context "screens/#{path}", props
  end

  private

  def context
    {
      user: current_user&.slice(:username, :email)&.merge(user_signed_in: user_signed_in?) || []
    }
  end
end
