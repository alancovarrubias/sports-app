class KickedUpdaterJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    game = Game.find(game_id)
    game.update(kicked: kicked(game))
  end

  def kicked(game)
    data = playbyplay(game)
    case data['received']
    when game.home_team.name
      :away
    when game.away_team.name
      :home
    end
  end

  def playbyplay(game)
    @crawler_client.playbyplay(
      espn_id: game.espn_id,
      finished: game.finished? ? 1 : 0,
      league: game.season.league
    )
  end
end
