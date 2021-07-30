class ForecastsController < ApplicationController
  before_action :set_game, except: :show

  # GET /games/:game_id/pitching_stats
  def index
    @forecasts = @game.forecasts

    render json: ForecastSerializer.new(@forecasts).serializable_hash
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
