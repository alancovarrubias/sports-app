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
    it { should have_many(:team_stats).conditions(model_type: 'Team') }
    it { should have_many(:player_stats).conditions(model_type: 'Player') }
    it { should have_many(:teams).through(:team_stats).source(:model) }
    it { should have_many(:players).through(:player_stats).source(:model) }
    it { should have_many(:lines) }
    it { should have_many(:preds) }
  end

  describe 'methods' do
    before do
      @game = FactoryBot.create(:game, :complete)
      # Build separate game to test for isolation
      FactoryBot.create(:game, :complete)
    end
    %i[away home].each do |side|
      describe "#{side}_players" do
        it "retrieves a list of the game's #{side} players" do
          players = Player.where(team: @game.send("#{side}_team"))
          expect(@game.send("#{side}_players").length).to eq(players.length)
        end
      end

      describe "#{side}_team_stats" do
        it "retrieves the stat of the game's #{side} team" do
          team_stats = TeamStat.where(game: @game, model: @game.send("#{side}_team"))
          expect(@game.send("#{side}_team_stats").length).to eq(team_stats.length)
        end
      end

      describe "#{side}_player_stats" do
        it "retrieves a list of stats of the game's #{side} players" do
          player_stats = PlayerStat.where(game: @game, model: @game.send("#{side}_players"))
          expect(@game.send("#{side}_player_stats").length).to eq(player_stats.length)
        end
      end
    end
  end
end
