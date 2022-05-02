require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:game)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:away_team).class_name('Team') }
    it { should belong_to(:home_team).class_name('Team') }
    it { should have_many(:pitching_stats) }
    it { should have_many(:batting_stats) }
  end

  describe 'class methods' do
    describe '#on_date' do
      it 'returns games on the date passed' do
        game = FactoryBot.create(:game, datetime: DateTime.now)
        expect(Game.on_date(Date.today)).to include(game)
      end

      it 'does not return games days after the date passed' do
        game = FactoryBot.create(:game, datetime: DateTime.now + 1.day)
        expect(Game.on_date(Date.today)).not_to include(game)
      end

      it 'does not return games days before the date passed' do
        game = FactoryBot.create(:game, datetime: DateTime.now - 1.day)
        expect(Game.on_date(Date.today)).not_to include(game)
      end
    end
  end

  describe 'instance methods' do
    before do
      @game = FactoryBot.create(:game, :with_stats)
      # Build separate game and stats to test for isolation
      FactoryBot.create(:game, :with_stats)
    end

    describe '#teams' do
      it 'retrieves the teams from a game' do
        expect(@game.teams.length).to eq(2)
      end
      it 'has the away team as its first element' do
        expect(@game.teams.first.id).to eq(@game.away_team_id)
      end
      it 'has the home team as its last element' do
        expect(@game.teams.last.id).to eq(@game.home_team_id)
      end
    end

    it '#pitchers retrieves the pitchers from a game' do
      pitchers = PitchingStat.where(interval: @game, model_type: 'Player')
      expect(@game.pitchers.length).to eq(pitchers.length)
    end

    it '#batters retrieves the batters from a game' do
      batters = BattingStat.where(interval: @game, model_type: 'Player')
      expect(@game.batters.length).to eq(batters.length)
    end

    it '#players retrieves the players from a game' do
      player_ids = (@game.batters + @game.pitchers).uniq
      expect(@game.players.length).to eq(player_ids.length)
    end

    it "#team_pitching_stats retrieves the pitching stat of the game's team" do
      team_stats = PitchingStat.where(interval: @game, model_type: 'Team')
      expect(@game.team_pitching_stats.length).to eq(team_stats.length)
    end

    it "#team_batting_stats retrieves the batting stat of the game's team" do
      team_stats = BattingStat.where(interval: @game, model_type: 'Team')
      expect(@game.team_batting_stats.length).to eq(team_stats.length)
    end

    it "#player_pitching_stats retrieves a list of pitching stats of the game's players" do
      player_stats = PitchingStat.where(interval: @game, model_type: 'Player')
      expect(@game.player_pitching_stats.length).to eq(player_stats.length)
    end

    it "#player_batting_stats retrieves a list of batting stats of the game's players" do
      player_stats = BattingStat.where(interval: @game, model_type: 'Player')
      expect(@game.player_batting_stats.length).to eq(player_stats.length)
    end
  end
end
