Rails.application.config.after_initialize do
    unless ScheduleUpdateGamesJob.in_queue?
        ScheduleUpdateGamesJob.perform_later
    end
end