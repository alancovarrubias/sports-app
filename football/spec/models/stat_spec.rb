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
end
