require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:game)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:away_team).class_name('Team') }
    it { should belong_to(:home_team).class_name('Team') }
    it { should have_many(:stats) }
  end

  describe 'stats filter methods' do
    let!(:away_team) { FactoryBot.create(:team, name: 'Away Team') }
    let!(:home_team) { FactoryBot.create(:team, name: 'Home Team') }
    let!(:game) { FactoryBot.create(:game, away_team: away_team, home_team: home_team) }
    let!(:away_full_game_stat) { FactoryBot.create(:stat, interval: 'Full Game', game: game, team: away_team) }
    let!(:home_full_game_stat) { FactoryBot.create(:stat, interval: 'Full Game', game: game, team: home_team) }
    let!(:away_first_half_stat) { FactoryBot.create(:stat, interval: 'First Half', game: game, team: away_team) }
    let!(:home_first_half_stat) { FactoryBot.create(:stat, interval: 'First Half', game: game, team: home_team) }
    it { expect(game.away_full_game_stat).to eq(away_full_game_stat) }
    it { expect(game.home_full_game_stat).to eq(home_full_game_stat) }
    it { expect(game.away_first_half_stat).to eq(away_first_half_stat) }
    it { expect(game.home_first_half_stat).to eq(home_first_half_stat) }
  end
end
