require 'rails_helper'

RSpec.describe Season, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:season)).to be_valid
  end

  describe 'validations' do
    it { should validate_presence_of(:year) }
    it { should validate_uniqueness_of(:year) }
  end
end
