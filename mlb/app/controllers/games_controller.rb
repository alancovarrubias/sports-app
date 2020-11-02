class GamesController < ApplicationController
  before_action :set_games, only: :index
  before_action :set_game, except: :index

  # GET /seasons/:season_id/games
  def index
    render json: GameSerializer.new(@games).serialized_json
  end

  # GET /games/:id
  def show
    render json: GameSerializer.new(@game).serialized_json
  end

  %i[away home].each do |side|
    define_method("#{side}_team") do
      team = @game.send("#{side}_team")
      render json: {
        data: {
          model: TeamSerializer.new(team),
          pitching: PitchingStatSerializer.new(@game.send("#{side}_team_pitching_stats").first),
          batting: BattingStatSerializer.new(@game.send("#{side}_team_batting_stats").first)
        }
      }
    end
    define_method("#{side}_players") do
      render json: {
        data: @game.send("#{side}_players").map do |player|
          batting = BattingStat.find_by(model: player, model_type: :Player, game: @game)
          pitching = PitchingStat.find_by(model: player, model_type: :Player, game: @game)
          {
            model: PlayerSerializer.new(player),
            batting: BattingStatSerializer.new(batting),
            pitching: PitchingStatSerializer.new(pitching)
          }
        end
      }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_games
    season = Season.find(params[:season_id])
    @games = season.games.limit(params[:limit]).offset(params[:offset])
  end

  def set_game
    @game = Game.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def game_params
    params.permit(:season_id)
  end
end
