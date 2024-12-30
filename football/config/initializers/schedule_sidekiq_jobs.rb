Rails.application.config.after_initialize do
  ScheduleUpdateGamesJob.perform_later
  LinesUpdaterJob.perform_later
  CreateGamesJob.perform_later
end
