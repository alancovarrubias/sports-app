class GamesController < ApplicationController
  before_action :set_games, only: [:index]
  before_action :set_game, only: [:show]

  # GET /seasons/1/games
  def index
    render json: GameSerializer.new(@games).serializable_hash
  end

  # GET /games/1
  def show
    render json: GameSerializer.new(@game).serializable_hash
  end

  def set_games
    @games = if params[:date].present?
               Game.includes(:away_team, :home_team).where(date: params[:date])
             else
               Game.includes(:away_team, :home_team)
             end
  end

  def set_game
    @game = Game.find(params[:id])
  end
end
