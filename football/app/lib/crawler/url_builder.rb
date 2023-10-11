module Crawler
  class UrlBuilder
    CRAWLER_URL = 'http://crawler:5000/api'.freeze
    def schedule(league:)
      "#{CRAWLER_URL}/games?league=#{league}"
    end

    def boxscore(espn_id:, league:)
      "#{CRAWLER_URL}/games/#{espn_id}?league=#{league}"
    end

    def playbyplay(espn_id:, finished:, league:)
      "#{CRAWLER_URL}/games/#{espn_id}/playbyplay?league=#{league}&finished=#{finished}"
    end

    def lines(league:)
      "#{CRAWLER_URL}/lines?league=#{league}"
    end
  end
end
