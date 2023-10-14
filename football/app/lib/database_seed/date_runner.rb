module DatabaseSeed
  class DateRunner
    def run(date)
      Game.includes(:season).where(date: date).order(updated_at: :asc).each do |game|
        GameUpdater.new(game, game.season).run
      end
    end
  end
end
