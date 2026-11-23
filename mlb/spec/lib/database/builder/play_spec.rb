require 'rails_helper'

RSpec.describe Database::Builder::Play do
  let!(:season) { FactoryBot.create(:season, year: 2023) }
  let!(:home_team) { FactoryBot.create(:team, season: season, abbr: 'NYY') }
  let!(:away_team) { FactoryBot.create(:team, season: season, abbr: 'BOS') }
  let!(:game) { FactoryBot.create(:game, season: season, home_team: home_team, away_team: away_team) }

  describe '#on_mound' do
    it "resolves to the home team when the away team is batting (home team's pitcher is on the mound)" do
      play = described_class.new({ text: '', pitcher: '', batter: '', at_bat: 'BOS' }, game)
      expect(play.on_mound).to eq('NYY')
    end

    it "resolves to the away team when the home team is batting (away team's pitcher is on the mound)" do
      play = described_class.new({ text: '', pitcher: '', batter: '', at_bat: 'NYY' }, game)
      expect(play.on_mound).to eq('BOS')
    end
  end
end
