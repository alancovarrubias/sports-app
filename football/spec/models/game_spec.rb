require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:game)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:away_team).class_name('Team') }
    it { should belong_to(:home_team).class_name('Team') }
    it { should have_many(:stats).dependent(:destroy) }
    it { should have_many(:lines).dependent(:destroy) }
  end

  describe 'enum' do
    it { should define_enum_for(:kicked).with_values(%i[away home]) }
    it { should allow_values(:away, :home).for(:kicked) }
  end

  describe 'scopes' do
    let(:start_time) { DateTime.parse('12:00 AM, August 28, 2023') }
    it '#started' do
      allow(DateTime).to receive(:now).and_return(start_time)
      game = FactoryBot.create(:game, start_time: start_time)
      expect(Game.started).to include(game)
    end

    it '#not_started' do
      allow(DateTime).to receive(:now).and_return(start_time)
      game = FactoryBot.create(:game, start_time: start_time)
      expect(Game.not_started).not_to include(game)
    end

    it '#not_started', :focus do
      allow(DateTime).to receive(:now).and_return(start_time - 1.minute)
      game = FactoryBot.create(:game, start_time: start_time)
      expect(Game.not_started).to include(game)
    end
  end

  describe 'stats filter methods' do
    let!(:away_team) { FactoryBot.create(:team, name: 'Away Team') }
    let!(:home_team) { FactoryBot.create(:team, name: 'Home Team') }
    let!(:game) { FactoryBot.create(:game, away_team: away_team, home_team: home_team) }
    let!(:away_full_game_stat) { FactoryBot.create(:stat, interval: :full_game, game: game, team: away_team) }
    let!(:home_full_game_stat) { FactoryBot.create(:stat, interval: :full_game, game: game, team: home_team) }
    let!(:away_first_half_stat) { FactoryBot.create(:stat, interval: :first_half, game: game, team: away_team) }
    let!(:home_first_half_stat) { FactoryBot.create(:stat, interval: :first_half, game: game, team: home_team) }
    it { expect(game.away_full_game_stat).to eq(away_full_game_stat) }
    it { expect(game.home_full_game_stat).to eq(home_full_game_stat) }
    it { expect(game.away_first_half_stat).to eq(away_first_half_stat) }
    it { expect(game.home_first_half_stat).to eq(home_first_half_stat) }
  end

  describe 'lines filter methods' do
    let!(:game) { FactoryBot.create(:game) }
    let!(:full_game_opener) { FactoryBot.create(:line, interval: :full_game, book: :opener, game: game) }
    let!(:full_game_closer) { FactoryBot.create(:line, interval: :full_game, book: :closer, game: game) }
    it { expect(game.full_game_opener).to eq(full_game_opener) }
    it { expect(game.full_game_closer).to eq(full_game_closer) }
  end
end
