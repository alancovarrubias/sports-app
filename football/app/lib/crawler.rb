module Crawler
  CRAWLER_BASE = 'http://crawler:5000'.freeze

  module Client
    module_function

    def get(url)
      url = URI.parse(url)
      res = Net::HTTP.get_response(url)
      JSON.parse(res.body)
    end
  end

  module EndpointBuilder
    module_function

    def schedule(league:)
      "/api/games?league=#{league}"
    end

    def boxscore(espn_id:, league:)
      "/api/games/#{espn_id}?league=#{league}"
    end

    def playbyplay(espn_id:, finished:, league:)
      "/api/games/#{espn_id}/playbyplay?league=#{league}&finished=#{finished}"
    end

    def lines(league:)
      "/api/lines?league=#{league}"
    end
  end

  UrlBuilder.public_methods(false).each do |method_name|
    define_singleton_method(method_name) do |**args|
      url = CRAWLER_BASE + EndpointBuilder.public_send(method_name, **args)
      Client.get(url)
    end
  end
end
