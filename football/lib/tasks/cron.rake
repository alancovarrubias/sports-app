namespace :cron do
  task minute: :environment do
    date = DateTime.now.in_time_zone('Pacific Time (US & Canada)').to_date
    DatabaseSeed::DateRunner.new.run(date)
  end
  task day: :environment do
    DatabaseSeed::Runner.new(:nfl).run
    DatabaseSeed::Runner.new(:cfb).run
  end
end
