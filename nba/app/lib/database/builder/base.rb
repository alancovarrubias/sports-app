module Database
  module Builder
    class Base
      CRAWLER_TYPES = %i[Team Game Player Stat Line].freeze
      ANALYZER_TYPES = %i[Pred].freeze
      def initialize(season)
        @season = season
      end

      def query_server(model, options)
        endpoint = model_endpoint(model)
        query("#{endpoint}/#{model.downcase}s", options)
      end

      def query(endpoint, options)
        params = options.merge(sport: 'NBA')
        query_params = params.map { |k, v| "#{k}=#{v}" }.join('&')
        url = URI.parse("http://#{endpoint}?#{query_params}")
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
