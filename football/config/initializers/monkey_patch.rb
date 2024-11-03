class DateTime
  TIMEZONE = 'Pacific Time (US & Canada)'.freeze
  def self.today
    now.in_time_zone(TIMEZONE).to_date
  end
end
