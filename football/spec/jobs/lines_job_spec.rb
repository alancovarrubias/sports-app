require 'rails_helper'

def fetch_file(filename)
  path = Rails.root.join('spec', 'fixtures', filename)
  JSON.parse(File.read(path))
end

def stub_url(url, response)
  stub_request(:get, url).to_return(status: 200, body: response.to_json)
end

RSpec.describe LinesJob, type: :job do
  subject { LinesJob }
  let(:league) { :nfl }
  let(:url_builder) { Crawler::UrlBuilder.new }
  let(:lines_url) { url_builder.lines(league: league) }
  let(:lines_data) { fetch_file('lines_data.json') }
  let(:away_team) { FactoryBot.create(:team, name: 'New Orleans Saints') }
  let(:home_team) { FactoryBot.create(:team, name: 'Indianapolis Colts') }
  let(:start_time) { DateTime.parse('12:00 AM, August 28, 2023') }
  let!(:game) { FactoryBot.create(:game, home_team: home_team, away_team: away_team, week: 6, start_time: start_time) }

  describe '#perform' do
    it 'calls lines_url' do
      stub_url(lines_url, lines_data)
      subject.perform_now(league, [], [])
      expect(a_request(:get, lines_url)).to have_been_made
    end

    it 'creates opener line if game id is passed into first array' do
      stub_url(lines_url, lines_data)
      subject.perform_now(league, [game.id], [])
      expect(game.full_game_opener.total).to eq(43.5)
      expect(game.full_game_opener.spread).to eq(1)
    end

    it 'creates closer line if game id passed into second array' do
      stub_url(lines_url, lines_data)
      subject.perform_now(league, [], [game.id])
      expect(game.full_game_closer.total).to eq(43.5)
      expect(game.full_game_closer.spread).to eq(1)
    end

    it 'does not create lines if ids are not passed in' do
      stub_url(lines_url, lines_data)
      subject.perform_now(league, [], [])
      expect(game.full_game_opener).to be_nil
      expect(game.full_game_closer).to be_nil
    end
  end
end
