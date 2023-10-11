require 'rails_helper'

RSpec.describe DatabaseSeed::UrlBuilder do
  subject { DatabaseSeed::UrlBuilder.new(league) }
  let(:league) { :nfl }
  let(:year) { 2023 }
  let(:week) { 1 }
  let(:espn_id) { 401_547_658 }
  let(:finished) { 0 }

  describe '#schedule' do
    it 'with options' do
      expect(subject.schedule(week: week, year: year)).to eq("http://crawler:5000/api/games?year=#{year}&week=#{week}&league=#{league}")
    end

    it 'with league override' do
      expect(subject.schedule(week: week, year: year, league: :cfb81)).to eq("http://crawler:5000/api/games?year=#{year}&week=#{week}&league=cfb81")
    end

    it 'without options' do
      expect(subject.schedule).to eq("http://crawler:5000/api/games?league=#{league}")
    end
  end

  it '#boxscore' do
    expect(subject.boxscore(espn_id)).to eq("http://crawler:5000/api/games/#{espn_id}?league=#{league}")
  end

  it '#playbyplay' do
    expect(subject.playbyplay(espn_id, finished)).to eq("http://crawler:5000/api/games/#{espn_id}/playbyplay?league=#{league}&finished=#{finished}")
  end
end
