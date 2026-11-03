namespace :backfill do
  desc 'Seed the first Backfill Task for every (league, year) -- week=1 discovers each season\'s week count and enqueues the rest itself'
  task seed: :environment do
    (2016..2025).each do |year|
      Constants::LEAGUES.each do |league|
        BackfillFootballWeekJob.set(queue: :backfill).perform_later(league, year, 1)
      end
    end
  end
end
