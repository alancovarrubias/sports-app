require 'rails_helper'

def fetch_file(filename)
  path = Rails.root.join('spec', 'fixtures', filename)
  JSON.parse(File.read(path))
end

def stub_url(url, response)
  stub_request(:get, url).to_return(status: 200, body: response.to_json)
end

RSpec.describe ScheduleLinesJob, type: :job do
  subject { ScheduleLinesJob }
  let!(:nfl_season) { FactoryBot.create(:season, league: :nfl) }
  let!(:cfb_season) { FactoryBot.create(:season, league: :cfb) }
  let(:url_builder) { Crawler::UrlBuilder.new }
  let(:lines_url) { url_builder.lines(league: :nfl) }
  let(:lines_data) { fetch_file('lines_data.json') }
  let(:start_time) { DateTime.parse('12:00 AM, August 28, 2023') }
  before do
    stub_url(lines_url, lines_data)
  end

  def create_game(league, book: nil)
    season = Season.find_by(league: league)
    game = FactoryBot.create(
      :game,
      season: season,
      week: 6,
      start_time: start_time
    )
    FactoryBot.create(:line, game: game, book: book) if book
    game
  end

  describe '#perform', :focus do
    it 'does not enqueue job if no games' do
      expect do
        subject.perform_now
      end.not_to have_enqueued_job(LinesJob)
    end
    it 'enqueues two jobs with games from different leagues' do
      allow(DateTime).to receive(:now).and_return(start_time)
      nfl_game = create_game('nfl')
      cfb_game = create_game('cfb')
      expect do
        subject.perform_now
      end.to have_enqueued_job(LinesJob).with('nfl', [], [nfl_game.id])
                                        .and have_enqueued_job(LinesJob).with('cfb', [], [cfb_game.id])
    end
    describe 'opener game ids' do
      let(:league) { 'nfl' }
      it 'enqueues not started game without openers' do
        allow(DateTime).to receive(:now).and_return(start_time - 1.minute)
        game = create_game(league)
        expect do
          subject.perform_now
        end.to have_enqueued_job(LinesJob).with(league, [game.id], [])
      end

      it 'does not enqueue game with openers' do
        game = create_game(league, book: 'opener')
        expect do
          subject.perform_now
        end.not_to have_enqueued_job(LinesJob).with(league, [game.id], [])
      end

      it 'does not enqueue started games without openers' do
        allow(DateTime).to receive(:now).and_return(start_time + 1.minute)
        game = create_game(league)
        expect do
          subject.perform_now
        end.not_to have_enqueued_job(LinesJob).with(league, [game.id], [])
      end
    end
    describe 'closer lines' do
      let(:league) { 'nfl' }
      it 'enqueues started game without closers' do
        allow(DateTime).to receive(:now).and_return(start_time + 1.minute)
        game = create_game(league)
        expect do
          subject.perform_now
        end.to have_enqueued_job(LinesJob).with(league, [], [game.id])
      end

      it 'does not enqueue game with closers' do
        game = create_game(league, book: 'closer')
        expect do
          subject.perform_now
        end.not_to have_enqueued_job(LinesJob).with(league, [], [game.id])
      end

      it 'does not enqueue not started games without closers' do
        allow(DateTime).to receive(:now).and_return(start_time - 1.minute)
        game = create_game(league)
        expect do
          subject.perform_now
        end.not_to have_enqueued_job(LinesJob).with(league, [], [game.id])
      end
    end
  end
end
