class GamesController < ApplicationController
  before_action :set_games, only: [:index]
  before_action :set_game, only: [:show]
  before_action :set_serializer_params

  # GET /seasons/1/games
  def index
    render json: GameSerializer.new(@games, params: @serializer_params).serializable_hash
  end

  # GET /games/1
  def show
    render json: GameSerializer.new(@game, params: @serializer_params).serializable_hash
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_games
    season = Season.find(params[:season_id])
    @games = season.games.limit(params[:limit]).offset(params[:offset])
    @games = set_includes(@games)
  end

  def set_game
    game_model = set_includes(Game)
    @game = game_model.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def game_params
    params.permit(:season_id)
  end

  def set_serializer_params
    @serializer_params = { team: params[:team] == '1', player: params[:player] == '1' }
  end

  def set_includes(game_model)
    game_model = game_model.with_team_stats if params[:team] == '1'
    game_model = game_model.with_player_stats if params[:player] == '1'
    return game_model
  end
end
