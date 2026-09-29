require 'rails_helper'

RSpec.describe Crawler::Client do
  describe '.get' do
    let(:url) { 'http://crawler:5000/api/football/games/12345/gamecast?league=nfl' }

    it 'parses a successful JSON response' do
      stub_request(:get, url).to_return(status: 200, body: { away_team: { name: 'x' } }.to_json)

      expect(described_class.get(url)).to eq(away_team: { name: 'x' })
    end

    it 'raises a descriptive error when the crawler responds with a non-success status' do
      stub_request(:get, url).to_return(status: 502, body: { error: 'aborted by navigation' }.to_json)

      expect { described_class.get(url) }.to raise_error(/failed \(502\)/)
    end
  end
end
