class GamesController < ApplicationController
  before_action :set_games, only: :index
  before_action :set_game, except: :index

  # GET /seasons/:season_id/games
  def index
    render json: GameSerializer.new(@games, { params: { team: true } }).serializable_hash
  end

  # GET /games/:id
  def show
    render json: GameSerializer.new(@game, {params: {team: true, player: true}}).serializable_hash
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
