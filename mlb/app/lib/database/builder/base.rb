module Database
  module Builder
    class Base
      CRAWLER_TYPES = %i[teams games players stats weathers forecasts lineups].freeze
      ANALYZER_TYPES = %i[season_stats].freeze
      def initialize(season)
        @season = season
      end

      def query_server(model, options)
        endpoint = model_endpoint(model)
        query("#{endpoint}/#{model.downcase}", options)
      end

      def query(endpoint, options)
        query_params = options.merge(sport: 'MLB')
        query_params_string = query_params.map { |k, v| "#{k}=#{v}" }.join('&')
        url = URI.parse("http://#{endpoint}?#{query_params_string}")
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port, read_timeout: 500) do |http|
          http.request(req)
        end
        JSON.parse(res.body)
      end

      def model_endpoint(model)
        return 'crawler:5000' if CRAWLER_TYPES.include?(model)
        return 'analyzer:5000' if ANALYZER_TYPES.include?(model)
      end
    end
  end
end
