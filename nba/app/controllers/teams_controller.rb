class TeamsController < ApplicationController
  before_action :set_season, only: [:index]
  before_action :set_team, only: [:show]

  # GET /seasons/1/teams
  def index
    @teams = @season.teams

    render json: TeamSerializer.new(@teams).serialized_json
  end

  # GET /teams/1
  def show
    render json: TeamSerializer.new(@team).serialized_json
  end

  # GET /games/1/away_team
  def away_team
    render json: TeamSerializer.new(@team).serialized_json
  end

  # GET /games/1/home_team
  def home_team
    render json: TeamSerializer.new(@team).serialized_json
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_season
    @season = Season.find(params[:season_id])
  end

  def set_team
    @team = Team.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def team_params
    params.permit(:season_id)
  end
end
