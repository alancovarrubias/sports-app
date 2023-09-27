require 'net/http'
module DatabaseSeed
  class HttpClient
    def get(url)
      url = URI.parse(url)
      res = Net::HTTP.get_response(url)
      JSON.parse(res.body)
    end
  end
end
