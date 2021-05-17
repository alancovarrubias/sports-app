require 'rails_helper'

RSpec.describe 'Games', type: :request do
  context 'resource routes' do
    describe 'GET /seasons/:season_id/games' do
      before do
        @season = FactoryBot.create(:season, :with_games)
        # Build separate season to test isolation
        FactoryBot.create(:season, :with_games)
      end
      it 'retrieves list of games from a season' do
        get season_games_path(@season)
        expect(response).to have_http_status(200)
        expect(data.length).to eq(@season.games.length)
      end
      it 'limits the items returned if limit is passed in' do
        get season_games_path(@season, { limit: 5 })
        expect(data.length).to eq(5)
      end
      it 'offsets the items returned if offset is passed in' do
        get season_games_path(@season, { offset: 5 })
        game_ids = data.map { |game| game['id'].to_i }
        expect(game_ids).to eq(@season.games.offset(5).map(&:id))
      end
    end

    describe 'GET /games/:id' do
      before do
        @game = FactoryBot.create(:game)
      end
      it 'retrieves specific game from a season' do
        get game_path(@game)
        expect(response).to have_http_status(200)
        expect(data['id'].to_i).to eq(@game.id)
      end
    end

    describe 'GET /games' do
      before do
        @game = FactoryBot.create(:game)
      end
      it "retrieves games from today's date" do
        get games_path({ date: Date.today })
        expect(response).to have_http_status(200)
        expect(data.length).to eq(1)
      end
    end
  end
end
