require 'net/http'

module Crawler
  CRAWLER_BASE = 'http://crawler:5000'.freeze

  module Client
    module_function

    def get(url)
      url = URI.parse(url)
      res = Net::HTTP.get_response(url)
      unless res.is_a?(Net::HTTPSuccess)
        raise "Crawler request to #{url} failed (#{res.code}): #{res.body.to_s.truncate(1000)}"
      end

      JSON.parse(res.body).deep_symbolize_keys
    end
  end

  module EndpointBuilder
    module_function

    def teams(season:)
      "/api/nba/teams?season=#{season}"
    end

    def players(season:, team:)
      "/api/nba/teams/#{team}/players?season=#{season}"
    end

    def games(season:)
      "/api/nba/games?season=#{season}"
    end

    def stats(game_url:, away_team:, home_team:)
      "/api/nba/games/#{game_url}/stats?away_team=#{away_team}&home_team=#{home_team}"
    end
  end

  EndpointBuilder.public_methods(false).each do |method_name|
    define_singleton_method(method_name) do |**args|
      url = CRAWLER_BASE + EndpointBuilder.public_send(method_name, **args)
      Client.get(url)
    end
  end
end
