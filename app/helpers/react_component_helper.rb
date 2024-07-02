module ReactComponentHelper
  def react_component_with_context(path, props = nil, class_name = nil)
    react_component path, { flash:, props:, user: }.compact_blank,
    { camelize_props: true, class: class_name }
  end

  def screen_component(path, props = nil)
    react_component_with_context "screens/#{path}", props, 'layout'
  end

  private

  def user
    return {} unless user_signed_in?

    {
      account: current_user.to_react_params,
    }.merge(current_user.profile ? { profile: current_user.profile.to_react_params } : {})
  end
end
