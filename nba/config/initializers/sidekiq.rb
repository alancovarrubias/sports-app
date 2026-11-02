Sidekiq.configure_server do |config|
  config.redis = { url: ENV.fetch('REDIS_URL_SIDEKIQ', 'redis://redis:6379/2') }
  config.options[:concurrency] = Integer(ENV.fetch('SIDEKIQ_CONCURRENCY', 5))
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV.fetch('REDIS_URL_SIDEKIQ', 'redis://redis:6379/2') }
end
