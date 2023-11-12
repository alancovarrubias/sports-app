require 'rails_helper'

class GameMock
  attr_reader :game

  def initialize
    @away_team = FactoryBot.create(:team)
    @home_team = FactoryBot.create(:team)
    @game = FactoryBot.create(:game, away_team: @away_team, home_team: @home_team)
    @away_full_game_stat = FactoryBot.create(:stat, game: game, team: @away_team, interval: :full_game)
    @home_full_game_stat = FactoryBot.create(:stat, game: game, team: @home_team, interval: :full_game)
    @away_first_half_stat = FactoryBot.create(:stat, game: game, team: @away_team, interval: :first_half)
    @home_first_half_stat = FactoryBot.create(:stat, game: game, team: @home_team, interval: :first_half)
    @full_game_opener = FactoryBot.create(:line, game: game, interval: :full_game, book: :opener)
    @full_game_closer = FactoryBot.create(:line, game: game, interval: :full_game, book: :closer)
  end

  def serialize
    JSON.parse(GameSerializer.new(@game).to_json)
  end

  def build_team_hash(team)
    { 'id' => team.id,
      'name' => team.name,
      'abbr' => team.abbr,
      'season_id' => team.season.id }
  end

  def build_stat_hash(stat)
    {
      'data' => {
        'id' => stat.id.to_s,
        'type' => 'stat',
        'attributes' => {
          'id' => stat.id,
          'c_att' => stat.c_att,
          'passing_yards' => stat.passing_yards,
          'carries' => stat.carries,
          'rushing_yards' => stat.rushing_yards,
          'longest_rush' => stat.longest_rush,
          'longest_pass' => stat.longest_pass,
          'score' => stat.score,
          'total_plays' => stat.total_plays,
          'total_yards' => stat.total_yards,
          'ave_per_car' => stat.ave_per_car,
          'ave_per_att' => stat.ave_per_att,
          'ave_per_play' => stat.ave_per_play,
          'typa' => stat.typa,
          'typai' => stat.typai,
          'typc' => stat.typc,
          'typp' => stat.typp
        }
      }
    }
  end

  def build_game_hash
    {
      'data' => {
        'id' => @game.id.to_s,
        'type' => 'game',
        'attributes' => {
          'id' => @game.id,
          'date' => @game.date.to_s,
          'start_time' => @game.start_time.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
          'game_clock' => @game.game_clock,
          'kicked' => @game.kicked,
          'away_team' => build_team_hash(@away_team),
          'home_team' => build_team_hash(@home_team),
          'away_full_game_stat' => build_stat_hash(@away_full_game_stat),
          'home_full_game_stat' => build_stat_hash(@home_full_game_stat),
          'away_first_half_stat' => build_stat_hash(@away_first_half_stat),
          'home_first_half_stat' => build_stat_hash(@home_first_half_stat),
          'full_game_opener' => "#{@home_team.name} #{@full_game_opener.spread} and #{@full_game_opener.total}",
          'full_game_closer' => "#{@home_team.name} #{@full_game_closer.spread} and #{@full_game_closer.total}"
        }
      }
    }
  end
end

RSpec.describe 'GameSerializer' do
  before do
    @game_mock = GameMock.new
    @serialized = @game_mock.serialize['data']['attributes']
    @attributes = @game_mock.build_game_hash['data']['attributes']
  end

  it 'game attributes' do
    expect(@serialized).to eq(@attributes)
  end

  it 'stat attributes' do
    expect(@serialized['away_full_game_stat']).to eq(@attributes['away_full_game_stat'])
  end

  it 'line attributes' do
    expect(@serialized['full_game_line']).to eq(@attributes['full_game_line'])
  end
end
