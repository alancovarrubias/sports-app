require 'rails_helper'

RSpec.describe Team, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:team)).to be_valid
  end
  describe 'associations' do
    it { should belong_to(:season) }
  end
end
