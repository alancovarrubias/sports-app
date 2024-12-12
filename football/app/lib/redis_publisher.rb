class RedisPublisher
  def self.publish(channel, message)
    Sidekiq.redis do |redis|
      redis.publish(channel, message.to_json)
    end
  end
end
