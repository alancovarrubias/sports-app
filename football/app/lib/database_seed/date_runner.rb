module DatabaseSeed
  class DateRunner
    def run(date)
      Game.includes(:season).where(date: date).order(updated_at: :asc).each do |game|
        GameUpdaterJob.perform_later(game.espn_id, game.season_id)
      end
    end
  end
end
