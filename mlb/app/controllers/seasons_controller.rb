class SeasonsController < ApplicationController
  before_action :set_season, only: [:show]

  # GET /seasons
  def index
    @seasons = Season.all

    render json: SeasonSerializer.new(@seasons).serialized_json
  end

  # GET /seasons/1
  def show
    render json: SeasonSerializer.new(@season).serialized_json
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_season
    @season = Season.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def season_params
    params.fetch(:season, {})
  end
end
