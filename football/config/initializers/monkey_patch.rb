class String
end

class DateTime
  def pacific_time_date
    in_time_zone('Pacific Time (US & Canada)').to_date
  end
end
