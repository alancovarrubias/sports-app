class KickedUpdaterJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    @game = Game.find(game_id)
    @game.update(kicked: kicked)
  end

  def kicked
    case playbyplay['received']
    when @game.home_team.name
      :away
    when @game.away_team.name
      :home
    end
  end

  def playbyplay
    @crawler_client.playbyplay(
      espn_id: @game.espn_id,
      finished: @game.finished? ? 1 : 0,
      league: @game.season.league
    )
  end
end
