class PitchingStatsController < ApplicationController
  before_action :set_game, except: :show
  before_action :set_stat, only: :show

  # GET /games/:game_id/pitching_stats
  def index
    @stats = @game.pitching_stats

    render json: PitchingStatSerializer.new(@stats).serializable_hash
  end

  # GET /pitching_stats/:id
  def show
    render json: PitchingStatSerializer.new(@stat).serializable_hash
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_game
    @game = Game.find(params[:game_id])
  end

  def set_stat
    @stat = PitchingStat.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def stat_params
    params.permit(:game_id)
  end
end
