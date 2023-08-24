require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:game)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:away_team).class_name('Team') }
    it { should belong_to(:home_team).class_name('Team') }
    it { should have_many(:stats) }
  end
end
