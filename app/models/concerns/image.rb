module Image
  extend ActiveSupport::Concern

  included do
    attr_accessor :skip_avatar_presence_validation
  end

  class_methods do
    def had_attachment(name)
      has_one_attached name

      validate "#{name}_presence".to_sym, unless: -> { skip_avatar_presence_validation }, on: :update

      define_method("#{name}_presence") do
        errors.add(name, :blank) unless send(name).attached?
      end
    end
  end
end
