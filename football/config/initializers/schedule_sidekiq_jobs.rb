Rails.application.config.after_initialize do
  ScheduleUpdateGamesJob.perform_later
  ScheduleLinesJob.perform_later
  CreateGamesJob.perform_later
end
