require 'rails_helper'

RSpec.describe Crawler::UrlBuilder do
  subject { Crawler::UrlBuilder.new }
  let(:league) { :nfl }
  let(:year) { 2023 }
  let(:week) { 1 }
  let(:espn_id) { 401_547_658 }
  let(:finished) { 0 }

  describe '#schedule' do
    it 'without options' do
      expect(subject.schedule(league: league)).to eq("http://crawler:5000/api/games?league=#{league}")
    end
  end

  it '#boxscore' do
    expect(subject.boxscore(espn_id: espn_id, league: league)).to eq("http://crawler:5000/api/games/#{espn_id}?league=#{league}")
  end

  it '#playbyplay' do
    expect(subject.playbyplay(espn_id: espn_id, finished: finished, league: league)).to eq("http://crawler:5000/api/games/#{espn_id}/playbyplay?league=#{league}&finished=#{finished}")
  end

  it '#lines' do
    expect(subject.lines(league: league)).to eq("http://crawler:5000/api/lines?league=#{league}")
  end
end
