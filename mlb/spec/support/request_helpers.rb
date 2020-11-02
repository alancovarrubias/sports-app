# spec/support/request_helpers.rb
module Requests
  module JsonHelpers
    def data
      JSON.parse(response.body)['data']
    end
  end
end
