class ForecastsController < ApplicationController
  before_action :set_game

  # GET /games/:game_id/forecasts
  def index
    @forecast_queries = @game.forecast_queries

    render json: ForecastQuerySerializer.new(@forecast_queries).serializable_hash
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_game
    @game = Game.find(params[:game_id])
  end

  # Only allow a trusted parameter "white list" through.
  def stat_params
    params.permit(:game_id)
  end
end
