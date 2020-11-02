class StatsController < ApplicationController
  before_action :set_game, except: [:show]
  before_action :set_stat, only: [:show]

  # GET /games/1/stats
  def index
    @stats = @game.stats

    render json: StatSerializer.new(@stats).serialized_json
  end

  # GET /games/1/stats/1
  def show
    render json: StatSerializer.new(@stat).serialized_json
  end

  # GET /games/1/away_team_stat
  def away_team_stat
    render json: StatSerializer.new(@game.away_team_stat).serialized_json
  end

  # GET /games/1/home_team_stat
  def home_team_stat
    render json: StatSerializer.new(@game.home_team_stat).serialized_json
  end

  # GET /games/1/home_player_stats
  def away_player_stats
    render json: StatSerializer.new(@game.away_player_stats).serialized_json
  end

  # GET /games/1/home_player_stats
  def home_player_stats
    render json: StatSerializer.new(@game.home_player_stats).serialized_json
  end

  private

  # Use callbacks to share common setup or constraints between actions.

  def set_game
    @game = Game.find(params[:game_id])
  end

  def set_stat
    @stat = Stat.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def stat_params
    params.permit(:game_id)
  end
end
