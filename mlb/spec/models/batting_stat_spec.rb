require 'rails_helper'

RSpec.describe BattingStat, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:player_batting_stat)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:interval) }
    it { should belong_to(:model) }
  end
end
