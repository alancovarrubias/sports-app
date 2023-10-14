module DatabaseSeed
  class UrlBuilder
    GAMES_URL = 'http://crawler:5000/api/games'.freeze
    def schedule(league:)
      "#{GAMES_URL}?league=#{league}"
    end

    def boxscore(espn_id:, league:)
      "#{GAMES_URL}/#{espn_id}?league=#{league}"
    end

    def playbyplay(espn_id:, finished:, league:)
      "#{GAMES_URL}/#{espn_id}/playbyplay?league=#{league}&finished=#{finished}"
    end
  end
end
