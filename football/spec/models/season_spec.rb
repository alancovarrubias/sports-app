require 'rails_helper'

RSpec.describe Season, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:season)).to be_valid
  end
end
