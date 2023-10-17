module DatabaseSeed
  class CrawlerClient
    def initialize
      @http_client = HttpClient.new
      @url_builder = UrlBuilder.new
    end

    def method_missing(method_name, *args)
      url = @url_builder.send(method_name, *args)
      @http_client.get(url)
    end

    def respond_to_missing?(method_name)
      @url_builder.respond_to?(method_name)
    end
  end
end
