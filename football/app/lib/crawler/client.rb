module Crawler
  class Client
    def initialize
      @http = Http.new
      @url_builder = UrlBuilder.new
    end

    def method_missing(method_name, *args)
      url = @url_builder.send(method_name, *args)
      @http.get(url)
    end

    def respond_to_missing?(method_name)
      @url_builder.respond_to?(method_name)
    end
  end
end
