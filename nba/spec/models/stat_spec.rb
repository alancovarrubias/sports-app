require 'rails_helper'

RSpec.describe Stat, type: :model do
  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:game) }
    it { should belong_to(:model) }
  end

  describe 'team_stats' do
    it 'includes stats associated with teams' do
      team_stat = FactoryBot.create(:team_stat)
      expect(Stat.team_stats).to include(team_stat)
    end

    it 'excludes stats associated with players' do
      player_stat = FactoryBot.create(:player_stat)
      expect(Stat.team_stats).not_to include(player_stat)
    end
  end

  describe 'player_stats' do
    it 'includes stats associated with players' do
      player_stat = FactoryBot.create(:player_stat)
      expect(Stat.player_stats).to include(player_stat)
    end

    it 'excludes stats associated with teams' do
      team_stat = FactoryBot.create(:team_stat)
      expect(Stat.player_stats).not_to include(team_stat)
    end
  end
end
