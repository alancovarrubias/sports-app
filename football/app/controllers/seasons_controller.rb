class SeasonsController < ApplicationController
  # GET /seasons
  def index
    @seasons = Season.all

    render json: SeasonSerializer.new(@seasons).serializable_hash
  end
end
