class GamesController < ApplicationController
  QUERY_KEYS = %w[season_id date]
  before_action :set_query_params
  before_action :set_model_includes
  before_action :set_games, only: [:index]
  before_action :set_game, only: [:show]

  # GET /seasons/:season_id/games
  def index
    render json: GameSerializer.new(@games, params: @query_params).serializable_hash
  end

  # GET /games/:id
  def show
    render json: GameSerializer.new(@game, params: @query_params).serializable_hash
  end

  private

  def set_query_params
    @query_params = {
      team: params[:team] == '1',
      player: params[:player] == '1',
      line: params[:line] == '1',
      pred: params[:pred] == '1'
    }
  end

  def set_model_includes
    @model = Game
    @model = @model.with_team_stats if @query_params[:team]
    @model = @model.with_player_stats if @query_params[:player]
    @model = @model.with_lines if @query_params[:line]
    @model = @model.with_preds if @query_params[:pred]
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_games
    puts params
    if params[:season_id]
      @games = @model.where(season_id: params[:season_id]).limit(params[:limit]).offset(params[:offset])
    elsif params[:date]
      @games = @model.where(date: params[:date]).limit(params[:limit]).offset(params[:offset])
    end
  end

  def set_game
    @game = Game.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def game_params
    params.permit(:season_id, :date)
  end
end
