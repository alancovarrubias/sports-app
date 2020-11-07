class BattingStatsController < ApplicationController
  before_action :set_game, except: :show
  before_action :set_stat, only: :show

  # GET /games/1/batting_stats
  def index
    @stats = @game.batting_stats

    render json: BattingStatSerializer.new(@stats).serializable_hash
  end

  # GET /batting_stats/1
  def show
    render json: BattingStatSerializer.new(@stat).serializable_hash
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_game
    @game = Game.find(params[:game_id])
  end

  def set_stat
    @stat = BattingStat.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def stat_params
    params.permit(:game_id)
  end
end
