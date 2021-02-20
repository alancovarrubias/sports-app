class GamesController < ApplicationController
  before_action :set_query_params
  before_action :set_model_includes
  before_action :set_games, only: [:index]
  before_action :set_game, only: [:show]

  # GET /seasons/1/games
  def index
    render json: GameSerializer.new(@games, params: @query_params).serializable_hash
  end

  # GET /games/1
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

  def set_games
    @games = @model.where(season_id: params[:season_id]).limit(params[:limit]).offset(params[:offset])
  end

  def set_game
    @game = @model.find(params[:id])
  end

  def game_params
    params.permit(:season_id)
  end
end
