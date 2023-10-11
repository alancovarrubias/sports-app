require 'rails_helper'

def fetch_file(filename)
  path = Rails.root.join('spec', 'fixtures', filename)
  JSON.parse(File.read(path))
end

def stub_url(url, response)
  stub_request(:get, url).to_return(status: 200, body: response.to_json)
end

RSpec.describe LinesJob, type: :job do
  let(:league) { :nfl }
  let(:url_builder) { Crawler::UrlBuilder.new }
  let(:lines_url) { url_builder.lines(league: league) }
  let(:lines_data) { fetch_file('lines_data.json') }

  def perform
    stub_url(lines_url, lines_data)
    LinesJob.perform_now(league)
  end
  describe '#perform' do
    it 'calls lines_url' do
      perform
      expect(a_request(:get, lines_url)).to have_been_made
    end

    it 'creates line for game' do
      away_team = FactoryBot.create(:team, name: 'New Orleans Saints')
      home_team = FactoryBot.create(:team, name: 'Indianapolis Colts')
      game = FactoryBot.create(:game, home_team: home_team, away_team: away_team, week: 6)
      perform
      expect(game.full_game_line.total).to eq(43.5)
      expect(game.full_game_line.spread).to eq(1)
    end
  end
end
