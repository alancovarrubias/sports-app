module Database
  module Builder
    class Base
      def initialize(season)
        @season = season
      end

      def query_server(model, options)
        retries ||= 0
        query_params = options.merge(sport: 'NBA')
        query_params_string = query_params.map { |k, v| "#{k}=#{v}" }.join('&')
        url = URI.parse("http://crawler:5000/#{model}?#{query_params_string}")
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port, read_timeout: 500) do |http|
          http.request(req)
        end
        JSON.parse(res.body)
      rescue StandardError
        retry if (retries += 1) < 3
      end
    end
  end
end
