require 'rails_helper'

RSpec.describe Team, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:team)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:season) }
    it { should have_many(:players) }
    it { should have_many(:stats) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).scoped_to(:season_id) }
    it { should validate_presence_of(:abbr) }
    it { should validate_uniqueness_of(:abbr).scoped_to(:season_id) }
    it { should validate_presence_of(:city) }
  end
end
