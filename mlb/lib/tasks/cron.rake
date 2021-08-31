require 'net/http'
namespace :cron do
  task hourly: :environment do
    year = Date.today.year
    Database::Builder.run(year, :Lineups)
    Database::Builder.run(year, :Forecasts)
  end
end
