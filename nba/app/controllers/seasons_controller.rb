class SeasonsController < ApplicationController
  before_action :set_season, except: [:index]

  # GET /seasons
  def index
    @seasons = Season.all

    render json: SeasonSerializer.new(@seasons).serializable_hash
  end

  # GET /seasons/1
  def show
    render json: SeasonSerializer.new(@season).serializable_hash
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
