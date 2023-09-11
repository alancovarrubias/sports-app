require 'rails_helper'

RSpec.describe Stat, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:stat)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:game) }
    it { should belong_to(:team) }
  end
end
