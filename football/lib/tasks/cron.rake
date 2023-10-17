namespace :cron do
  task min: :environment do
    date = DateTime.now.pacific_time_date
    DatabaseSeed::DateRunner.new.run(date)
  end
  task day: :environment do
    DatabaseSeed::Runner.new.run(:nfl)
    DatabaseSeed::Runner.new.run(:cfb)
  end
end
