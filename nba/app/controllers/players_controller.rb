class PlayersController < ApplicationController
  before_action :set_team, only: [:index]
  before_action :set_player, only: [:show]

  # GET /teams/1/players
  def index
    @players = @team.players

    render json: PlayerSerializer.new(@players).serializable_hash
  end

  # GET /teams/1/players/1
  def show
    render json: PlayerSerializer.new(@player).serializable_hash
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_team
    @team = Team.find(params[:team_id])
  end

  def set_player
    @player = Player.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def player_params
    params.permit(:season_id, :team_id)
  end
end
