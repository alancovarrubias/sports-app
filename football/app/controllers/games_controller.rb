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
    games = Game.includes(:away_team, :home_team, :kicking_team, :stats, :lines)
    return games unless params[:date].present?

    games.where(date: params[:date]).order(start_time: :asc)
  end

  def set_game
    @game = Game.find(params[:id])
  end
end
