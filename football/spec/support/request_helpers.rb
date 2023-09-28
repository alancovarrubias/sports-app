# spec/support/request_helpers.rb
module RequestHelpers
  def body
    JSON.parse(response.body)
  end

end
