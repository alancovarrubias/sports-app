require 'rails_helper'

RSpec.describe Season, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:season)).to be_valid
  end

  describe 'associations' do
    it { should have_many(:teams) }
    it { should have_many(:games) }
  end

  describe 'validations' do
    it { should validate_presence_of(:year) }
    it { should validate_presence_of(:league) }
    it { should validate_uniqueness_of(:year).scoped_to(:league) }
    it { should validate_uniqueness_of(:league).ignoring_case_sensitivity.scoped_to(:year) }
  end

  describe 'enums' do
    it { should define_enum_for(:league).with_values(%i[nfl cfb]) }
    it { should allow_values(:nfl, :cfb).for(:league) }
  end
end
