namespace :backfill do
  desc 'Seed the first Backfill Task for every season -- NbaSyncTeamsJob fans out the rest of its own chain'
  task seed: :environment do
    (2016..2025).each do |year|
      NbaSyncTeamsJob.set(queue: :backfill).perform_later(year)
    end
  end
end
