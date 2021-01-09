require 'rails_helper'

RSpec.describe Season, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:season)).to be_valid
  end

  describe 'associations' do
    it { should have_many(:teams) }
    it { should have_many(:players) }
    it { should have_many(:stats) }
    it { should have_many(:lines) }
    it { should have_many(:preds) }
  end

  describe 'validations' do
    it { should validate_presence_of(:year) }
    it { should validate_uniqueness_of(:year) }
  end
end
