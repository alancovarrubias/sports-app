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

  describe '#full_game_stat' do
    let!(:game) { FactoryBot.create(:game) }
    let!(:full_game_stat) { FactoryBot.create(:stat, interval: 'Full Game', game: game) }
    let!(:first_half_stat) { FactoryBot.create(:stat, interval: 'First Half', game: game) }
    it { expect(game.full_game_stat).to eq(full_game_stat) }
    it { expect(game.first_half_stat).to eq(first_half_stat) }
  end
end
