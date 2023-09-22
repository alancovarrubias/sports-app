require 'rails_helper'

RSpec.describe Stat, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:stat)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:game) }
    it { should belong_to(:team) }
  end

  describe 'enums' do
    it { should define_enum_for(:interval).with_values(%i[full_game first_half]) }
    it { should allow_values(:full_game, :first_half).for(:interval) }
  end

  describe 'derived stats' do
    before do
      @stat = FactoryBot.create(:stat,
                                completions: 27,
                                attempts: 43,
                                carries: 15,
                                passing_yards: 191,
                                rushing_yards: 182)
    end

    it { expect(@stat.ave_per_car).to eq(12.1) }
    it { expect(@stat.ave_per_att).to eq(4.4) }
    it { expect(@stat.ave_per_play).to eq(6.43) }
    it { expect(@stat.total_plays).to eq(58) }
    it { expect(@stat.total_yards).to eq(373) }
  end
end
