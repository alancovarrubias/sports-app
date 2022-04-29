require 'rails_helper'

RSpec.describe Line, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:line)).to be_valid
  end
end
