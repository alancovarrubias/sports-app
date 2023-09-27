module DatabaseSeed
  class UrlBuilder
    GAMES_URL = 'http://crawler:5000/api/games'.freeze
    def initialize(league)
      @league = league
    end

    def schedule(year: nil, week: nil)
      year && week ? "#{GAMES_URL}?year=#{year}&week=#{week}&league=#{@league}" : "#{GAMES_URL}?league=#{@league}"
    end

    def boxscore(espn_id)
      "#{GAMES_URL}/#{espn_id}?league=#{@league}"
    end

    def playbyplay(espn_id)
      "#{GAMES_URL}/#{espn_id}/playbyplay?league=#{@league}"
    end
  end
end
