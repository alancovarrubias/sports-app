require 'rails_helper'

RSpec.describe Pred, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:pred)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:game) }
  end
end
