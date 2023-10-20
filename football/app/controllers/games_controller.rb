class GamesController < ApplicationController
  before_action :set_games, only: [:index]
  before_action :set_game, only: [:show]

  # GET /games
  def index
    render json: GameSerializer.new(@games).serializable_hash
  end

  # GET /games/1
  def show
    render json: GameSerializer.new(@game).serializable_hash
  end

  def set_games
    @games = games
  end

  def games
    if params[:date].present?
      Game.with_stats.on_date(params[:date]).earliest_start_time_first
    else
      Game.with_stats
    end
  end

  def set_game
    @game = Game.find(params[:id])
  end
end
