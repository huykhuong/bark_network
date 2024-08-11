session_url = "#{ENV['REDIS_CACHE_URL']}/0/session"
secure = Rails.env.production?
key = Rails.env.production? ? "_app_session" : "_app_session_#{Rails.env}"
domain = ENV['DOMAIN_NAME']

Rails.application.config.session_store :redis_store,
                                       url: session_url,
                                       expire_after: 30.days,
                                       key:,
                                       domain:,
                                       threadsafe: true,
                                       secure:,
                                       same_sote: :lax,
                                       httponly: true
